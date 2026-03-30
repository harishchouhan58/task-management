import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/Pages/Home.jsx'
import About from './components/Pages/About.jsx'
import Contact from './components/Pages/Contact.jsx'
import Register from './components/Pages/Register.jsx'
import Login from './components/Pages/Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }

//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
      <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
