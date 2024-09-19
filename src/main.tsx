import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Food from './food/food.tsx'
import Cosmetics from './cosmetics/cosmetics.tsx'
import Waitlist from './waitlist/waitlist.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/food" element={<Food/>}/>
      <Route path="/cosmetics" element={<Cosmetics/>}/>
      <Route path="/waitlist" element={<Waitlist/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
