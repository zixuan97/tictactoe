import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';

const sidebarWidth = '15%';


const Home = (props) => {
  return (
    <div style={{ width: '100%' }}>
      <Sidebar sidebarWidth={sidebarWidth}/>
      <div
        style={{
          width: `calc(100% - ${sidebarWidth})`,
          boxSizing: 'border-box',
          margin: `64px 0 0 ${sidebarWidth}`,
          padding: '0 1em'
        }}
      >
        <Outlet />
        {props.children}
      </div>
    </div>
  );
};

export default Home;
