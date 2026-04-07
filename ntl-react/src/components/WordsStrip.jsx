const wordsData = ['DARE', 'NEXT', 'GROWTH', 'TECH', 'MINDSET', 'LAB', 'TRY']

export default function WordsStrip() {
  const items = [...wordsData, ...wordsData]
  return (
    <div className="words-strip" aria-hidden="true">
      <div className="words-strip__track">
        {items.map((w, i) => (
          <span className="words-strip__word" key={i}>
            {w}<span className="words-strip__pip" />
          </span>
        ))}
      </div>
    </div>
  )
}
