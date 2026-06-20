"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision"

type Status = "idle" | "loading" | "active" | "error"

// Deadzone around the vertical center where no scrolling happens.
const DEADZONE = 0.12
// Maximum scroll speed in pixels per frame at full hand extension.
const MAX_SPEED = 26

export function HandScrollControl() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastVideoTimeRef = useRef<number>(-1)
  // Smoothed scroll velocity, persisted across frames.
  const velocityRef = useRef<number>(0)

  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [handDetected, setHandDetected] = useState(false)
  const [direction, setDirection] = useState<"up" | "down" | "idle">("idle")

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    velocityRef.current = 0
    setHandDetected(false)
    setDirection("idle")
    setStatus("idle")
  }, [])

  const renderLoop = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const landmarker = landmarkerRef.current
    if (!video || !canvas || !landmarker) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (video.currentTime !== lastVideoTimeRef.current && video.readyState >= 2) {
      lastVideoTimeRef.current = video.currentTime
      const result = landmarker.detectForVideo(video, performance.now())

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (result.landmarks && result.landmarks.length > 0) {
        const hand = result.landmarks[0]
        // Use the middle-finger MCP joint (index 9) as the hand center.
        const center = hand[9]
        const y = center.y // normalized 0 (top) .. 1 (bottom)

        // Offset from screen center: negative = upper half, positive = lower half.
        const offset = y - 0.5
        let targetVelocity = 0
        if (Math.abs(offset) > DEADZONE) {
          const magnitude = (Math.abs(offset) - DEADZONE) / (0.5 - DEADZONE)
          const clamped = Math.min(1, magnitude)
          // Hand up (offset < 0) scrolls the page up (negative scroll).
          targetVelocity = Math.sign(offset) * clamped * MAX_SPEED
        }

        // Smooth the velocity for fluid scrolling.
        velocityRef.current += (targetVelocity - velocityRef.current) * 0.25

        setHandDetected(true)
        setDirection(targetVelocity < -0.5 ? "up" : targetVelocity > 0.5 ? "down" : "idle")

        // Draw the tracked point (mirror x to match the flipped preview).
        const px = (1 - center.x) * canvas.width
        const py = center.y * canvas.height
        ctx.beginPath()
        ctx.arc(px, py, 10, 0, Math.PI * 2)
        ctx.fillStyle = "oklch(0.62 0.22 38)"
        ctx.fill()
        ctx.lineWidth = 3
        ctx.strokeStyle = "rgba(255,255,255,0.9)"
        ctx.stroke()
      } else {
        velocityRef.current += (0 - velocityRef.current) * 0.25
        setHandDetected(false)
        setDirection("idle")
      }
    }

    if (Math.abs(velocityRef.current) > 0.4) {
      window.scrollBy(0, velocityRef.current)
    }

    rafRef.current = requestAnimationFrame(renderLoop)
  }, [])

  const start = useCallback(async () => {
    setStatus("loading")
    setErrorMsg("")
    try {
      if (!landmarkerRef.current) {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",
        )
        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
        })
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
        audio: false,
      })
      streamRef.current = stream

      const video = videoRef.current
      if (!video) return
      video.srcObject = stream
      await video.play()

      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 480
      }

      setStatus("active")
      lastVideoTimeRef.current = -1
      rafRef.current = requestAnimationFrame(renderLoop)
    } catch (err) {
      console.log("[v0] hand-scroll error:", err instanceof Error ? err.message : err)
      setErrorMsg(
        err instanceof Error && err.name === "NotAllowedError"
          ? "Necesito permiso para usar la cámara."
          : "No se pudo iniciar la cámara.",
      )
      setStatus("error")
      stop()
    }
  }, [renderLoop, stop])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
      landmarkerRef.current?.close()
    }
  }, [])

  const isActive = status === "active"

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Camera preview */}
      <div
        className={`overflow-hidden border border-border bg-card transition-all duration-300 ${
          isActive ? "h-[180px] w-[240px] opacity-100" : "pointer-events-none h-0 w-0 opacity-0"
        }`}
      >
        <div className="relative h-full w-full">
          <video ref={videoRef} className="h-full w-full -scale-x-100 object-cover" playsInline muted />
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />

          {/* Zone guides */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-[38%] items-start justify-center pt-1">
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${
                direction === "up" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              ▲ Subir
            </span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-[38%] h-[24%] border-y border-dashed border-white/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[38%] items-end justify-center pb-1">
            <span
              className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${
                direction === "down" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              ▼ Bajar
            </span>
          </div>

          {/* Detection dot */}
          <div className="absolute left-2 top-2 flex items-center gap-1.5">
            <span
              className={`inline-block h-2 w-2 rounded-full ${handDetected ? "bg-primary" : "bg-muted-foreground"}`}
            />
            <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/80">
              {handDetected ? "Mano" : "Buscando"}
            </span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <p className="max-w-[240px] border border-destructive/50 bg-card px-3 py-2 text-right font-mono text-xs text-destructive">
          {errorMsg}
        </p>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={isActive ? stop : start}
        disabled={status === "loading"}
        className="flex items-center gap-2 border border-border bg-primary px-4 py-3 font-mono text-xs uppercase tracking-wider text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
        aria-pressed={isActive}
      >
        <CameraIcon className="h-4 w-4" />
        {status === "loading" ? "Cargando…" : isActive ? "Detener gestos" : "Scroll con la mano"}
      </button>
    </div>
  )
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}
