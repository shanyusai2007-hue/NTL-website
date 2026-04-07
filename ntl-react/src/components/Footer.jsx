import { useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function scrambleText(el, finalText, duration = 600) {
  const len = finalText.length
  let frame = 0
  const totalFrames = Math.round(duration / 40)
  const interval = setInterval(() => {
    el.textContent = finalText
      .split('')
      .map((ch, i) => {
        if (frame / totalFrames > i / len) return ch
        return ch === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')
    frame++
    if (frame > totalFrames) {
      el.textContent = finalText
      clearInterval(interval)
    }
  }, 40)
}

export default function Footer() {
  const logoRef = useRef(null)
  const logoText = 'NORMAN TECH LAB'

  const handleHover = useCallback(() => {
    if (logoRef.current) scrambleText(logoRef.current, logoText, 500)
  }, [])

  return (
    <footer className="footer">
      <a
        href="#"
        className="footer__logo"
        ref={logoRef}
        onMouseEnter={handleHover}
      >
        {logoText}
      </a>

      <p className="footer__copy">
        SRM University AP &mdash; Amaravati, Andhra Pradesh<br />
        &copy; 2025 Norman Tech Lab. All rights reserved.
      </p>

      <nav className="footer__links" aria-label="Social">
        <a href="#">Instagram</a>
        <a href="#">LinkedIn</a>
        <a href="#">GitHub</a>
      </nav>
    </footer>
  )
}
