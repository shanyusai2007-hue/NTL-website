import { motion } from 'framer-motion'

const finalePortalBase64 = "data:image/jpeg;base64,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j8K1FU6kYbXWl9C03ymMN5+6oulJqPljqGq48Mmhmk/ymFqmRRFBUREQEREBERAREQEREBERAREQEREBERAREQF9a0nYL4s5Y3xyMljjkjcMOjkXKsPcHuEH6V9a5us1pcfYIPiKfR4RX1TgI6aSx75V1eDcA19QA58Dz5uDog4VF7TQ/Dcmnyy00QNtSbBQ8Q4IwmhlB50crwQOU3qJP5INiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIA//9k="

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const fromLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0 }
}

export default function Finale() {
  return (
    <section className="finale">
      <div className="finale__content">
        <div className="finale__phrases">
          <motion.p
            className="finale__phrase"
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            Create<span className="dim">.</span>&nbsp;Collaborate<span className="dim">.</span>
          </motion.p>
          <motion.p
            className="finale__phrase"
            variants={fromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          >
            Conquer<span className="dim">.</span>&nbsp;Celebrate<span className="dim">.</span>
          </motion.p>
        </div>

        <motion.div
          className="finale__bottom"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="finale__rule" />
          <p className="finale__quote">
            &ldquo;At SRM AP, NTL isn&rsquo;t just a club &mdash;
            it&rsquo;s a culture of growth.&rdquo;
          </p>
        </motion.div>
      </div>

      <div className="finale__image">
        <img
          src={finalePortalBase64}
          alt="A lone figure standing before an illuminated portal"
          loading="lazy"
        />
        <div className="finale__overlay" />
      </div>
    </section>
  )
}
