import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const Contact = () => {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const progressBarRef = useRef(null);

  const [placeholders, setPlaceholders] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [typingDone, setTypingDone] = useState(false);
  const [sendStatus, setSendStatus] = useState('idle'); // idle | sending | sent

  useEffect(() => {
    gsap.to(formRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.fromTo(
          formRef.current,
          { boxShadow: "0px 0px 0px rgba(0,255,0,0)" },
          { boxShadow: "0px 0px 20px rgba(0,255,0,0.4)", duration: 1.5, ease: "power2.out" }
        );
        gsap.to(formRef.current, {
          boxShadow: "0px 0px 25px rgba(0,255,0,0.6)",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
        typePlaceholders();
      },
    });
  }, []);

  const typePlaceholders = () => {
    const data = [
      { key: "name", text: "Your Name" },
      { key: "email", text: "Your Email" },
      { key: "phone", text: "Your Phone" },
      { key: "message", text: "Your Message" },
    ];

    data.forEach(({ key, text }, index) => {
      setTimeout(() => {
        let currentIndex = 0;
        let blink = true;
        const interval = setInterval(() => {
          setPlaceholders((prev) => ({
            ...prev,
            [key]: text.substring(0, currentIndex + 1) + (blink ? "|" : "")
          }));
          blink = !blink;
          currentIndex++;
          if (currentIndex >= text.length) {
            clearInterval(interval);
            setPlaceholders((prev) => ({
              ...prev,
              [key]: text
            }));
            if (index === data.length - 1) {
              setTypingDone(true);
            }
          }
        }, 80);
      }, index * 700);
    });
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (sendStatus !== 'idle') return;
    setSendStatus('sending');

    gsap.fromTo(progressBarRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 2,
        ease: "linear",
        onComplete: () => {
          setSendStatus('sent');

          gsap.to(buttonRef.current, {
            x: 300,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center py-16 px-4 md:px-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-start">

        {/* Left Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-green-500">
              Get In Touch With Us
            </h2>
            <p className="mb-8 text-gray-300 leading-relaxed max-w-md">
              We’d love to hear from you! Whether you have a question, suggestion, or just want to say hello — feel free to reach out using the form or contact details below.
            </p>
          </div>

          {/* Contact Details with Icons */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* Phone Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 text-green-400 fill-current">
                <path d="M16 0C.449 0 0 5.387 0 6.001v6C0 13.103.897 14 2 14h6c1.103 0 2-.897 2-1.999V8h12v4.001c0 1.102.897 1.999 2 1.999h6c1.103 0 2-.897 2-1.999v-6C32 5.387 31.551 0 16 0zm14 12-6 .001V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v5l-6 .001-.001-5.957C2.002 6.004 2.536 2 16 2c13.458 0 13.997 4.001 14 4.001V12zM27 28c0 1.103-.897 2-2 2H7c-1.103 0-2-.897-2-2V16H3v12c0 2.206 1.794 4 4 4h18c2.206 0 4-1.794 4-4V16h-2v12z"/>
                <path d="M23 21c0-3.86-3.14-7-7-7s-7 3.14-7 7 3.14 7 7 7 7-3.14 7-7zm-12 0c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"/>
                <circle cx="16" cy="21" r="2"/>
              </svg>
              <span className="text-gray-300">+977 9813674597</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Mail Icon */}
              <svg data-name="1-Mail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 text-green-400 fill-current">
                <path d="M28 28H4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4zM4 6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"/>
                <path d="M16 18a1 1 0 0 1-.618-.214l-14-11a1 1 0 1 1 1.236-1.572L16 15.728 29.382 5.214a1 1 0 1 1 1.236 1.572l-14 11A1 1 0 0 1 16 18z"/>
                <path d="M2 27a1 1 0 0 1-.707-1.707l11-11a1 1 0 0 1 1.414 1.414l-11 11A1 1 0 0 1 2 27zM30 27a1 1 0 0 1-.707-.293l-11-11a1 1 0 0 1 1.414-1.414l11 11A1 1 0 0 1 30 27z"/>
              </svg>
              <span className="text-gray-300">karmayogi@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div
          ref={formRef}
          className="bg-[#2F4454] p-6 md:p-8 rounded-md w-full opacity-0 scale-90 relative overflow-hidden"
        >
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={placeholders.name}
              className="px-4 py-2 rounded-sm text-black focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder={placeholders.email}
              className="px-4 py-2 rounded-sm text-black focus:outline-none"
              required
            />
            <input
              type="tel"
              placeholder={placeholders.phone}
              className="px-4 py-2 rounded-sm text-black focus:outline-none"
            />
            <textarea
              rows="4"
              placeholder={placeholders.message}
              className="px-4 py-2 rounded-sm text-black focus:outline-none"
              required
            ></textarea>

            {/* Button */}
            <div className="relative">
              <button
                ref={buttonRef}
                type="submit"
                disabled={sendStatus !== 'idle'}
                className={`bg-green-500 text-white py-2 px-4 w-full rounded-sm transition-all duration-300 hover:bg-green-600`}
              >
                {sendStatus === 'idle' && 'Send Message'}
                {sendStatus === 'sending' && 'Sending...'}
                {sendStatus === 'sent' && 'Sent!'}
              </button>

              {/* Progress bar */}
              {sendStatus === 'sending' && (
                <div
                  ref={progressBarRef}
                  className="absolute bottom-0 left-0 h-1 bg-green-400 w-0 rounded-b-md"
                ></div>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
