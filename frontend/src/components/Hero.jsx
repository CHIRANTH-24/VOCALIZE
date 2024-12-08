import React from 'react'
import ShineBorder from "@/components/ui/shine-border";
import { assets } from '@/assets/assets';
import Hero_Profiles from './Hero_Profiles';
import '../index.css'

const Hero = () => {
  return (
    <ShineBorder
      className="hero relative z-10 flex  flex-col items-center justify-center overflow-hidden  bg-gradient-hero-bg max-w-[1280px] mx-auto md:shadow-xl rounded-xl"
      color={["#8837fa", "#ff4a88", "#f7a24a"] }
    >
        <img className='absolute top-2 w-full rounded-3xl h-[98%] opacity-20' src={assets.HeroBGOverlay} alt="" />

        <div className='z-10 relative px-4 py-2 min-w-full'>
            <span className='text-[68px] font-extrabold' style={{
                backgroundImage: 'linear-gradient(-17deg, #FF5900 0%, #F99236 55%, #F7CE68 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
            }}>
                Empowering Speech,
            </span>

            <div className='flex'>

                <div className='flex-1  flex flex-col items-start'>
                    <h2 className='font-extrabold text-4xl min-h-[45px] relative -translate-y-5' style={{
                        backgroundImage: 'linear-gradient(180deg, #FFFFFF 55%, #747474 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}>Transforming Lives!</h2>
                    <Hero_Profiles/>
                    <div className='flex justify-start gap-4 w-full pr-8'>
                        <button className='flex items-center gap-2 text-xl bg-primary-orange px-4 py-2 border-2 rounded-full hover:scale-105 transition-all duration-1000 text-white group'>Login
                            <img src={assets.rightArrow} className='w-0  group-hover:w-7 transition-all duration-500' />
                        </button>
                        <button className='flex items-center gap-2 text-xl bg-primary-orange px-4 py-2 border-2 rounded-full hover:scale-105 transition-all duration-500 text-white group'>Diagnose
                            <img src={assets.rightArrow} className='w-0 group-hover:w-7 transition-all duration-500' />
                        </button>
                    </div>
                </div>

                <div className='flex-1'>
                    <video autoPlay loop muted src={assets.HeroVid} className='rounded-xl border-4 max-w-[500px]'></video>
                </div>
            </div>
        </div>

    </ShineBorder>
  )
}

export default Hero