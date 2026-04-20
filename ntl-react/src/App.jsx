import { Analytics } from '@vercel/analytics/react'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Curtain from './components/Curtain'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import SplitImages from './components/SplitImages'
import Stats from './components/Stats'
import Quotes from './components/Quotes'
import Team from './components/Team'
import Join from './components/Join'
import WordsStrip from './components/WordsStrip'
import Finale from './components/Finale'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Curtain />

      <Navbar />
      <div className="main-content">
        <Hero />
        <Marquee direction="normal" />
        <SplitImages />
        <Stats />
        <Quotes />
        <Team />
        <Join />
        <WordsStrip />
        <Marquee direction="reverse" />
        <Finale />
      </div>
      <Footer />
      <Analytics />
    </>
  )
}

export default App
