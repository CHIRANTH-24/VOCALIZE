import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets.js';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track last scroll position

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navbarClasses = `fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`;

  // Landing Page Navbar
  if (location.pathname === '/') {
    return (
      <div
        className={`${navbarClasses} flex justify-between items-center w-[90%] px-4 text-white max-w-[1280px] border border-t-0 p-4 rounded-xl backdrop-blur-[10px] bg-black/50`}
      >
        <div
          onClick={() => navigate('/')}
          className="rounded-full overflow-hidden inline-block"
        >
          <img src={assets.Logo} className="h-[80px] inline" />
        </div>

        <div className="flex gap-4 border border-white px-4 py-3 rounded-full">
          <NavLink
            className={({ isActive }) =>
              `text-xl px-3 py-1 rounded-full hover:text-primary-orange transition-all ${
                isActive ? 'border-white border' : ''
              }`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-xl px-3 py-1 rounded-full hover:text-primary-orange transition-all ${
                isActive ? 'border-white border' : ''
              }`
            }
            to="/diagnose"
          >
            Diagnose
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-xl px-3 py-1 rounded-full hover:text-primary-orange transition-all ${
                isActive ? 'border-white border' : ''
              }`
            }
            to="/lessons"
          >
            Lessons
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-xl px-3 py-1 rounded-full hover:text-primary-orange transition-all ${
                isActive ? 'border-white border' : ''
              }`
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-xl px-3 py-1 rounded-full hover:text-primary-orange transition-all ${
                isActive ? 'border-white border' : ''
              }`
            }
            to="/contact"
          >
            Contact
          </NavLink>
        </div>

        <NavLink
          to="/login"
          className="text-xl bg-primary-orange px-4 py-2 border-2 rounded-full hover:scale-105 transition-all duration-500"
        >
          Login
        </NavLink>
      </div>
    );
  }

  // White Navbar
  return (
    <div
      className={`${navbarClasses} flex justify-between items-center w-[90%] px-4 text-black max-w-[1280px] border border-black border-t-0 p-4 rounded-xl backdrop-blur-[10px] bg-white/50`}
    >
      <div
        onClick={() => navigate('/')}
        className="rounded-full overflow-hidden inline-block border-2 border-black"
      >
        <img src={assets.Logo} className="h-[80px] inline" />
      </div>

      <div className="flex gap-4 border border-black px-4 py-3 rounded-full">
        <NavLink
          className={({ isActive }) =>
            `text-xl px-3 py-1 rounded-full hover:text-primary-blue transition-all ${
              isActive ? 'border-black border' : ''
            }`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-xl px-3 py-1 rounded-full hover:text-primary-blue transition-all ${
              isActive ? 'border-black border' : ''
            }`
          }
          to="/diagnose"
        >
          Diagnose
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-xl px-3 py-1 rounded-full hover:text-primary-blue transition-all ${
              isActive ? 'border-black border' : ''
            }`
          }
          to="/lessons"
        >
          Lessons
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-xl px-3 py-1 rounded-full hover:text-primary-blue transition-all ${
              isActive ? 'border-black border' : ''
            }`
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-xl px-3 py-1 rounded-full hover:text-primary-blue transition-all ${
              isActive ? 'border-black border' : ''
            }`
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </div>

      <NavLink
        to="/login"
        className="text-xl bg-primary-blue px-4 py-2 border-2 rounded-full text-white border-black hover:scale-105 transition-all duration-500"
      >
        Login
      </NavLink>
    </div>
  );
};

export default Navbar;
