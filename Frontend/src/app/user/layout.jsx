'use client';
import Sidebar from '@/components/sidebar'
import { DiagramProvider } from '@/context/DiagramContext';
import { DomProvider } from '@/context/DOMContext';
import React from 'react'

const Layout = ({ children }) => {
    return (
        <DomProvider>
            <DiagramProvider>
                {/* <Sidebar /> */}
                {children}
            </DiagramProvider>
        </DomProvider>
    )
}

export default Layout;