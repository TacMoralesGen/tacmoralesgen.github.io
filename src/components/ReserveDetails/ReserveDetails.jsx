/* eslint-disable react/prop-types */
import { useState } from 'react';
import Guests from '../Guests/Guests';
import TinajaSelector from '../TinajaSelector/TinajaSelector';
import { numberWithDot } from '../../scripts/utils';

const ReserveDetails = ({ 
  keyValue,
  precioBase, 
  precioTinaja, 
  nombreHabitacion, 
  capacidad,
  detalles = [],
  reservationCabin,
  reservationRange,
  manageFechasTinajas,
  manageGuests
}) => {
  console.log("key o cabinNumber al renderizar reserveDetails: ", keyValue);
  // const [subtotal, setSubtotal] = useState(precioBase); // Subtotal inicial
  // const [serviciosAdicionales, setServiciosAdicionales] = useState(servicios); // Servicios adicionales
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar el desplegable

  // Función para actualizar el subtotal cuando se seleccionan servicios adicionales
  // const manejarCambioSubtotal = (costoAdicional) => {
  //   const nuevoSubtotal = precioBase + costoAdicional;
  //   setSubtotal(nuevoSubtotal); 
  //   actualizarSubtotal(nuevoSubtotal); // Se envía el nuevo subtotal a Checkout.jsx
  // };

  // Función para alternar el estado del desplegable
  const toggleDetalles = () => setIsOpen(!isOpen);

  return (
    <div className="col mb-3">
      <div className="card">
        <div className="card-body text-start">
          <h3 className="card-title fw-normal">Detalle de la reserva - {nombreHabitacion}</h3>

          {/* Primer bloque de detalles de la reserva */}
          <p className="card-text">
            <div className="container text-start">
              <div className="row">
                <div className="col-6">
                  <span className="fw-bold">{nombreHabitacion} </span> ({capacidad} Personas)
                </div>
                <div className="col-6 text-end">
                  <span 
                    className="btn" 
                    onClick={toggleDetalles} 
                    aria-expanded={isOpen} 
                    aria-controls="detallesCabaña"
                    style={{ cursor: 'pointer' }}
                  >
                    Ver detalles de cabaña
                  </span>
                  <strong className="mt-2 fw-bold" id="precioBase">
                    CLP${numberWithDot(precioBase)}
                  </strong>
                </div>
              </div>

              {/* Detalles de la cabaña (desplegable) */}
              <div className={`collapse mt-3 ${isOpen ? 'show' : ''}`} id="detallesCabaña">
                <ul className="list-unstyled">
                  {detalles.map((detalle, index) => (
                    <li key={index}>{detalle}</li>
                  ))}
                </ul>
              </div>
            </div>


            {/* Nombre completo Huésped Representante */}
            <div className="col-8">
              <label htmlFor="clienteNombre" className="form-label">
                <strong>Nombre completo Huésped Representante :</strong>
              </label>
              <input
                type="text"
                id="clienteNombre"
                name="clienteNombre"
                className="form-control form-control-sm d-inline"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>
          </p>

          {/* Aquí incluimos el componente de selección de adultos y niños */}

          <div className="row">
            <Guests 
              cabinNumber={keyValue}
              tipoCabana={nombreHabitacion}
              manageGuests={manageGuests}
            />
          </div>

          {/* Integración del componente TinajaSelector */}
          <div className="mt-3">
            <TinajaSelector 
              cabinNumber={keyValue}
              precioTinaja={precioTinaja} 
              manageFechasTinajas={manageFechasTinajas}
              fechas={reservationRange}
              fechasSeleccionadas={reservationCabin.datesHotTub}
            />
          </div>

          {/* Subtotal Cabaña */}
          <div className="d-flex justify-content-between mt-3">
            <span className="h4">Sub Total Cabaña:</span>
            <span className="h4" id="subTotal">CLP${numberWithDot(reservationCabin.priceHotTub + reservationCabin.priceCabin)}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReserveDetails;
