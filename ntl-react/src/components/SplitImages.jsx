import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const heroFiguresBase64 = "data:image/png;base64,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d8v+Zef/aQ+DWpaXS2ia3VOoLLAW1FVUVGeZOOA2z+h+y9Y+F/wAAtIcfcMUXEOrte6k0s+VoZaeQcmF0ZBYXn3AAG3quep/jV8P9E2KKkwnwfYZLrYY2iPUOu7rkp3AfyC7bAQa7Pjt+y7KWR8kQc8AN7AVy21rVZnw4+P+n+FuLfCugNN6S/0vpCGzQM/02r6UyFzQ3qRnC8u1j4ffFrXjW3LS/CHjG72nDGBPp7/AEo+RyWfKMf6bTqvz0uOJa8FqYLvLc3VMFTPL0lnczufucLj88qSk1LaTgdgCumlp6qtrGwUsL5ppHhrI4mlznk9gBuVeuluOMKwaYXD4aeIp7TU4Zjp9T6JqHxiNndsbDlfiPYi4VZaw4S4OPj74x/sCXTP2ddFYtcfxw44qKOo7x9/KnC6jvNVPqK+V0tzuNa4yTVFTKZJpCe5cTkrRogIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiItk8T4ZCx4IIWtUEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAX/2Q=="

export default function SplitImages() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const panelRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.08, once: true })

  useEffect(() => {
    let rafPending = false
    function runParallax() {
      const vh = window.innerHeight
      const img = imgRef.current
      const panel = panelRef.current
      if (img && panel) {
        const r = panel.getBoundingClientRect()
        if (r.bottom > -100 && r.top < vh + 100) {
          const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)))
          const shift = (progress - 0.5) * 40
          img.style.setProperty('--py', `${shift}px`)
        }
      }
      rafPending = false
    }
    const onScroll = () => {
      if (!rafPending) { requestAnimationFrame(runParallax); rafPending = true }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    runParallax()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`images${inView ? ' visible' : ''}`}
      id="images-section"
      ref={sectionRef}
    >
      <div className="images__panel" id="img-panel-1" ref={panelRef}>
        <img
          id="img-1"
          ref={imgRef}
          src={heroFiguresBase64}
          alt="Norman Lab — figures in motion"
        />
      </div>

      <div className="images__panel" id="img-panel-2">
        <div className="images__placeholder">
          <div className="images__placeholder-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <p className="images__placeholder-text">Image pending</p>
        </div>
      </div>
    </div>
  )
}
