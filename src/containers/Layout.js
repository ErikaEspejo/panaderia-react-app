import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Aside from '../components/Aside';
import Main from './Main';
import sidebarBg from '../components/assets/bg1.jpg';

function Layout() {
  const rtl = false;
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Router>
        <Aside
          image={sidebarBg}
          collapsed={collapsed}
          rtl={rtl}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Main
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        >
          <Switch>
            <Route exact path="/hallazgo/nuevo" />
            <Route exact path="/hallazgo/modificar" />
            <Route exact path="/hallazgo" />
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
            <Route exact path="/admin-accesos" />
            <Route exact path="/reportes" />
          </Switch>
        </Main>
      </Router>
    </div>
  );
}

export default Layout;
