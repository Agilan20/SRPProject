import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


/** import all components */
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'
import Scholarship from './components/Scholarship';
import ScholarshipDetail from './components/ScholarshipDetail';
import ProfileUpdate from './components/ProfileUpdate';
import ScholarshipCreate from './components/ScholarshipCreate';

/** root routes */
const router = createBrowserRouter([
    {
        path : '/',
        element : <Username></Username>
    },
    {
        path : '/register',
        element : <Register></Register>
    },
    {
        path : '/password',
        element : <ProtectRoute><Password /></ProtectRoute>
    },
    {
        path : '/scholarship-create',
        element : <ScholarshipCreate />
    },
    {
        path : '/profile',
        element : <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path : '/profile-update',
        element : <ProfileUpdate />
    },
    {
        path : '/home',
        element : <Home />
    },
    {
        path : '/scholarship',
        element : <Scholarship />
    },
    {
        path : '/scholarship-detail',
        element : <ScholarshipDetail />
    },
    {
        path : '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path : '/reset',
        element : <Reset></Reset>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
    <main>
        <RouterProvider router={router}></RouterProvider>
    </main>
  )
}
