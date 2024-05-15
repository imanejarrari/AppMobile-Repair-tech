import React  , { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";
import ImageAvatars from "./ImageAvatars"


const Sidebar = () => {
  const [avatreDiv, setAvatareDiv] = useState(true);


  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#8B322C">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Repair Tech
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
             <NavLink exact to="/repair" className="sidebar-link">
              <CDBSidebarMenuItem icon="tools">Repair</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/technicians" className="sidebar-link">
              <CDBSidebarMenuItem icon='wrench'>Technicians</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/add" className="sidebar-link">
              <CDBSidebarMenuItem icon="user-plus">Add Technician</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/meeting" className="sidebar-link">
              <CDBSidebarMenuItem icon="calendar-alt">Meeting</CDBSidebarMenuItem>
            </NavLink>
           
           
            
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter>
          <div className='mx-auto mb-2' style={{ width: avatreDiv ? "40px": "200px" ,transition: 'width 0.5s',}} onClick={handlAvatreDiv => {setAvatareDiv(!avatreDiv)}}>
            <ImageAvatars />
          </div>
        </CDBSidebarFooter>

        
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
