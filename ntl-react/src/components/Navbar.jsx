import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const logoTextRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(false)
      document.body.style.overflow = ''
    }
  }

  const toggleMenu = () => {
    setMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }

  return (
    <motion.header
      className={`nav${scrolled ? ' is-scrolled' : ''}`}
      id="nav"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <a href="#" className="nav__logo">
        <img src="/assets/images/ntl-logo.png" alt="NTL Logo" className="nav__logo-img" />
        <span className="nav__logo-text" ref={logoTextRef}>NTL</span>
      </a>

      <ul className={`nav__links${menuOpen ? ' mobile-open' : ''}`}>
        <li><a href="#hero" onClick={handleLinkClick}>About</a></li>
        <li><a href="#philosophy" onClick={handleLinkClick}>Philosophy</a></li>
        <li><a href="#team" onClick={handleLinkClick}>Team</a></li>
        <li><a href="#join" onClick={handleLinkClick}>Join</a></li>
      </ul>

      <a href="#join" className="nav__cta">Join Now</a>

      <button
        className={`nav__hamburger${menuOpen ? ' active' : ''}`}
        id="nav-hamburger"
        aria-label="Toggle navigation menu"
        onClick={toggleMenu}
      >
        <span /><span /><span />
      </button>
    </motion.header>
  )
}
