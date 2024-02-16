import React from 'react'
import Link from 'next/link'

import { Instagram } from 'lucide-react'
import { Twitter } from 'lucide-react'
import { Linkedin } from 'lucide-react'
import { Github } from 'lucide-react'
<Instagram />
function Footer() {
  return (
    <>
      <div className="bg-[#1e1d1d] h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
        <div className="p-5 ">
          <ul>
            <p className="text-white font-bold text-3xl pb-6">
              Founders<span className="text-blue-600"> CLUB</span>
            </p>
            <div className="flex gap-6 pb-5 text-white">
              <Instagram className="text-2xl cursor-pointer hover:text-purple-600" />
              <Twitter className="text-2xl cursor-pointer hover:text-blue-600" />
              <Linkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              <Github className="text-2xl cursor-pointer hover:text-blue-600" />
            </div>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Company</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link href="/about">About</Link>
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link href="/events">Events</Link>
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link href="/contact">Contact</Link>
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link href="/team">Team</Link>
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link href="/gallery">Gallery</Link>
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Support</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Contact
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center  text-white p-5 bg-[#1e1d1d]">
        <span className="hover:text-blue-600 font-semibold cursor-pointer">
          <Link href="/">©Founder's Club </Link>
        </span>
      </div>
    </>
  )
}
export default Footer
