import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"

function App() {

    const [message, setMessage] = React.useState<string>('');
  
    React.useEffect(() => {
      const pingServer = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/');
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
      <section className='flex flex-col justify-center items-center text-center h-screen font-mono'>
        <Analytics/>
        <h1 className='text-center font-bold sm:text-[100px] text-[75px] handjet'>KenkoNav</h1>
        <div className='sm:text-2xl text-md'>
          Which product would you like to pick today?
        </div>
        <div className='flex flex-col gap-y-4 my-10'>
          <Link to="/food">
            <button className='btn btn-wide'>
              Food
            </button>
          </Link>
          <Link to="/cosmetics">
            <button className='btn btn-wide'>
              Cosmetics
            </button>
          </Link>
        </div>
        {message && <p>{message}</p>}
      </section>
    </>
  );
}

export default App;