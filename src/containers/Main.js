import React from 'react';
import Toggle from 'react-switch';
import { Switch, Route } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import HistorialHallazgos from '../pages/HistorialHallazgos';
import NuevoHallazgo from '../pages/NuevoHallazgo';
import ListaAccesos from '../pages/ListaAccesos';
import ListaProveedores from '../pages/ListaProveedores';
import ListaInsumos from '../pages/ListaInsumos';
import ListaProductos from '../pages/ListaProductos';
import ListaProduccion from '../pages/ListaProduccion';
import ListaCostos from '../pages/ListaCostos';
import ListaPersonal from '../pages/ListaPersonal';
import ListaVentas from '../pages/ListaVentas';
import ModificarHallazgo from '../pages/ModificarHallazgo';

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
        <Route exact path="/hallazgo/:id" component={ModificarHallazgo} />
        <Route exact path="/hallazgo" component={HistorialHallazgos} />
        <Route
          exact
          path="/produccion/proveedor"
          component={ListaProveedores}
        />
        <Route exact path="/produccion/proveedor/nuevo" />
        <Route exact path="/produccion/proveedor/modificar" />
        <Route exact path="/produccion/insumos" component={ListaInsumos} />
        <Route exact path="/produccion/insumo/nuevo" />
        <Route exact path="/produccion/insumo/modificar" />
        <Route exact path="/produccion/productos" component={ListaProductos} />
        <Route exact path="/produccion/producto/nuevo" />
        <Route exact path="/produccion/producto/modificar" />
        <Route exact path="/produccion" component={ListaProduccion} />
        <Route exact path="/costos" component={ListaCostos} />
        <Route exact path="/costos/nuevo" />
        <Route exact path="/costos/modificar" />
        <Route exact path="/personal" component={ListaPersonal} />
        <Route exact path="/personal/nuevo" />
        <Route exact path="/personal/modificar" />
        <Route exact path="/ventas" component={ListaVentas} />
        <Route exact path="/accesos" component={ListaAccesos} />
        <Route exact path="/reportes" />
      </Switch>
    </main>
  );
};

export default Main;
