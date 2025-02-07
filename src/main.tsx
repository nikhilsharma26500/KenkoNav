import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Food from './components/food/food.tsx'
import Cosmetics from './components/cosmetics/cosmetics.tsx'
// import Waitlist from './components/waitlist/waitlist_temp.tsx'
// import Waitlist from './components/waitlist/waitlist.tsx'
import Layout from './layout.tsx'
import TermsOfService from './components/ToS/TOS.tsx'
import PrivacyPolicy from './components/ToS/PP.tsx'
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
        {/* {/* <Route path='/' element={<App />} /> */}
        {/* <Route path='/' element={<Navigate to="/waitlist"/>} />
        <Route path='/waitlist' element={<WaitlistMain/>} /> */}
        {/* <Route path="/waitlist" element={<Waitlist />} /> */}
        <Route path='*' element={<App />} />
        <Route path="/food" element={<Food />} />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path='/tos' element={<TermsOfService />} />
        <Route path='/privacy_policy' element={<PrivacyPolicy />} />
      </Routes>
      </Layout>
    </Router>
  </StrictMode>,
)
