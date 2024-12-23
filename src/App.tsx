import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

function App() {

    const [message, setMessage] = React.useState<string>('');
  
    React.useEffect(() => {
      const pingServer = async () => {
        try {
          const PRODUCTION_URL = import.meta.env.VITE_PRODUCTION_URL;
          const response = await fetch(`${PRODUCTION_URL}/ping`);
          const data = await response.json();
          setMessage(data.message);
        } catch (error) {
          setMessage(String(error));
        }
      };
  
      pingServer();
    }, []);

  return (
    <>
      <section className='flex flex-col justify-center items-center text-center h-[90vh] font-mono bg-gray-50 text-gray-800'>
        <Analytics/>
        <h1 className='text-center font-bold sm:text-[100px] text-[75px] handjet'>KenkoNav</h1>
        <div className='sm:text-2xl text-md'>
          Which product would you like to pick today?
        </div>
        <div className='flex flex-col gap-y-4 my-10'>
          <Button route="/food" text="Food"/>
          <Button route="/cosmetics" text="Cosmetics"/>
        </div>
        {message && <p>{message}</p>}
      </section>
    </>
  );
}

const Button = ({route, text} : {route: string, text: string}) => {
  return (
    <Link to={route}>
      <button className='btn btn-wide rounded-none hover:bg-gray-800 hover:text-white'>
        {text}
      </button>
    </Link>
  );
}

export default App;