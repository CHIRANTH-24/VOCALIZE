import React, { useEffect } from 'react'
import { InfiniteMovingCards } from './ui/infinte-moving-cards.jsx'
import { assets } from '@/assets/assets.js';

const testimonials = [
    {
      desc: "This platform has truly transformed the way I practice my speech exercises. The progression is perfectly tailored to my needs and is spot on!",
      name: "John Doe",
      image: assets.person1
    },
    {
      desc: "I was struggling with a lisp for years, and within just a few weeks of using this program, I noticed a significant improvement. Highly recommended!",
      name: "Jane Smith",
      image: assets.person2
    },
    {
      desc: "The lessons are so engaging, and the guidance feels personal. The AI feedback helped me understand where I was going wrong. Amazing experience!",
      name: "Emily Johnson",
      image: assets.person3
    },
    {
      desc: "As a parent, I appreciate how easy it is to track my child’s progress. The daily challenges are effective and fun!",
      name: "Michael Brown",
      image: assets.person4
    },
    {
      desc: "The integration of AI and personalized speech therapy plans is brilliant. I’m thrilled with my progress so far!",
      name: "Sophia Wilson",
      image: assets.person5
    }
  ];
  

const Testimonials = () => {

  useEffect(() => {
    // Initialize ScrollReveal
    ScrollReveal().reveal('.testimonials-title', {
      duration: 1000,       // Animation duration in milliseconds
      distance: '50px',     // Distance to move element
      origin: 'bottom',     // Animation starts from bottom
      opacity: 0,           // Initial opacity
      easing: 'ease-in-out', // Animation easing
      reset: true
    });
  
    ScrollReveal().reveal('.testimonials-subtitle', {
      duration: 1000,
      delay: 200,           // Add delay to start after the title animation
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      easing: 'ease-in-out',
      reset: true
    });
  
  }, []);

  return (
    <div className=' relative max-w-[1280px] mx-auto mt-28 text-white pt-8  flex flex-col gap-8 items-center z-10 mb-24'>
        <div className="flex flex-col items-center">
            <h2 className="font-extrabold text-[64px] testimonials-title"
            style={{
                textShadow: '2px 2px 5px black'
            }}>TESTIMONIALS</h2>
            <h3 className="font-medium text-[32px] relative top-[-10px] testimonials-subtitle"
            style={{
                textShadow: '2px 2px 5px black'
            }}>Hear Our Success Stories!</h3>
        </div>

        <div>
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
        
    </div>
  )
}

export default Testimonials



