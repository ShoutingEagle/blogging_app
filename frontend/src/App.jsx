import './App.css'
import { Routes, Route } from "react-router-dom"
import UserAuth from "./features/UserAuth"
import Home from './pages/Home'
import HomeFeed from './features/HomeFeed'

function App() {

  return (
    <div >
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<HomeFeed />} />
        </Route>
        <Route path='/userAuth/:mode' element={<UserAuth />} />
      </Routes>
    </div>
  )
}

export default App
