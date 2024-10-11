import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Food from './components/food/food.tsx'
import Cosmetics from './components/cosmetics/cosmetics.tsx'
import Waitlist from './components/waitlist/waitlist_temp.tsx'
import WaitlistMain from './components/waitlist/waitlist.tsx'
import Layout from './layout.tsx'
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
      <Layout>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/waitlist"/>}/> */}
        <Route path='/' element={<App />} />
        <Route path="/food" element={<Food />} />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path='/main_waitlist' element={<WaitlistMain/>} />
        <Route path='*' element={<App />} />
      </Routes>
      </Layout>
    </Router>
  </StrictMode>,
)
