import React, { useState, useEffect } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useStore } from '../store/Store';
import { useHistory, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { formatISO } from 'date-fns';
import useProviders from '../containers/useProviders';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const ModificarProveedor = () => {
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState('');

  const { provider, address } = useProviders({ id });

  async function onSubmit(event) {
    event.preventDefault();
    const {
      nit,
      providerName,
      providerPhone,
      providerWeb,
      address,
      country,
      city,
      contactName,
      contactPhone,
      contactEmail,
      supplies,
    } = event.target.elements;

    const fullAddress = `${address.value}/${city.value}/${country.value}`;

    if (
      providerName.value &&
      providerPhone.value &&
      address.value &&
      contactName.value &&
      contactPhone.value &&
      supplies.value
    ) {
      try {
        setError('');
        await API.updateProvider({
          id,
          nit: nit.value,
          providerName: providerName.value,
          providerPhone: providerPhone.value,
          providerWeb: providerWeb.value,
          address: fullAddress,
          contactName: contactName.value,
          contactPhone: contactPhone.value,
          contactEmail: contactEmail.value,
          supplies: supplies.value,
        });
        history.push('/produccion/proveedor');
      } catch (error) {
        console.log(error);
        setError('El proveedor no ha podido ser actualizado correctamente');
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  if (!provider) return null;

  return (
    <>
      <Headers
        title={`Modificar Proveedor - No. ${provider.providerName}`}
        icon={<IoIosCreate />}
      />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <h3>Datos de la empresa</h3>
              <label htmlFor="">
                NIT
                <input type="text" name="nit" defaultValue={provider.nit} />
              </label>
              <label htmlFor="">
                Nombre
                <input
                  type="text"
                  name="providerName"
                  defaultValue={provider.providerName}
                />
              </label>
              <label htmlFor="">
                Teléfono
                <input
                  type="text"
                  name="providerPhone"
                  defaultValue={provider.providerPhone}
                />
              </label>
              <label htmlFor="">
                Sitio Web
                <input
                  type="text"
                  name="providerWeb"
                  defaultValue={provider.providerWeb}
                />
              </label>
              <label htmlFor="">
                Dirección
                <input type="text" name="address" defaultValue={address[0]} />
              </label>
              <label htmlFor="">
                Pais
                <input type="text" name="country" defaultValue={address[2]} />
              </label>

              <label htmlFor="">
                Ciudad
                <input type="text" name="city" defaultValue={address[1]} />
              </label>
            </div>
            <div>
              <h3>Datos de Contacto</h3>
              <label htmlFor="">
                Nombres
                <input
                  type="text"
                  name="contactName"
                  defaultValue={provider.contactName}
                />
              </label>
              <label htmlFor="">
                Correo Electrónico
                <input
                  type="email"
                  name="contactEmail"
                  defaultValue={provider.contactEmail}
                />
              </label>
              <label htmlFor="">
                Teléfono
                <input
                  type="text"
                  name="contactPhone"
                  defaultValue={provider.contactPhone}
                />
              </label>
            </div>
          </div>
          <div>
            <h3>Insumos</h3>
            <textarea
              type="text"
              name="supplies"
              defaultValue={provider.supplies}
            />
          </div>
          <button type="submit">
            {' '}
            <FaSave /> Guardar Proveedor
          </button>
          <button
            onClick={() => {
              history.push('/produccion/proveedor');
            }}
          >
            Cancel
          </button>
        </form>
      </Container>
    </>
  );
};

export default ModificarProveedor;
