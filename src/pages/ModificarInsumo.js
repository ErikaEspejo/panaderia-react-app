import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useStore } from '../store/Store';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { formatISO } from 'date-fns';
import useSupplies from '../containers/useSupplies';
import Modal from '../containers/Modal';
import NuevoTipo from './NuevoTipo';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const units = ['Kg', 'Lb', 'g', 'Lt'];

const ModificarInsumo = () => {
  const { id } = useParams();
  const history = useHistory();
  const [provider, setProvider] = useState([]);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  const { supply, providerId } = useSupplies({ id });

  async function loadProviders() {
    try {
      const data = await API.listProviders();
      if (data) {
        setProvider(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }
  const handleNewType = (e) => {
    e.preventDefault();
    setShow(true);
  };

  async function loadList() {
    try {
      const data = await API.listSupplyTypes();
      if (data) {
        setData(data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    const { name, type, quantity, units, ProviderId, totalCost } =
      event.target.elements;

    const providerArray = ProviderId.value.split('-');
    const provId = parseInt(providerArray[0]);

    if (
      name.value &&
      quantity.value &&
      units.value &&
      provId &&
      totalCost.value
    ) {
      try {
        setError('');
        await API.updateSupply({
          supply_id: id,
          name: name.value,
          type: type.value,
          quantity: parseFloat(quantity.value),
          units: units.value,
          ProviderId: provId,
          totalCost: parseFloat(totalCost.value),
        });
        history.push('/produccion/insumos');
      } catch (error) {
        console.log(error);
        setError('El insumo no ha podido ser actualizado correctamente');
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  useEffect(() => {
    loadProviders();
    loadList();
  }, []);

  if (!supply) return null;

  return (
    <>
      <Headers
        title={`Modificar Insumo - "${supply.name}"`}
        icon={<IoIosCreate />}
      />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <label htmlFor="">
            Nombre de Insumo
            <input type="text" name="name" defaultValue={supply.name} />
          </label>
          <label htmlFor="">
            Tipo de Insumo
            <select name="type">
              {data.map((element, index) => {
                return <option key={index}>{element.type}</option>;
              })}
            </select>
          </label>
          <button onClick={handleNewType}>Nuevo</button>
          <Modal
            show={show}
            children={
              <NuevoTipo
                tipo="Insumo"
                action={API.createSupplyTypes}
                show={show}
                onClose={() => setShow(false)}
              />
            }
          />
          <label htmlFor="">
            Cantidad
            <input
              type="number"
              step="0.01"
              name="quantity"
              defaultValue={supply.quantity}
            />
          </label>
          <select name="units">
            {units.map((unit, index) => {
              return <option key={index}>{unit}</option>;
            })}
          </select>
          <label htmlFor="">
            Proveedor
            <select name="ProviderId">
              <option
                selected
                disabled
              >{`${providerId} - ${supply.Provider.providerName}`}</option>
              {provider.map((prov, index) => {
                index = prov.id;
                return (
                  <option key={index}>
                    {prov.id} - {prov.providerName}
                  </option>
                );
              })}
            </select>
          </label>
          <button
            onClick={() => {
              history.push('/produccion/proveedor/nuevo');
            }}
          >
            Nuevo
          </button>
          <label htmlFor="">
            Costo Total
            <input
              type="number"
              step="0.01"
              name="totalCost"
              defaultValue={supply.totalCost}
            />
          </label>
          <button type="submit">
            {' '}
            <FaSave /> Guardar Insumo
          </button>
          <button
            onClick={() => {
              history.push('/produccion/insumos');
            }}
          >
            Cancel
          </button>
        </form>
      </Container>
    </>
  );
};

export default ModificarInsumo;
