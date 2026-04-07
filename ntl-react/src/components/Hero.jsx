import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const openRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > window.innerHeight * 1.4) return
      if (openRef.current) openRef.current.style.marginTop = `${y * 0.055}px`
      if (closeRef.current) closeRef.current.style.marginTop = `${y * 0.033}px`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero__grid">
        <div className="hero__left">
          <h1 className="sr-only">Norman Tech Lab — Design is an act of Artism</h1>
          <p className="hero__quote-line hero__quote-line--open" ref={openRef}>
            &ldquo;Design is an
          </p>
          <p className="hero__quote-line hero__quote-line--close" ref={closeRef}>
            act of Art&rdquo;
          </p>
        </div>

        <div className="hero__right">
          <div className="hero__label" aria-hidden="true">NORMAN</div>
          <p className="hero__body">
            <strong>Norman lab</strong> is a center of innovation, specializing in
            web development, app development, cloud computing, and UI/UX design.
            Norman&rsquo;s lab is dedicated to pushing the boundaries of online
            experiences by creating <strong>seamless and user-friendly interfaces</strong>.
          </p>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <div className="hero__scroll-line" />
        Scroll to explore
      </div>
    </section>
  )
}
