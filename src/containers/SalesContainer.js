import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NuevoPedido from '../pages/NuevoPedido';
import PedidosActivos from '../pages/PedidosActivos';
import HistorialPedidos from '../pages/HistorialPedidos';

export default function SalesContainer() {
  return (
    <>
      <Switch>
        <Route exact path="/sales/new" component={NuevoPedido} />
        <Route exact path="/sales/active" component={PedidosActivos} />
        <Route exact path="/sales/history" component={HistorialPedidos} />
      </Switch>
    </>
  );
}
