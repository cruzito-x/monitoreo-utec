// src/components/Stats.jsx
import { Crown, Star, Award, Medal, Circle } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";

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
      } else {
        console.error("Error fetching daily summary:", data);
      }
    } catch (error) {
      console.error("Error fetching daily summary:", error);
    }
  };

  const fetchPopularSpaces = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/top-used/${lotId}/`);
      const data = await res.json();
      setPopularSpaces(data);
    } catch (error) {
      console.error("Error fetching popular spaces:", error);
    }
  };

  useEffect(() => {
    fetchDailySummary();
    fetchPopularSpaces();
    setLoading(false);

    const socket = new WebSocket("ws://127.0.0.1:8000/ws/parking/");
    socket.onopen = () => console.log("Stats conectado al WebSocket");
    socket.onmessage = () => {
      fetchDailySummary();
      fetchPopularSpaces();
    };
    socket.onerror = (error) =>
      console.error("WebSocket error en Stats:", error);
    socket.onclose = () => console.log("Stats WebSocket cerrado");

    return () => socket.close();
  }, [lotId]);

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

  const formatDuration = (seconds) => {
    const duration = moment.duration(seconds, "seconds");
    if (duration.asHours() >= 1) {
      return `${Math.floor(duration.asHours())}h ${duration.minutes()}m`;
    } else if (duration.asMinutes() >= 1) {
      return `${duration.minutes()}m ${duration.seconds()}s`;
    } else {
      return `${duration.seconds()}s`;
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full mb-3">
      {/* Card 1: Top 5 Espacios */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Top 5 Espacios Más Usados
        </h2>

        {popularSpaces.length > 0 ? (
          <div className="mt-4 space-y-4">
            {popularSpaces.map((space, index) => (
              <div key={space.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  {getIcon(index)}
                  <h3 className="font-light text-sm text-gray-900">
                    {space.name}
                  </h3>
                </div>
                <div className="text-right text-xs text-gray-600">
                  <p>Usado {space.usage} veces</p>
                  <p>Tiempo Promedio: {formatDuration(space.avgUsedTime)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 mt-4 mb-2 text-sm flex justify-center">
            No hay datos disponibles
          </div>
        )}
      </div>

      {/* Card 2: Resumen del día */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900">Resumen del día</h2>

        {summary ? (
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
        ) : (
          <div className="text-gray-500 mt-4 mb-2 text-sm flex justify-center">
            No hay datos disponibles
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
