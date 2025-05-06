import './App.css'
import { Routes, Route } from "react-router-dom"
import UserAuth from "./features/UserAuth"
import Home from './pages/Home'
import HomeFeed from './features/HomeFeed'
import Dashboard from "./pages/Dashboard.jsx"
import ArticleList from "./features/ArticleList.jsx"
import Profile from "./features/Profile.jsx"
import BlogWriteForm from "./features/BlogWriteForm.jsx"
import Setting from "./features/Setting.jsx"
import HomeButton from './features/HomeButton.jsx'
import CompleteProfile from './features/Completeprofile.jsx'
import BlogPage from './features/BlogPage.jsx'


function App() {

  return (
    <div >
      <HomeButton/>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<HomeFeed />} />
        </Route>

        <Route path='/userAuth/:mode' element={<UserAuth />} />

        <Route path='/user/complete-profile' element={<CompleteProfile/>}/>

        <Route path='/blog/:blogId' element={<BlogPage/>}/>

        <Route path='/user/dashboard' element={<Dashboard />}>
          <Route index element={<ArticleList />} />
          <Route path='profile' element={<Profile />} />
          <Route path='write-blog' element={<BlogWriteForm />} />
          <Route path='setting' element={<Setting />} />
          <Route path='article-list' element={<ArticleList />} />
        </Route>

        <Route path='*' element={<Home />}/>
      </Routes>
    </div>
  )
}

export default App
