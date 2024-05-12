import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = () => {

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
            <NavLink exact to="/dashboard" className="sidebar-link">
              <CDBSidebarMenuItem icon='chart-line'>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/technicians" className="sidebar-link">
              <CDBSidebarMenuItem icon='wrench'>Technicians</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/add" className="sidebar-link">
              <CDBSidebarMenuItem icon="user-plus">Add Technician</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/repair" className="sidebar-link">
              <CDBSidebarMenuItem icon="tools">Repair</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" className="sidebar-link">
              <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/message" className="sidebar-link">
              <CDBSidebarMenuItem icon="envelope">Messages</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
