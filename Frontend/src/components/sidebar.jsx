'use client';
import React, { useState } from 'react'
import { slide as Menu } from 'react-burger-menu';
import { Handle } from 'reactflow';

const Sidebar = () => {

    return (
        <Menu>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <a className="menu-item--small" href="">Settings</a>
            <menubar pageWrapId={"page-wrap"} />
            <pageWrapId outerContainerId={"outer-container"} />
            <menubar isOpen="isOpen={ true }"></menubar>
            <Menu burgerButtonClassName={"my-class"} />
            <Menu burgerBarClassName={"my-class"} />
            <Menu crossButtonClassName={"my-class"} />
            <Menu crossClassName={"my-class"} />
            <Menu menuClassName={"my-class"} />
            <Menu morphShapeClassName={"my-class"} />
            <Menu itemListClassName={"my-class"} />
            <Menu overlayClassName={"my-class"} />
        </Menu>

    );
};

export default Sidebar;