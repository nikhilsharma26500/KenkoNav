import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <section className='flex flex-col justify-center items-center h-screen'>
        <h1 className='font-mono text-center'>Welcome to Item Picker</h1>
        <div>
          Which one would you want to pick?
        </div>
        <div className=''>
          <Link to="/food">
            <button className='px-4 py-2 border-2 rounded-lg'>
              Food
            </button>
          </Link>
          <Link to="/cosmetics">
            <button className='px-4 py-2 border-2 rounded-lg'>
              Cosmetics
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default App;