import Footer from '@/app/Footer'
import Navbar from '@/app/Navbar'
import React from 'react'

const ClosedForm = () => {
  return (
    <main className='flex flex-col w-screen h-full min-h-screen bg-[#090909] text-white'>
        <Navbar />
            <section className='p-auto m-auto'>
                <h1>Form Closed</h1>
                <p>Sorry, the form is closed.</p>
                <p>{`~(>_<。)＼`}</p>
            </section>
        <Footer />
    </main>
  )
}

export default ClosedForm