import { Crown, Star, Award, Medal, Circle } from "lucide-react";

const Stats = () => {
  const popularSpaces = [
    { id: 1, name: "Espacio 07", usage: 10, avgTime: "32 min" },
    { id: 2, name: "Espacio 29", usage: 8, avgTime: "28 min" },
    { id: 3, name: "Espacio 15", usage: 7, avgTime: "26 min" },
    { id: 4, name: "Espacio 42", usage: 6, avgTime: "24 min" },
    { id: 5, name: "Espacio 18", usage: 5, avgTime: "20 min" },
  ];

  const summary = {
    entries: 132,
    exits: 121,
    avgStay: "2h 51min",
    currentParked: 15,
  };

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
        return <Circle className="w-5 h-5 text-rose-400 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Estadísticas del Parqueo
      </h2>

      <div className="max-w-3xl flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-900">
            Top 5 Espacios Más Usados
          </h2>
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
                  <p>Tiempo Promedio: {space.avgTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-b py-1.5 border-gray-500"></div>

        <h2 className="mt-5 text-sm font-semibold text-gray-900">
          Resumen del día
        </h2>

        <div className="pt-6 pb-6 space-y-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-900">Ingresos:</span>
            <span className="text-blue-500 font-semibold">
              {summary.entries} autos
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-900">Salidas:</span>
            <span className="text-red-500 font-semibold">
              {summary.exits} autos
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-900">Estancia promedio:</span>
            <span className="text-amber-500 font-semibold">
              {summary.avgStay}
            </span>
          </div>

          <hr className="my-2 border-gray-200" />

          <div className="flex justify-between">
            <span className="text-gray-900">Estacionados actualmente:</span>
            <span className="text-rose-900 font-semibold">
              {summary.currentParked} autos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
