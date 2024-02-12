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
        <div className="w-screen h-screen bg-[#0E0E0E] flex flex-col mt-9">
          <div className="w-full h-full flex flex-row justify-between items-center md:px-8 colors md:h-screen">
            <video
              width="320"
              height="240"
              className=" w-[500px] h-[500px] overflow-hidden object-cover "
              autoPlay
              muted
              loop={true}
              src="/chips.webm"
            >
              Your browser does not support the video tag.
            </video>
            <div className =" flex flex-col my-4 mx-12">
              <h2 className='font-mono font-semibold text-xl md:text-3xl text-white'>
                Build a Startup!
              </h2>
              <p className=" font-mono font-normal text-lg text-white">
                Work With us to 
              </p>
            </div>
          </div>
          {/* <div className="w-full h-full colors md:h-screen "></div> */}
        </div>
      </FadeIn>
    </>
  )
}
