import { useEffect, useRef } from 'react'

const isTouchDevice = typeof window !== 'undefined' &&
  (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (isTouchDevice) return

    const dot = dotRef.current
    const ring = ringRef.current
    let rafId

    function lerp() {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18
      dot.style.left = mouse.current.x + 'px'
      dot.style.top = mouse.current.y + 'px'
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'
      rafId = requestAnimationFrame(lerp)
    }
    lerp()

    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Hover state
    const addHover = () => document.body.classList.add('cursor-hover')
    const removeHover = () => document.body.classList.remove('cursor-hover')
    const addClick = () => document.body.classList.add('cursor-click')
    const removeClick = () => document.body.classList.remove('cursor-click')

    const setupHoverListeners = () => {
      const hoverEls = document.querySelectorAll('a, button, .quote-card, .team__panel, .words-strip__word, .marquee__item, .join__word')
      hoverEls.forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }

    // Set up initially and on DOM changes
    setupHoverListeners()
    const observer = new MutationObserver(setupHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousedown', addClick)
    window.addEventListener('mouseup', removeClick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', addClick)
      window.removeEventListener('mouseup', removeClick)
      observer.disconnect()
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
