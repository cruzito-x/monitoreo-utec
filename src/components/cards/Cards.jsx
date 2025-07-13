import { Car, CheckCircle, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

const Cards = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const getParkingStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/summary/`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });

        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error("Error al obtener estado del parqueo:", error);
      }
    };

    getParkingStatus();
  }, []);

  const cardData = [
    {
      number: status[0]?.count || 0,
      label: "Ocupados",
      description: "Espacios en uso",
      icon: <Car className="text-rose-600" size={20} />,
      borderColor: "border-rose-200",
      textColor: "text-rose-800",
      bgColor: "bg-rose-50",
    },
    {
      number: status[1]?.count || 0,
      label: "Disponibles",
      description: "Espacios libres",
      icon: <CheckCircle className="text-emerald-600" size={20} />,
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800",
      bgColor: "bg-emerald-50",
    },
    {
      number: status[2]?.count || 0,
      label: "Obstruidos",
      description: "Requiere atención",
      icon: <AlertTriangle className="text-amber-600" size={20} />,
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto mb-12 bg-white rounded-2xl shadow p-7">
      <h2 className="text-lg font-semibold text-gray-900">
        {" "}
        Estado del Parqueo{" "}
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
