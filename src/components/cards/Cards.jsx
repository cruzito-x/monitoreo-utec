import { useEffect, useState, useRef } from "react";
import { Car, CheckCircle, AlertTriangle } from "lucide-react";
import Swal from "sweetalert2";
import Loading from "../loading/Loading";

const Cards = () => {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const getParkingStatus = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/summary/`);
      const data = await response.json();

      if (response.status === 200) setStatus(data);
      else
        Swal.fire({
          icon: "warning",
          text: "Error al obtener la distribución del parqueo.",
          confirmButtonColor: "var(--primary-color)",
          confirmButtonText: "Aceptar",
        });
    } catch (error) {
      navigator.serviceWorker.controller.postMessage({
        title: "Parqueo UTEC",
        options: {
          body: "Ha ocurrido un error inesperado, por favor intente de nuevo.",
          icon: "/logo.png",
          badge: "/logo.png",
          vibrate: [100, 50, 100],
        },
      });
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    getParkingStatus(true); // Initial load with loading indicator

    const connectWebSocket = () => {
      socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/parking/");

      socketRef.current.onopen = () => {
        console.log("WebSocket conectado");
        getParkingStatus(false); // Reload data on connection open without showing loading
      };

      socketRef.current.onmessage = () => {
        getParkingStatus(false); // Reload data on every message
      };

      socketRef.current.onerror = () => {};

      socketRef.current.onclose = () => {
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();

    return () => {
      if (reconnectTimeoutRef.current)
        clearTimeout(reconnectTimeoutRef.current);
      if (socketRef.current) socketRef.current.close();
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
    <div className="bg-white rounded-2xl shadow p-6 lg:mb-6 w-full">
      <h2 className="lg:text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Estado del Parqueo
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`border rounded-xl p-6 ${card.bgColor} ${card.borderColor} transition-all duration-200 cursor-pointer hover:scale-105`}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className={`font-semibold ${card.textColor}`}>
                  {card.label}
                </h2>
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
      )}
    </div>
  );
};

export default Cards;
