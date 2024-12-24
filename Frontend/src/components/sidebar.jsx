'use client';
import React, { useState } from 'react'
import { slide as Menu } from 'react-burger-menu';

const CustomBurgerIcon = () => <img className='w-10 border border-red-500' src="/file.svg" />;

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Menu className='border border-blue-500' isOpen={isOpen} width={'300px'} customBurgerIcon={<CustomBurgerIcon />}>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
        </Menu>

    );
};

export default Sidebar;