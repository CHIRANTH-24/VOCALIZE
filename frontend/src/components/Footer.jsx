import React from 'react'
import { assets } from '../assets/assets.js'
import { useLocation } from 'react-router-dom'

const Footer = () => {

    const location = useLocation();

    if (location.pathname != '/')
  return (
    <div className='w-[98%] border-t-2 border-t-black overflow-x-hidden mx-auto'>
        <div className='md:mx-10 relative z-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>
                {/* left */}
                <div>
                    <div className='flex gap-4 items-center'>
                        <img className='mb-5 w-20 rounded-full' src={assets.Logo} />
                        <p className='text-primary-orange text-[52px] font-extrabold'>Vocalise</p>
                    </div>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>

                {/* Center */}
                <div>
                    <p className='flex flex-col gap-2 font-bold  text-2xl mb-4'>COMPANY</p>
                    <ul className='text-gray-600 text-lg'>
                        <li>1. Home</li>
                        <li>2. About Us</li>
                        <li>3. Contact Us</li>
                        <li>4. Privacy Policy</li>
                    </ul>
                </div>

                {/* Right */}
                <div>
                    <p className='font-bold text-2xl mb-5 '>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+0-000-000-000</li>
                        <li>something@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div>
                <p className='py-5 text-sm text-center '>Copyright 2024 @ Vocalise - All Right Reserved.</p>
            </div>
        </div>
    </div>
  )

}



export default Footer