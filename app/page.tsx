import dynamic from "next/dynamic"
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import { IndicatorProvider } from '../context/IndicatorContext';

const LandingScene = dynamic(() => import("../components/LandingScene"), { ssr: false })

export default function Home() {
  return (
    <IndicatorProvider >
      <main className="h-screen bg-slate-600 overflow-hidden no-scrollbar">
        <Logo/>
        <Navigation/>
        <div id="landingScene" className="h-screen">
          <LandingScene />
        </div>
        <div id="detailScene" className="h-screen">
        </div>
      </main>
    </IndicatorProvider>
  )
}