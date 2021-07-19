import React from 'react';
import Switch from 'react-switch';
import { FaBars } from 'react-icons/fa';

const Main = ({ collapsed, handleToggleSidebar, handleCollapsedChange }) => {
  const showMenu = (collapsed) => {
    return collapsed ? 'Desplegar Menú' : 'Colapsar Menú';
  };

  return (
    <main>
      <div className="block">
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleCollapsedChange}
          checked={collapsed}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span> {showMenu(collapsed)}</span>
      </div>
    </main>
  );
};

export default Main;
