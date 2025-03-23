import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import About from  './components/About'
import BlogPage from './components/BlogPage'
import Careers from './components/Careers'
import MeetTeams from './components/MeetTeams'
import Help from './components/Help'
import ContactForm from './components/ContactForm'
import ResetPassword from './components/auth/ResetPassword'
import './App.css'
import UpdateJobs from './components/admin/UpdateJobs'
import { Delete } from 'lucide-react'
import CompanyList from './components/CompanyList'
import Review from './components/Review'
import { useTranslation } from "react-i18next";
import "./i18n";
import LanguageSelector from './LanguageSelector'
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import Chat from './components/Chat'



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
{
  path:'/forget-password',
  element:<ForgotPassword/>
},
{
  path:'/reset-password',
  element:<ResetPassword/>
},
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/careers",
    element: <Careers />
  },
  {
    path: "/contact",
    element: <ContactForm/>
  },
  {
    path: "/review",
    element: <Review />
  },
  {
    path: "/help",
    element: <Help />
  },
  {
    path: "/companies",
    element: <Companies />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/blogpage",
    element: <BlogPage />
  },
  {
    path: "/aboutus",
    element: <About />
  },
    {
      path:'/newchat',
      element:<Chat/>
  
    },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/all-companies",
    element: <CompanyList/>
  },
  {
    path: "/meetteams",
    element: <MeetTeams/>
  },
  
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/update",
    element: <ProtectedRoute><UpdateJobs /></ProtectedRoute>
  },
  {
    path: "/admin/companies/delete/:id",
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
  }

])
function App() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  

  useEffect(() => {
    // Reset language to English when login/logout occurs
    i18n.changeLanguage("en");
  }, [user]);
  const isRecruiter = user?.role === "recruiter"; 
  
  return (
    
    <div className='app'>
    
    <div>
      <RouterProvider router={ appRouter }/>
      {isRecruiter && <LanguageSelector />}
      </div>
      
    </div>
  )
}

export default App
