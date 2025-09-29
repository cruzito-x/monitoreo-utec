import { useEffect, useState } from "react";
import { Car, CheckCircle, AlertTriangle } from "lucide-react";
import Swal from "sweetalert2";

const Cards = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const getParkingStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/summary/`);
        const data = await response.json();

        if (response.status === 200) {
          setStatus(data);
        } else {
          Swal.fire({
            icon: "warning",
            text: "Error al obtener la distribución del parqueo.",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        console.error("Error al obtener estado del parqueo:", error);
      }
    };

    getParkingStatus();

    // WebSocket para actualizaciones en tiempo real
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/parking/");

    socket.onopen = () => {
      console.log("Cards conectado al WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Evento recibido:", data);

      // Recalcular todo el resumen desde la API
      getParkingStatus();
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket cerrado");
    };

    return () => {
      socket.close();
    };
  }, []);

  const cardData = [
    {
      number: status.find((s) => s.status === "ocupado")?.count || 0,
      label: "Ocupados",
      description: "Espacios en uso",
      icon: <Car className="text-rose-600" size={20} />,
      borderColor: "border-rose-200",
      textColor: "text-rose-800",
      bgColor: "bg-rose-50",
    },
    {
      number: status.find((s) => s.status === "disponible")?.count || 0,
      label: "Disponibles",
      description: "Espacios libres",
      icon: <CheckCircle className="text-emerald-600" size={20} />,
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800",
      bgColor: "bg-emerald-50",
    },
    {
      number: status.find((s) => s.status === "obstruido")?.count || 0,
      label: "Obstruidos",
      description: "Requiere atención",
      icon: <AlertTriangle className="text-amber-600" size={20} />,
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 w-full bg-white rounded-2xl shadow p-7 lg:mb-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Estado del Parqueo
      </h2>
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`border rounded-xl p-6 ${card.bgColor} ${card.borderColor} transition-all duration-200 cursor-pointer hover:scale-105`}
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className={`font-semibold ${card.textColor}`}>{card.label}</h2>
            {card.icon}
          </div>
          <div className={`text-3xl font-bold mb-3 ${card.textColor}`}>
            {card.number}
          </div>
          <div className={`text-sm font-medium ${card.textColor}`}>
            {card.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
