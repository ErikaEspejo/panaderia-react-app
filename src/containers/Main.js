import React from 'react';
import Switch from 'react-switch';
import Headers from '../components/Headers';
import { HiBadgeCheck } from 'react-icons/hi';

const Main = ({ collapsed, handleToggleSidebar, handleCollapsedChange }) => {
  const showMenu = (collapsed) => {
    return collapsed ? 'Desplegar Menú' : 'Colapsar Menú';
  };

  return (
    <main>
      <div className="block ">
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
      {/* AQUI VA EL SWITCH PARA LAS DIFERENTES PAGINAS */}
      <Headers title={'Gestión de Calidad'} icon={<HiBadgeCheck />} />
    </main>
  );
};

export default Main;
