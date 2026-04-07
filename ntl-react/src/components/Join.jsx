import { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

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

const words = ['JOIN', 'NOW', 'AND', 'EXPERIENCE', 'YOURSELF']

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

function JoinWord({ text, index, inView }) {
  const ref = useRef(null)

  return (
    <motion.div
      className={`join__word${inView ? ' revealed' : ''}`}
      ref={ref}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1], delay: index * 0.11 }}
      onMouseEnter={() => {
        if (inView && ref.current) scrambleText(ref.current, text, 350)
      }}
    >
      {text}
    </motion.div>
  )
}

export default function Join() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { amount: 0.15 })

  return (
    <section className="join" id="join">
      <div className="join__watermark" aria-hidden="true">NORMAN</div>

      <motion.div
        className="join__pre"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pre-label">Become Part of the Movement</span>
      </motion.div>

      <div className="join__words" id="join-words" ref={sectionRef}>
        {words.map((w, i) => (
          <JoinWord key={i} text={w} index={i} inView={inView} />
        ))}
      </div>

      <motion.p
        className="join__sub"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        &ldquo;A platform that transforms ideas into impact.&rdquo;
      </motion.p>

      <motion.a
        href="#"
        className="join__btn"
        aria-label="Get started with NTL"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        Get Started
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  )
}
