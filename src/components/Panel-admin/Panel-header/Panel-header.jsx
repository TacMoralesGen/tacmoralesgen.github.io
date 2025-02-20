/* eslint-disable react/prop-types */
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

const PanelHeader = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  useEffect(() => {
    const today = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(today.getMonth() + 2);

    setStartDate(today);
    setEndDate(twoMonthsLater);
  }, [setStartDate, setEndDate]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilter("all");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow container-fluid w-100 mb-3">
      <h1 className="navbar-brand">Búsqueda Reservas</h1>
      <div className="d-flex ms-auto gap-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "200px", height: "40px", fontSize: "18px" }}
        />

        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "200px", height: "40px", fontSize: "18px" }}
        >
          <option value="all">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control"
          placeholderText="Fecha Inicio"
          locale={es}
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="form-control"
          placeholderText="Fecha Fin"
          locale={es}
        />

        <button className="btn btn-primary" onClick={resetFilters}>
          Limpiar
        </button>
      </div>
    </nav>
  );
};

export default PanelHeader;
