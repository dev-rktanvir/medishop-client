import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading/Loading';

const MainLayout = () => {
    const {loading} = useAuth();
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className='overflow-x-hidden'>
            <header>
                <Navbar></Navbar>
            </header>
            <main className="pt-[72px]">
                <Outlet />
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;