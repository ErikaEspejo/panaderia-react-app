import React from 'react';
import Toggle from 'react-switch';
import { Switch, Route } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import HistorialHallazgos from '../pages/HistorialHallazgos';
import NuevoHallazgo from '../pages/NuevoHallazgo';
import ListaAccesos from '../pages/ListaAccesos';

const Main = ({ collapsed, handleToggleSidebar, handleCollapsedChange }) => {
  const showMenu = (collapsed) => {
    return collapsed ? 'Desplegar Menú' : 'Colapsar Menú';
  };

  return (
    <main style={{ backgroundColor: 'rgb(235, 235, 235)' }}>
      <div className="block">
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Toggle
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

      <Switch>
        <Route exact path="/hallazgo/nuevo" component={NuevoHallazgo} />
        <Route exact path="/hallazgo/modificar" />
        <Route exact path="/hallazgo" component={HistorialHallazgos} />
        <Route exact path="/produccion/proveedor" />
        <Route exact path="/produccion/proveedor/nuevo" />
        <Route exact path="/produccion/proveedor/modificar" />
        <Route exact path="/produccion/insumo" />
        <Route exact path="/produccion/insumo/nuevo" />
        <Route exact path="/produccion/insumo/modificar" />
        <Route exact path="/produccion/producto" />
        <Route exact path="/produccion/producto/nuevo" />
        <Route exact path="/produccion/producto/modificar" />
        <Route exact path="/produccion/produccion" />
        <Route exact path="/costos" />
        <Route exact path="/costos/nuevo" />
        <Route exact path="/costos/modificar" />
        <Route exact path="/personal" />
        <Route exact path="/personal/nuevo" />
        <Route exact path="/personal/modificar" />
        <Route exact path="/ventas" />
        <Route exact path="/accesos" component={ListaAccesos} />
        <Route exact path="/reportes" />
      </Switch>
    </main>
  );
};

export default Main;
