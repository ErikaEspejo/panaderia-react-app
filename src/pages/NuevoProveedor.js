import React, { useState } from 'react';
import { IoIosCreate } from 'react-icons/io';
import { FaSave } from 'react-icons/fa';
import API from '../api';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';
import './styles/proveedores.css';

import Headers from '../components/Headers';
import Container from '../containers/Container';

const NuevoProveedor = () => {
  const history = useHistory();
  const [error, setError] = useState('');

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
        await API.createProvider({
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
        setError(
          'El proveedor no ha podido ser creado o se ha creado incorrectamente'
        );
      }
    } else {
      setError('Porfavor ingrese los datos solicitados');
    }
  }

  return (
    <>
      <Headers title="Nuevo Proveedor" icon={<IoIosCreate />} />
      {error && <Alert severity="error" message={error} />}
      <br />
      <Container>
        <form onSubmit={onSubmit}>
          <div className="form-data">
            <div className="provider-data">
              <h3>Datos de la empresa</h3>
              <label htmlFor="">
                NIT
                <input type="text" name="nit" />
              </label>
              <label htmlFor="">
                Nombre
                <input type="text" name="providerName" />
              </label>
              <label htmlFor="">
                Teléfono
                <input type="text" name="providerPhone" />
              </label>
              <label htmlFor="">
                Sitio Web
                <input type="text" name="providerWeb" />
              </label>
              <label htmlFor="">
                Dirección
                <input type="text" name="address" />
              </label>
              <label htmlFor="">
                Pais
                <input type="text" name="country" />
              </label>

              <label htmlFor="">
                Ciudad
                <input type="text" name="city" />
              </label>
            </div>
            <div className="contact-data">
              <h3>Datos de Contacto</h3>
              <label htmlFor="">
                Nombres
                <input type="text" name="contactName" />
              </label>
              <label htmlFor="">
                Correo Electrónico
                <input type="email" name="contactEmail" />
              </label>
              <label htmlFor="">
                Teléfono
                <input type="text" name="contactPhone" />
              </label>
            </div>
          </div>
          <div className="form-supplies">
            <h3>Insumos</h3>
            <textarea type="text" name="supplies" />
          </div>
          <div className="buttons">
            <button type="submit" className="action-button">
              {' '}
              <FaSave /> Guardar Proveedor
            </button>
            <button
              className="action-button"
              onClick={() => {
                history.push('/produccion/proveedor');
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default NuevoProveedor;
