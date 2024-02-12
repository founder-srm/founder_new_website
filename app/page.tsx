import FadeIn from '../components/ui/Fade'

import Chips from './components/chips'
import Image from 'next/image'

import Title from './components/Title'
import TypingEffect from './components/Typing'
import Navbar from './components/Navbar'

export default function Home() {
  const text = 'Join the Founders Club: Where Innovation Meets Opportunity!'
  const title = 'Founders'

  return (
    <>
      <FadeIn>
        {/* <Background /> */}
        <video
          width="320"
          height="240"
          className="w-screen vid overflow-hidden object-cover transform-[scaleX(-1)]"
          autoPlay
          muted
          loop={true}
          src="/background.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <section className="  w-screen h-full z-20 ">
          <Navbar />
          <div className="text-white">
            <div className="container">
              <h1>Welcome to </h1>
              <Title title={title} />
              <br />
              <h1>Club Website</h1>
            </div>
            <TypingEffect text={text} />
          </div>
        </section>
        <div className="w-screen h-screen grid grid-rows-2 md:grid-cols-2 mt-9">
          <div className="w-full h-full colors md:h-screen"></div>
          <div className="w-full h-full colors md:h-screen "></div>
        </div>
      </FadeIn>
    </>
  )
}
