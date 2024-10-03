import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Food from './food/food.tsx'
import Cosmetics from './cosmetics/cosmetics.tsx'
import Waitlist from './waitlist/waitlist_temp.tsx'
import WaitlistMain from './waitlist/waitlist.tsx'
import './index.css'
import { Analytics } from "@vercel/analytics/react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate
} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics/>
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/waitlist"/>}/> */}
        <Route path='/' element={<App />} />
        <Route path="/food" element={<Food />} />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path='/main_waitlist' element={<WaitlistMain/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
