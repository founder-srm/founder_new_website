import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main className='flex flex-col w-screen h-screen justify-center items-center bg-[#090909] text-white overflow-hidden'>
        <Image  src='/bg-lines gif.gif' alt='404' width={300} height={300} className='w-auto md:w-full h-auto md:h-full z-0 absolute  ' />
        <section className=' z-20 w-full h-full flex flex-col justify-center items-center'>
            <Card className=' bg-[#18181B] bg-opacity-55 p-8 md:p-12 lg:p-24 border border-white text-white flex flex-col items-center'>
                <Image priority src='/fc logo.png' alt='404' width={300} height={300} className=' w-[150px] md:w-[300px] h-auto ' />
                <h2 className=' font-mono font-medium text-2xl md:text-4xl mt-12 mb-2'>ERROR 404</h2>
                <h2 className=' font-mono font-medium text-2xl md:text-4xl mb-12 mt-2'>Page Not Found</h2>
                <p className=' font-mono font-thin text-sm text-gradient'><i>How did you get here?</i></p>
                <Button variant='secondary' className='mt-12 flex flex-row gap-3 p-0'>
                    <Link href="/" className='m-2 hover:bg-white p-2 rounded-lg transition-all ease-in-out duration-150'>Home</Link>
                    <Link href="/contact" className='m-2 hover:bg-white p-2 rounded-lg transition-all ease-in-out duration-150'>Contact us</Link>
                    <Link href="/gallery" className='m-2 hover:bg-white p-2 rounded-lg transition-all ease-in-out duration-150'>Gallery</Link>
                </Button>
            </Card>
        </section>
    </main>
  )
}