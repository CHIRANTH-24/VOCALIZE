import React from 'react'
import SnowEffect from '../components/SnowEffect'
import Hero from '../components/Hero'
import Features from '@/components/Features'
import { LampContainer } from "../components/ui/lamp.jsx";
import Testimonials from '@/components/Testimonials';
import { assets } from '@/assets/assets.js';

const Footer = () => {



  return (
    <div className='w-screen border-t-2'>
        <div className='md:mx-10 relative z-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
                {/* left */}
                <div>
                    <div className='flex gap-4 items-center'>
                        <img className='mb-5 w-20 rounded-full' src={assets.Logo} />
                        <p className='text-primary-orange text-[60px] font-extrabold'>Vocalise</p>
                    </div>
                    <p className='w-full md:w-2/3 text-gray-300 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>

                {/* Center */}
                <div>
                    <p className='flex flex-col gap-2 font-bold text-white text-2xl mb-4'>COMPANY</p>
                    <ul className='text-gray-300 text-lg'>
                        <li>1. Home</li>
                        <li>2. About Us</li>
                        <li>3. Contact Us</li>
                        <li>4. Privacy Policy</li>
                    </ul>
                </div>

                {/* Right */}
                <div>
                    <p className='font-bold text-2xl mb-5 text-white'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-300'>
                        <li>+0-000-000-000</li>
                        <li>something@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div>
                <p className='py-5 text-sm text-center text-white'>Copyright 2024 @ Vocalise - All Right Reserved.</p>
            </div>
        </div>
    </div>
  )

}

const LandingPage = () => {
  return (
    <div className='bg-gradient-to-b from-[#0a1320] to-black/95 pt-52 relative px-6 overflow-x-hidden'>

        <Hero/>
        <LampContainer className='absolute z-0 left-[50%] translate-x-[-50%]'/>
        <Features/>
        <Testimonials/>
        <Footer/>
        <SnowEffect/>

    </div>
  )
}

export default LandingPage