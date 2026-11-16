import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ChromaGrid.css'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const falloffStops = softness => {
  const core = clamp(1 - softness, 0, 0.95)
  const stops = []

  for (let index = 0; index <= 12; index += 1) {
    const position = index / 12
    const normalized = clamp((position - core) / Math.max(0.0001, 1 - core), 0, 1)
    const alpha = 1 - normalized * normalized * normalized * (normalized * (normalized * 6 - 15) + 10)
    stops.push(`rgba(0, 0, 0, ${alpha.toFixed(3)}) ${(position * 100).toFixed(1)}%`)
  }

  return stops.join(', ')
}

export default function ChromaGrid({
  items,
  columns = 3,
  minCardWidth = 180,
  gap = 12,
  radius = 260,
  softness = 0.6,
  damping = 0.45,
  fadeOut = 0.6,
  grayscale = 1,
  dim = 0.12,
  glow = 0.5,
  borderGlow = 1,
  aspectRatio = '3 / 2',
  cardRadius = 22,
  theme = 'dark',
  className = ''
}) {
  const rootRef = useRef(null)
  const settingsRef = useRef({ damping, fadeOut })
  const placeRef = useRef(null)

  useEffect(() => {
    settingsRef.current = { damping, fadeOut }
  }, [damping, fadeOut])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = { x: 0, y: 0, targetX: 0, targetY: 0, power: 0, targetPower: 0, primed: false }
    let animationFrame = 0
    let lastFrame = 0

    const place = () => {
      const bounds = root.getBoundingClientRect()
      root.querySelectorAll('[data-chroma-area]').forEach(node => {
        const nodeBounds = node.getBoundingClientRect()
        node.style.setProperty('--chroma-ox', `${nodeBounds.left - bounds.left}px`)
        node.style.setProperty('--chroma-oy', `${nodeBounds.top - bounds.top}px`)
      })
    }
    placeRef.current = place

    const animate = now => {
      animationFrame = 0
      const settings = settingsRef.current
      if (!settings) return

      const delta = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 1 / 60
      lastFrame = now
      const follow = reduceMotion
        ? 1
        : 1 - Math.exp(-delta / Math.max(0.01, settings.damping * 0.32))
      state.x += (state.targetX - state.x) * follow
      state.y += (state.targetY - state.y) * follow
      const span =
        state.targetPower > state.power ? 0.1 : Math.max(0.02, settings.fadeOut * 0.35)
      state.power +=
        (state.targetPower - state.power) *
        (reduceMotion ? 1 : 1 - Math.exp(-delta / span))
      root.style.setProperty('--chroma-x', `${state.x.toFixed(2)}px`)
      root.style.setProperty('--chroma-y', `${state.y.toFixed(2)}px`)
      root.style.setProperty('--chroma-power', state.power.toFixed(4))

      const settled =
        Math.abs(state.targetX - state.x) < 0.1 &&
        Math.abs(state.targetY - state.y) < 0.1 &&
        Math.abs(state.targetPower - state.power) < 0.002

      if (settled) {
        state.power = state.targetPower
        root.style.setProperty('--chroma-power', state.power.toFixed(4))
        lastFrame = 0
      } else {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    const wake = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(animate)
    }

    const onMove = event => {
      const bounds = root.getBoundingClientRect()
      state.targetX = event.clientX - bounds.left
      state.targetY = event.clientY - bounds.top
      if (!state.primed || state.power < 0.02) {
        state.x = state.targetX
        state.y = state.targetY
        state.primed = true
      }
      state.targetPower = 1
      wake()
    }

    const onLeave = () => {
      state.targetPower = 0
      wake()
    }

    const resizeObserver = new ResizeObserver(place)
    resizeObserver.observe(root)
    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerdown', onMove)
    root.addEventListener('pointerleave', onLeave)
    root.addEventListener('pointercancel', onLeave)
    place()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerdown', onMove)
      root.removeEventListener('pointerleave', onLeave)
      root.removeEventListener('pointercancel', onLeave)
      placeRef.current = null
    }
  }, [])

  useLayoutEffect(() => {
    placeRef.current?.()
  })

  const style = {
    '--chroma-cols': Math.max(1, Math.round(columns)),
    '--chroma-min': `${Math.max(80, minCardWidth)}px`,
    '--chroma-gap': `${Math.max(0, gap)}px`,
    '--chroma-r': `${Math.max(20, radius)}px`,
    '--chroma-stops': falloffStops(clamp(softness, 0, 1)),
    '--chroma-gray': clamp(grayscale, 0, 1),
    '--chroma-dim': clamp(dim, 0, 0.9),
    '--chroma-glow': clamp(glow, 0, 1),
    '--chroma-border': clamp(borderGlow, 0, 1),
    '--chroma-fade': `${Math.max(0, fadeOut)}s`,
    '--chroma-ratio': aspectRatio,
    '--chroma-radius': `${Math.max(0, cardRadius)}px`,
    color: theme === 'light' ? '#27272a' : '#f4f4f5'
  }

  return (
    <div
      ref={rootRef}
      className={`chroma-grid${className ? ` ${className}` : ''}`}
      style={style}
    >
      <div className="chroma-grid-inner">
        {items.map((item, index) => {
          const accent = item.accent ?? '#fff'
          const cardStyle = { '--chroma-accent': accent }
          const content = (
            <>
              <span className="chroma-wash" aria-hidden="true" />
              <div className="chroma-media" data-chroma-area="">
                <img
                  className="chroma-mono"
                  src={item.image}
                  alt={item.alt ?? ''}
                  loading="lazy"
                />
                <img className="chroma-color" src={item.image} alt="" aria-hidden="true" loading="lazy" />
                <span className="chroma-media-rim" aria-hidden="true" />
              </div>
              <div className="chroma-info">
                <span className="chroma-title">{item.title}</span>
                <span className="chroma-subtitle">{item.subtitle}</span>
              </div>
              <span className="chroma-card-rim" aria-hidden="true" />
              <span className="chroma-card-glow" aria-hidden="true" />
            </>
          )

          return (
            <Link
              key={item.url ?? `${item.title}-${index}`}
              className="chroma-card"
              data-chroma-area=""
              style={cardStyle}
              to={item.url}
            >
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
