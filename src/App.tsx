import { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { MdRadioButtonChecked } from "react-icons/md";
import { SlideShowData } from "../src/components/waitlist/slideShowData";

function App() {

  const [message, setMessage] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const CurrentIcon = SlideShowData[currentSlide].icon;

  useEffect(() => {
    const pingServer = async () => {
      try {
        const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL;
        const response = await fetch(`${PRODUCTION_URL}/ping`);
        const data = await response.json();
        // setMessage(data.message);
        setMessage('Server is up');
        console.log(data);
      } catch (error) {
        // setMessage('Server is down');
        console.error(error);
      }
    };

    pingServer();
  }, []);

  return (
    <>
      <section className='flex justify-evenly items-center text-center h-[90vh] font-mono bg-gray-50 text-gray-800'>
        <Analytics />

        {/* Slider Container */}
        <section className='w-[40%]'>
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
        </section>

        {/* Main Container */}
        <section className='w-[40%]'>
          <h1 className='text-center font-bold sm:text-[100px] text-[75px] handjet'>KenkoNav</h1>
          <div className='sm:text-2xl text-md'>
            Which product would you like to pick today?
          </div>
          <div className='flex flex-col gap-y-4 my-10'>
            <Button route="/food" text="Food" />
            <Button route="/cosmetics" text="Cosmetics" />
          </div>
          {message ? <p className='flex items-center justify-center gap-x-2'><MdRadioButtonChecked className='text-green-500' />{message}</p>
            : <p className='flex items-center justify-center gap-x-2'><MdRadioButtonChecked className='text-red-500' />Server is down</p>}
        </section>
      </section>
    </>
  );
}

const Button = ({ route, text }: { route: string, text: string }) => {
  return (
    <Link to={route}>
      <button className='btn btn-wide rounded-none hover:bg-gray-800 hover:text-white'>
        {text}
      </button>
    </Link>
  );
}

export default App;