import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import HomeFeed from './features/HomeFeed'
import ArticleList from "./features/ArticleList.jsx"
import Profile from "./features/Profile.jsx"

import Setting from "./features/Setting.jsx"
import CompleteProfile from './features/Completeprofile.jsx'
import BlogPage from './features/BlogPage.jsx'
import HomeButton from './features/HomeButton.jsx'
import PrivateRoute from './components/protectedRoute/PrivateRoute.jsx'
import BlogWriteForm from './features/BlogWriteForm.jsx'
import Navbar from './features/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import Bloglist from './features/Bloglist.jsx'


function App() {

  return (
    <div >
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<HomeFeed />} />
        </Route>

        {/* <Route path='/userAuth/:mode' element={<UserAuth />} />
          <Route path='/user/complete-profile' element={<PrivateRoute><CompleteProfile/></PrivateRoute>}/>
        */}



        <Route path='/write-article' element={<BlogWriteForm />} />
        <Route path='/your-articles' element={<ArticleList/>}/>
        <Route path='/blog/:blogId' element={<BlogPage/>}/>
        <Route path='*' element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
