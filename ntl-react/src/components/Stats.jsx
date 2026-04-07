import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ target, suffix = '', delay = 0 }) {
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    const duration = 2000
    const start = performance.now()
    function update(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(update)
    }
    const timer = setTimeout(() => requestAnimationFrame(update), delay)
    return () => clearTimeout(timer)
  }, [started, target, delay])

  return {
    value: value + suffix,
    start: () => setStarted(true)
  }
}

function StatItem({ target, suffix, label, delay, inView }) {
  const [val, setVal] = useState('0' + suffix)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const timer = setTimeout(() => {
      function update(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setVal(Math.round(eased * target) + suffix)
        if (progress < 1) requestAnimationFrame(update)
      }
      requestAnimationFrame(update)
    }, delay)
    return () => clearTimeout(timer)
  }, [inView, target, suffix, delay])

  return (
    <motion.div
      className="stats__item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      <div className="stats__number">{val}</div>
      <div className="stats__line" />
      <div className="stats__label">{label}</div>
    </motion.div>
  )
}

const statsData = [
  { target: 50, suffix: '+', label: 'Projects Delivered', delay: 0 },
  { target: 30, suffix: '+', label: 'Team Members', delay: 200 },
  { target: 15, suffix: '+', label: 'Events Hosted', delay: 400 },
  { target: 3, suffix: '', label: 'Years of Impact', delay: 600 },
]

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3, once: true })

  return (
    <section className="stats" id="stats-section" ref={ref}>
      <div className="stats__inner">
        {statsData.map((s, i) => (
          <StatItem key={i} {...s} inView={inView} />
        ))}
      </div>
    </section>
  )
}
