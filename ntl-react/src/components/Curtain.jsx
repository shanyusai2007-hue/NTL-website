import { useState, useEffect } from 'react'

export default function Curtain() {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setGone(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div id="curtain" className={gone ? 'gone' : ''}>
      <div id="curtain-logo">INSAIN9</div>
    </div>
  )
}
