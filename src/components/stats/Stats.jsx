import { Crown, Star, Award, Medal, Circle } from "lucide-react";
import { useEffect, useState } from "react";

const Stats = ({ lotId = 1 }) => {
  const [loading, setLoading] = useState(true);
  const [popularSpaces, setPopularSpaces] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchDailySummary = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/daily-summary/${lotId}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setSummary(data);
        console.log("Popular spaces fetched successfully:", data);
      } else {
        console.error("Error fetching popular spaces:", data);
      }
    } catch (error) {
      console.error("Error fetching popular spaces:", error);
    }
  };

  const fetchPopularSpaces = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/top-used/${lotId}/`);
    const data = await res.json();
    setPopularSpaces(data);
  };

  useEffect(() => {
    fetchDailySummary();
    fetchPopularSpaces();
    setLoading(false);
  }, []);

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

        {summary && (
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
        )}
      </div>
    </div>
  );
};

export default Stats;
