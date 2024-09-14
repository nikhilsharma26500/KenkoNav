import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <>
      <section className='flex flex-col justify-center items-center text-center h-screen font-mono'>
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
      </section>
    </>
  );
}

export default App;