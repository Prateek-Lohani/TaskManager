import React from 'react'
import { useAuth } from '../../contexts/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { doSignOut } from '../../firebase/auth'
import TaskList from '../TaskList'


const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate()
    return (<div className=' '>
        <div className='px-4 py-2 items-center w-full h-[4vh]  flex justify-end'>
            <header className='flex gap-2'>
        <nav className='text-sm font-light pt-0 text-right'>Hi! {currentUser.displayName ? currentUser.displayName : currentUser.email}.</nav>
        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-xs font-bold text-blue-600'>Logout</button>
        </header>
        </div>
        <main className='w-full min-h-[96vh] px-4 py-3 bg-black/90'>
            <TaskList/>
        </main>
        </div>
    )
}

export default Home