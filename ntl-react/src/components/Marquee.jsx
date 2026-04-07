export default function Marquee({ direction = 'normal' }) {
  const items = Array(16).fill('NORMAN')
  const trackClass = direction === 'reverse'
    ? 'marquee__track marquee__track--reverse'
    : 'marquee__track'

  return (
    <div className="marquee" aria-hidden="true">
      <div className={trackClass}>
        {items.map((text, i) => (
          <span className="marquee__item" key={i}>
            {text}<span className="marquee__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
