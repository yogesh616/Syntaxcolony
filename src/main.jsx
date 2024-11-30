
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './Context/Context.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Article from './Routes/Article.jsx'
import User from './Routes/User.jsx'
import Videos from './Routes/Videos.jsx'
import Video from './Routes/Video.jsx'

createRoot(document.getElementById('root')).render(
 <ContextProvider>
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<App />} />
    <Route path="/article" element={<Article />} />
    <Route path="/user" element={<User />} />
    <Route path="/videos" element={<Videos />} />
    <Route path="/video" element={<Video />} />
   </Routes>
  </BrowserRouter>
 </ContextProvider>
)
