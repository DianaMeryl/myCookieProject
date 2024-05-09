import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components//Header';

export default function Layout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <div style={{ flex: 1 }}>
                <Header />
                <div className="title title__color">Easy Fast Healthy</div>
                <div>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}
