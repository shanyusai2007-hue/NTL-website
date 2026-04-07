import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

export default function Team() {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const words = el.textContent.trim().split(/\s+/)
    el.innerHTML = words.map((w, i) =>
      `<span class="split-word" style="transition-delay:${100 + i * 90}ms">` +
        `<span class="word-inner">${w}</span>` +
      `</span>`
    ).join(' ')

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.split-word').forEach(sw => sw.classList.add('word-visible'))
        }
      })
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="team" id="team">
      <div className="team__header">
        <h2 className="team__title" ref={titleRef}>
          TEAM <span className="outlined">MEMBERS</span>
        </h2>
        <motion.p
          className="team__desc"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.26 }}
        >
          Success isn&rsquo;t built alone &mdash; it&rsquo;s built by people who
          challenge, support, and elevate each other. Meet the team that turned
          late nights into bright ideas.
        </motion.p>
      </div>

      <motion.div
        className="team__grid"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="team__panel">
          <img src="https://framerusercontent.com/images/YVJfbXEwaVXuluuAdjf8fmR4S4.png?width=1400" alt="Team member" loading="lazy" />
          <div className="team__badge">
            <img src="https://framerusercontent.com/images/tUwy29vV4MULQaeay7xZxJQDME.png?width=200" alt="NTL" />
          </div>
        </div>

        <div className="team__panel">
          <img src="https://framerusercontent.com/images/ZlUdxmKhHRka9vxxag878OI98PU.png?width=700" alt="Team member" loading="lazy" />
          <div className="team__badge">
            <img src="https://framerusercontent.com/images/tUwy29vV4MULQaeay7xZxJQDME.png?width=200" alt="NTL" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
