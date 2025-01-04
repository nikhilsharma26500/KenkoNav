import React, { useState, useRef, useEffect } from "react";
import {
  Leaf,
  ShieldCheck,
  Scan,
  Sparkles,
  Apple,
  Carrot,
  Banana,
  Cookie,
  Bell
} from "lucide-react";

import '../../App.css'
import { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const SlideShowData = [
  {
    slide: 1,
    heading: "Not sure what you're consuming?",
    info: [],
    icon: Leaf,
    accent: "from-emerald-400 to-green-500",
    decoration: [Apple, Carrot]
  },
  {
    slide: 2,
    heading: "Want to avoid harmful ingredients?",
    info: [],
    icon: ShieldCheck,
    accent: "from-violet-400 to-purple-500",
    decoration: [Cookie, Bell]
  },
  {
    slide: 3,
    heading: "Scan the ingredients using AI to get insights!",
    info: [],
    icon: Scan,
    accent: "from-blue-400 to-cyan-500",
    decoration: [Sparkles, Banana]
  },
];

const FloatingIcon = ({ Icon, className }: { Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, className: string }) => (
  <div className={`absolute ${className} animate-float`}>
    <Icon className="w-6 h-6 text-gray-400/30" />
  </div>
);

const Waitlist = () => {
  const form = useRef<HTMLFormElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
  });
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentSlide((prev) =>
          prev === SlideShowData.length - 1 ? 0 : prev + 1
        );
        setIsSliding(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.user_name || !formData.user_email) {
      toast.error("Please fill in all fields");
      return;
    }

    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_ID;
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;

    if (form.current && SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      try {
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          form.current,
          { publicKey: PUBLIC_KEY }
        );
        toast.success("Successfully joined waitlist");
        setFormData({ user_name: "", user_email: "" });
        if (form.current) form.current.reset();
      } catch (error) {
        toast.error("Failed to join waitlist");
        console.error("EmailJS Error:", error);
      }
    } else {
      toast.error("Configuration error");
    }
  };


  const CurrentIcon = SlideShowData[currentSlide].icon;

  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

        <Toaster position="bottom-center" />

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-4 sm:p-6 md:p-8 relative">
          {/* Decorative Background Elements - Hidden on smaller screens */}
          <div className="absolute inset-0 overflow-hidden hidden md:block">
            <FloatingIcon Icon={CurrentIcon} className="top-12 left-1/4" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 space-y-6 md:space-y-8">
            <div className="text-center md:text-left space-y-3 md:space-y-4">
              <div className="inline-block">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
                  KenkoNav
                </h1>
                <div className="h-1 w-1/2 bg-gray-900 rounded-full mx-auto md:mx-0" />
              </div>
              <p className="text-base sm:text-lg text-gray-600">
                AI-powered guide to healthier food choices
              </p>
            </div>

            <form ref={form} onSubmit={handleSubmit} className="space-y-4 md:space-y-6 max-w-sm mx-auto md:mx-0">
              <div className="relative group">
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, user_name: e.target.value }))
                  }
                  placeholder="Name"
                  className="w-full p-3 md:p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-none focus:outline-none focus:border-gray-900 transition-all duration-300 shadow-sm group-hover:shadow-md"
                  required
                />
                <div className="absolute inset-0 rounded-none bg-gradient-to-r from-emerald-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="user_email"
                  value={formData.user_email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, user_email: e.target.value }))
                  }
                  placeholder="Email"
                  className="w-full p-3 md:p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-none focus:outline-none focus:border-gray-900 transition-all duration-300 shadow-sm group-hover:shadow-md"
                  required
                />
                <div className="absolute inset-0 rounded-none bg-gradient-to-r from-emerald-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              <div className="flex justify-center md:justify-start">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-gray-900 text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                >
                  Join the Waitlist
                </button>
              </div>
            </form>
          </div>

          {/* Slides Container */}
          <div className="relative mt-8 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-transparent rounded-none md:rounded-3xl backdrop-blur-sm" />
            <div className="relative h-64 sm:h-80 md:h-full flex items-center justify-center p-4 sm:p-6">
              <div
                className={`transition-all duration-700 ease-in-out transform ${isSliding ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                  }`}
              >
                <div className="text-center space-y-6 md:space-y-8">
                  <div className="relative">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-2xl md:rounded-3xl 
                      bg-gradient-to-br ${SlideShowData[currentSlide].accent} p-4 md:p-6 
                      transform transition-transform duration-700 hover:rotate-12`}
                    >
                      <CurrentIcon className="w-full h-full text-white" />
                    </div>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl md:rounded-3xl blur-xl" />
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-4">
                    {SlideShowData[currentSlide].heading}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Waitlist;