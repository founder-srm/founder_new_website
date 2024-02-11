import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='flex flex-col w-screen h-screen justify-center items-center bg-[#090909] text-white overflow-hidden'>
        <Image src='/bg-lines gif.gif' alt='404' width={300} height={300} className='w-full h-full z-0 absolute ' />
        <section className=' z-20 w-full h-full flex flex-col justify-center items-center'>
            
            <Image src='/fc logo.png' alt='404' width={300} height={300} />
            <h2 className=' font-mono font-medium text-4xl my-12'>Page Not Found</h2>
            <p className=' font-mono font-thin text-sm text-gradient'><i>How did you get here?</i></p>
            <Link href="/" className='my-2'>Return Home</Link>
        </section>
    </main>
  )
}