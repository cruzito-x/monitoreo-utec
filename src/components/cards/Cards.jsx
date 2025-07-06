import { Car, CheckCircle, AlertTriangle } from "lucide-react";

const Cards = () => {
  const cardData = [
    {
      number: 15,
      label: "Ocupados",
      description: "Espacios en uso",
      icon: <Car className="text-red-600" size={20} />,
      borderColor: "border-red-200",
      textColor: "text-red-800",
      bgColor: "bg-red-50",
    },
    {
      number: 19,
      label: "Disponibles",
      description: "Espacios libres",
      icon: <CheckCircle className="text-emerald-600" size={20} />,
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800",
      bgColor: "bg-emerald-50",
    },
    {
      number: 6,
      label: "Obstruidos",
      description: "Requiere atención",
      icon: <AlertTriangle className="text-amber-600" size={20} />,
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto mb-12 bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        {" "}
        Estado del Parqueo{" "}
      </h2>
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`border rounded-xl p-6 ${card.bgColor} ${card.borderColor} transition-all duration-200 cursor-pointer hover:scale-110`}
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
