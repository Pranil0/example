import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const NavbarSlideUnderline = () => {
  const [isOpen, setIsOpen] = useState(false);
  const underlineRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink && underlineRef.current) {
      const { offsetLeft, offsetWidth } = activeLink;

      gsap.fromTo(
        underlineRef.current,
        { left: offsetLeft - 30, width: 0 },
        {
          left: offsetLeft,
          width: offsetWidth,
          duration: 0.5,
          ease: 'power3.out',
        }
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        }
      );
      gsap.fromTo(
        mobileLinksRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
          stagger: 0.1,
        }
      );
    }
  }, [isOpen]);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-black shadow-md text-white relative">
      {/* Logo */}
      <div className="text-green-500 font-bold text-xl">Karma Yogi</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-col relative">
        <ul className="flex gap-32 items-center text-white font-medium relative">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`nav-link ${
                  location.pathname === link.path
                    ? 'active text-green-500'
                    : 'hover:text-green-500 transition'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-[2px] bg-green-500 transition-all duration-500"
          style={{ left: 0, width: 0 }}
        />
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-8">
        <button className="bg-green-500 px-4 py-1 text-white hover:bg-green-600 transition rounded-full">
          Login
        </button>
        <button className="bg-green-500 px-4 py-1 text-white hover:bg-green-600 transition rounded-full">
          Signup
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          &#9776;
        </button>
      </div>

      {/* Animated Mobile Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-16 left-0 w-full flex flex-col gap-4 p-4 bg-black text-white md:hidden z-10"
        >
          {links.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              ref={(el) => (mobileLinksRef.current[index] = el)}
              className="hover:text-green-500"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            ref={(el) => (mobileLinksRef.current[links.length] = el)}
            className="border border-green-500 px-4 py-1 rounded text-green-500 hover:bg-green-500 hover:text-black transition"
          >
            Login
          </button>
          <button
            ref={(el) => (mobileLinksRef.current[links.length + 1] = el)}
            className="bg-green-500 px-4 py-1 rounded text-black hover:bg-green-600 transition"
          >
            Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavbarSlideUnderline;
