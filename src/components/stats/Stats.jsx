import { Crown, Star, Award, Medal, Circle } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import Loading from "../loading/Loading";

const Stats = ({ lotId = 1 }) => {
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [popularSpaces, setPopularSpaces] = useState([]);
  const [summary, setSummary] = useState(null);

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const getDailySummary = async () => {
    setLoadingSummary(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/daily-summary/${lotId}`
      );

      let data = await response.json();

      if (response.status === 200) {
        setSummary(data);
      }

      console.log("data => ", data);
    } catch (error) {
    } finally {
      setLoadingSummary(false);
    }
  };

  const getTopSpaces = async () => {
    setLoadingPopular(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/top-used/${lotId}/`
      );

      let data = await response.json();
      setPopularSpaces(data);
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
      setLoadingPopular(false);
    }
  };

  const getSumamryData = async () => {
    await getDailySummary();
    await getTopSpaces();
  };

  useEffect(() => {
    getSumamryData();

    const connectWebSocket = () => {
      socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/parking/");

      socketRef.current.onopen = () => {
        getSumamryData(); // Reload data on connection open
      };

      socketRef.current.onmessage = () => {
        getSumamryData(); // Reload data on every message
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
    if (duration.asHours() >= 1)
      return `${Math.floor(duration.asHours())}h ${duration.minutes()}m`;
    if (duration.asMinutes() >= 1)
      return `${duration.minutes()}m ${duration.seconds()}s`;
    return `${duration.seconds()}s`;
  };

  return (
    <div className="flex flex-col gap-4 w-full mb-3">
      {/* Top 5 spaces */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="lg:text-lg sm:text-xl font-semibold text-gray-800">
          Top 5 Espacios Más Usados <br />
          <span className="text-xs text-gray-500 font-normal">
            Hoy: {moment().format("DD/MM/YYYY")}
          </span>
        </h2>

        {loadingPopular ? (
          <div className="mt-2 flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : popularSpaces.length > 0 ? (
          <div className="mt-2 space-y-3">
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

      {/* Daily Summary */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="lg:text-lg sm:text-xl font-semibold text-gray-900">
          Resumen del día
          <br />
          <span className="text-xs text-gray-500 font-normal">
            Hoy: {moment().format("DD/MM/YYYY")}
          </span>
        </h2>

        {loadingSummary ? (
          <div className="mt-2 flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : summary && !Array.isArray(summary) ? (
          <div className="mt-2 pb-6 space-y-4 text-sm text-gray-700">
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
