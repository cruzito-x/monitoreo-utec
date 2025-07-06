import { useState } from "react";
import { Crown, Star, Award, Medal, Circle } from "lucide-react";

const Stats = () => {
  const [range, setRange] = useState("week");

  const popularSpaces = [
    { id: 1, name: "Space 31", usage: 10, avgTime: "32 min" },
    { id: 2, name: "Space 29", usage: 8, avgTime: "28 min" },
    { id: 3, name: "Space 15", usage: 7, avgTime: "26 min" },
    { id: 4, name: "Space 42", usage: 6, avgTime: "24 min" },
    { id: 5, name: "Space 18", usage: 5, avgTime: "20 min" },
  ];

  const summary = {
    entries: 132,
    exits: 121,
    avgStay: "2h 51min",
    currentParked: 11,
  };

  const balance = summary.entries - summary.exits;
  const balanceColor = balance >= 0 ? "text-green-600" : "text-red-600";
  const balanceBarColor = balance >= 0 ? "bg-green-500" : "bg-red-500";
  const balanceLabel = `${balance >= 0 ? "+" : ""}${balance} autos`;
  const balancePercentage =
    summary.entries > 0
      ? Math.min((Math.abs(balance) / summary.entries) * 100, 100)
      : 0;

  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <Crown className="w-5 h-5 text-yellow-500 mr-2" />;
      case 1:
        return <Star className="w-5 h-5 text-gray-500 mr-2" />;
      case 2:
        return <Award className="w-5 h-5 text-orange-400 mr-2" />;
      case 3:
        return <Medal className="w-5 h-5 text-indigo-400 mr-2" />;
      case 4:
        return <Circle className="w-5 h-5 text-pink-400 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto mb-12 bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Estadísticas del Parqueo
      </h2>

      <div className="max-w-3xl flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-900">
            Top 5 Espacios Más Usados
          </h2>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="text-sm border border-gray-300 cursor-pointer rounded-md px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="quarter">Trimestre</option>
            <option value="semester">Semestre</option>
            <option value="year">Año</option>
          </select>
        </div>

        <div className="mt-4 space-y-4">
          {popularSpaces.map((space, index) => (
            <div key={space.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {getIcon(index)}
                  <h3 className="font-light text-sm text-gray-900">
                    {space.name}
                  </h3>
                </div>
                <div className="text-right text-xs text-gray-600">
                  <p>Usado {space.usage} veces</p>
                  <p>Prom. {space.avgTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-b py-1.5 border-gray-500"></div>

        <h2 className="mt-5 text-sm font-semibold text-gray-900">
          Resumen del día
        </h2>

        <div className="p-6 space-y-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Ingresos:</span>
            <span className="text-green-600 font-semibold">
              {summary.entries} autos
            </span>
          </div>

          <div className="flex justify-between">
            <span>Salidas:</span>
            <span className="text-red-600 font-semibold">
              {summary.exits} autos
            </span>
          </div>

          <div className="flex justify-between">
            <span>Estancia promedio:</span>
            <span className="text-purple-600 font-semibold">
              {summary.avgStay}
            </span>
          </div>

          <hr className="my-2 border-gray-200" />

          <div className="flex justify-between">
            <span>Actualmente estacionados:</span>
            <span className="text-blue-600 font-semibold">
              {summary.currentParked} autos
            </span>
          </div>

          <div>
            <span className="text-gray-500 text-xs">Balance del día</span>
            <div className="flex items-center mt-1 gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`${balanceBarColor} h-full`}
                  style={{ width: `${balancePercentage}%` }}
                ></div>
              </div>
              <span className={`text-xs font-medium ${balanceColor}`}>
                {balanceLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
