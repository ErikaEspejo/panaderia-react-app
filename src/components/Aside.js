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
import { Link, useHistory } from 'react-router-dom';
import { HiBadgeCheck, HiShoppingCart } from 'react-icons/hi';
import { FaTruck, FaUserTie, FaChartLine, FaUsersCog } from 'react-icons/fa';
import { RiCoinsFill } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import sidebarBg from './assets/bg1.jpg';

import { isAuthenticated, clearSession } from '../utils/auth';
import { useStore } from '../store/Store';
import profilePhoto from './assets/profile-photo.png';

const FullInfo = ({ userName, userLastName }) => {
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
          <h5 style={{ margin: '0 0 10px 0' }}>
            {userName} {userLastName}
          </h5>
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
  const history = useHistory();
  const {
    selectors: { user },
    actions: { logout },
  } = useStore();

  const showProfileInfo = (name, lastname) => {
    return collapsed ? (
      <IconInfo />
    ) : (
      <FullInfo userName={name} userLastName={lastname} />
    );
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
          {showProfileInfo(user.name, user.lastname)}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <SubMenu icon={<HiBadgeCheck />} title="Gestión de Calidad">
            <MenuItem>
              <Link to="/hallazgo/nuevo">Nuevo Hallazgo</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/hallazgo">Historial de Hallazgos</Link>
            </MenuItem>
          </SubMenu>
          <SubMenu icon={<FaTruck />} title="Producción">
            <MenuItem>
              <Link to="/proveedores">Proveedores</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/insumos">Insumos</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/productos">Productos</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/produccion">Producción</Link>
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<RiCoinsFill />}>
            <Link to="/costos">Costos</Link>
          </MenuItem>
          <SubMenu icon={<FaUserTie />} title="Personal">
            <MenuItem>
              <Link to="/personal/nuevo">Nuevo Trabajador</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/personal">Personal</Link>
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<HiShoppingCart />}>
            <Link to="/ventas">Ventas</Link>
          </MenuItem>
          <MenuItem icon={<FaChartLine />}>
            <Link to="/reportes">Reportes</Link>
          </MenuItem>
          <MenuItem icon={<FaUsersCog />}>
            <Link to="/accesos">Administrar Accesos</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FiLogOut />}
            onClick={() => {
              clearSession();
              logout();
              history.push('/login');
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
