import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { SlideShowData } from "./slideShowData";

type SignUpFormState = {
  user_name: string;
  user_email: string;
};

const Waitlist: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState<SignUpFormState>({
    user_name: "",
    user_email: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === SlideShowData.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.user_name || !formData.user_email) {
      toast.error("Please fill in all fields");
      return;
    }

    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_ID;
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;

    if (form.current && SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, { publicKey: PUBLIC_KEY })
        .then(
          () => {
            toast.success("Successfully joined waitlist");
            setFormData({ user_name: "", user_email: "" });
            if (form.current) form.current.reset();
          },
          () => toast.error("Failed to join waitlist")
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 text-gray-800">
      <Toaster position="bottom-center" />
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-12">

        {/* Info Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="h-64 overflow-hidden relative">
            {SlideShowData.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <h2 className="text-3xl handjet font-semibold mb-2">{slide.heading}</h2>
                <ul className="space-y-1">
                  {slide.info.map((content, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            {SlideShowData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="md:col-span-1 space-y-6">
          <div className="text-center">
            <h1 className="font-bold mb-1 handjet text-6xl">KenkoNav</h1>
            <p className="text-sm text-gray-500">Discover what's in your food</p>
          </div>
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, user_name: e.target.value }))
              }
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, user_email: e.target.value }))
              }
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
            <button
              type="submit"
              className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Join Waitlist
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Waitlist;
