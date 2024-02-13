import FadeIn from '../components/ui/Fade'
import Title from './Title'
import TypingEffect from './Typing'
import Navbar from './Navbar'

export default function Home() {
  const text = 'Join the Founders Club: Where Innovation Meets Opportunity!'
  const title = 'Founders'

  return (
    <>
      <FadeIn>
        {/* <Background /> */}
        <div className=' '>
          <video
            width="310"
            height="220"
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
                <br/>
                <Title title={title} />
                <br/>
              </div>
              <TypingEffect text={text} />
            </div>
          </section>
        </div>
        <div className="w-screen h-screen bg-[#0E0E0E] flex flex-col mt-9 ">
          <div className="w-full h-full flex flex-row justify-between items-center md:px-8 colors md:h-screen">
            <video
              width="400"
              height="400"
              className=" md:w-[500px] md:h-[500px] overflow-hidden object-cover "
              autoPlay
              muted
              loop={true}
              src="/chips.webm"
            >
              Your browser does not support the video tag.
            </video>
            <div className =" flex flex-col my-4 mx-6 md:mx-24">
              <h2 className='font-mono font-semibold text-xl md:text-3xl text-white'>
                Build a Startup!
              </h2>
              <p className=" font-mono font-normal text-lg text-white">
                Work With us to 
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </>
  )
}
