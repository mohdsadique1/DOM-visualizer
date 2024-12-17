import Sidebar from '@/components/sidebar'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <>
            <Sidebar />
            {children}
        </>
    )
}

export default Layout