import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { HiBadgeCheck, HiShoppingCart } from 'react-icons/hi';
import { FaTruck, FaUserTie, FaChartLine, FaUsersCog } from 'react-icons/fa';
import { RiCoinsFill } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import sidebarBg from './assets/bg1.jpg';
import profilePhoto from './assets/profile-photo.png';

const FullInfo = () => {
  return (
    <>
      <h3 style={{ fontSize: '12px' }}>PORTAL ADMINISTRATIVO</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          style={{ width: '70px', height: '70px' }}
          src={profilePhoto}
          alt="User"
        />
        <div style={{ marginLeft: '15px' }}>
          <h5 style={{ margin: '0 0 10px 0' }}>Administrador</h5>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: 'green',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
              }}
            ></div>
            <span style={{ marginLeft: '5px', fontSize: '10px' }}>
              Conectado
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const IconInfo = () => {
  return <img style={{ width: '30px' }} src={profilePhoto} alt="User" />;
};

const Aside = ({ collapsed, toggled, handleToggleSidebar }) => {
  const showProfileInfo = () => {
    return collapsed ? <IconInfo /> : <FullInfo />;
  };

  return (
    <ProSidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {showProfileInfo()}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <SubMenu icon={<HiBadgeCheck />} title="Gestión de Calidad">
            <MenuItem>Nuevo Hallazgo</MenuItem>
            <MenuItem>Historial de Hallazgos</MenuItem>
          </SubMenu>
          <SubMenu icon={<FaTruck />} title="Producción">
            <MenuItem> Proveedores</MenuItem>
            <MenuItem>Insumos</MenuItem>
            <MenuItem>Productos</MenuItem>
            <MenuItem>Producción</MenuItem>
          </SubMenu>
          <MenuItem icon={<RiCoinsFill />}>Costos</MenuItem>
          <SubMenu icon={<FaUserTie />} title="Personal">
            <MenuItem> Nuevo Trabajador</MenuItem>
            <MenuItem>Personal</MenuItem>
          </SubMenu>
          <MenuItem icon={<HiShoppingCart />}>Ventas</MenuItem>
          <MenuItem icon={<FaChartLine />}>Reportes</MenuItem>
          <MenuItem icon={<FaUsersCog />}>Administrar Accesos</MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <Menu iconShape="circle">
          <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
