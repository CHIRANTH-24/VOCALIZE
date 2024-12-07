import React from 'react'
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className='max-w-[1280px] mx-auto pt-24 overflow-x-hidden'>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12 justify-center max-w-[1000px] mx-auto '>
        <img className='w-full md:max-w-[500px]' src={assets.About} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Vocalise, your personalized companion in overcoming speech challenges and building communication confidence! Our platform is dedicated to providing individuals with tailored exercises, interactive lessons, and cutting-edge AI-driven tools to address speech disorders such as lisps, stuttering, and pronunciation difficulties. Whether you're working independently or alongside a professional, SpeechEase empowers you to progress at your own pace with scientifically designed techniques and engaging resources.</p>
          <b>Our Vision</b>
          <p>At Vocalise, we believe that every voice matters. Our mission is to make speech therapy accessible, effective, and enjoyable for everyone. With dynamic lesson plans, real-time feedback, and motivational guidance, we’re redefining how speech improvement journeys are approached. Join us as we combine technology, empathy, and innovation to help you achieve your communication goals—one word at a time!</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>Why <span>Choose Us</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary-blue hover:text-white transition-all duration-300'>
                <b>EFFICIENCY:</b>
                <p>Quick and accurate diagnosis tests to get you started on the right therapy path immediately.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary-blue hover:text-white transition-all duration-300'>
                <b>CONVENIENCE:</b>
                <p>Daily challenges and progress tracking accessible anytime, anywhere, to fit your schedule.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary-blue hover:text-white transition-all duration-300'>
                <b>PERSONALIZATION:</b>
                <p>Customized lesson plans and real-time feedback designed to address your unique speech needs.</p>
            </div>
      </div>


    </div>
  )
}

export default About;