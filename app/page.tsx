import dynamic from "next/dynamic"
import Logo from '../components/Logo'
import Navigation from '../components/Navigation'

const LandingScene = dynamic(() => import("../components/scenes/LandingScene"), { ssr: false })
const DetailScene = dynamic(() => import("../components/scenes/DetailScene"), { ssr: false })
const GlobeScene = dynamic(() => import("../components/scenes/GlobeScene"), { ssr: false })

export default function Home() {
  return (
      <main className="h-screen bg-slate-600 overflow-hidden no-scrollbar">
        <Logo/>
        <Navigation/>
        <div id="landingScene" className="h-screen">
          <LandingScene />
        </div>
        <div id="detailScene" className="h-screen">
          <DetailScene />
        </div>
        <div id="globeScene" className="h-screen">
          <GlobeScene />
        </div>
      </main>
  )
}