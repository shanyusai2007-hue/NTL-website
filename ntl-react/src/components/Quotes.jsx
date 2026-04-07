import { motion } from 'framer-motion'

const donNormanImg = "data:image/png;base64,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ERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAX/2Q=="

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const quotes = [
  { num: '01', text: '\u201CWe don\u2019t want more features. We want better experiences. Technology should serve people, not the other way around.\u201D' },
  { num: '02', text: '\u201CA brilliant solution to the wrong problem can be worse than no solution at all.\u201D' },
  { num: '03', text: '\u201CA product is more than its features. It is an experience \u2014 shaped by expectations, context, culture, and emotion. Designers must understand people before they try to design for them.\u201D' },
]

export default function Quotes() {
  return (
    <section className="quotes" id="philosophy">
      <motion.div
        className="quotes__pre"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="pre-label">Philosophy</span>
      </motion.div>

      <div className="quotes__grid">
        {quotes.map((q, i) => (
          <motion.article
            className="quote-card"
            key={i}
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          >
            <span className="quote-card__num">{q.num}</span>
            <p className="quote-card__text">{q.text}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="quotes__attribution"
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        <div className="quotes__portrait">
          <img src={donNormanImg} alt="Don Norman" loading="lazy" />
        </div>
        <div className="quotes__dash" />
        <div className="quotes__author">DON NORMAN</div>
      </motion.div>
    </section>
  )
}
