import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Car,
  CheckCircle,
  AlertTriangle,
  Wifi,
  Gauge,
  WifiOff,
} from "lucide-react";
import Loading from "../loading/Loading";

const Parking = ({ lotId = 1 }) => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transmitionStatus, setTransmitionStatus] = useState(true);

  useEffect(() => {
    const getParkingDistribution = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/parking-lot/${lotId}/spaces/`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
        const data = await response.json();

        if (response.status === 200) {
          setSpaces(data);
          setTransmitionStatus(true);
        } else if (response.status === 404 || response.status === 500) {
          Swal.fire({
            icon: "warning",
            text: "Ha ocurrido un error interno, por favor cierre su sesión y vuelva a intentarlo.",
            confirmButtonColor: "var(--primary-color)",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        setTransmitionStatus(false);
        console.error("Error al obtener distribución del parqueo:", error);
      } finally {
        setLoading(false);
      }
    };

    getParkingDistribution();

    // WebSocket connection to receive live updates
    const socket = new WebSocket("ws://localhost:8000/ws/parking/");

    socket.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      const updatedSpaces = Array.isArray(incoming) ? incoming : [incoming];

      setSpaces((prevSpaces) => {
        const updated = [...prevSpaces];
        updatedSpaces.forEach((incoming) => {
          const index = updated.findIndex(
            (status) => status.id === incoming.id
          );
          if (index !== -1) {
            updated[index] = incoming;
          }
        });
        return updated;
      });

      // Show notification if permission is granted and a service worker is available
      if (
        Notification.permission === "granted" &&
        navigator.serviceWorker.controller
      ) {
        const space = updatedSpaces[0];
        const title = `Espacio ${space.id < 10 ? "0" + space.id : space.id}`;
        const statusText =
          space.status_id === 1
            ? "Ocupado"
            : space.status_id === 2
            ? "Disponible"
            : "Obstruido";

        navigator.serviceWorker.controller.postMessage({
          title: "Parqueo UTEC",
          options: {
            body: `${title} ahora está ${statusText.toLowerCase()}.`,
            icon: "/logo.png",
            badge: "/logo.png",
            vibrate: [100, 50, 100],
          },
        });
      }

      setTransmitionStatus(true);
    };

    socket.onerror = () => {
      setTransmitionStatus(false);
    };

    socket.onclose = () => {
      setTransmitionStatus(false);
    };

    // Clear WebSocket connection on component unmount
    return () => socket.close();
  }, [lotId]);

  const getStatusIcon = (status_id) => {
    switch (status_id) {
      case 1:
        return <Car className="h-7 w-7 text-red-600" />;
      case 2:
        return <CheckCircle className="h-7 w-7 text-emerald-600" />;
      case 3:
        return <AlertTriangle className="h-7 w-7 text-amber-600" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status_id) => {
    switch (status_id) {
      case 1:
        return "bg-rose-100 border-rose-300 hover:bg-rose-200";
      case 2:
        return "bg-emerald-100 border-emerald-300 hover:bg-emerald-200";
      case 3:
        return "bg-amber-100 border-amber-300 hover:bg-amber-200";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  const renderSpace = (space) => (
    <div
      key={space.id}
      className={`absolute aspect-square rounded-lg border-2 flex flex-col items-center justify-center
        transition-all duration-200 cursor-pointer hover:scale-105 text-lg
        ${getStatusStyle(space.status_id)}`}
      style={{
        top: `${space.y}px`,
        left: `${space.x}px`,
        width: `${space.width}px`,
        height: `${space.height}px`,
      }}
      title={`Espacio ${space.id < 10 ? "0" + space.id : space.id} - ${
        space.status_id === 1
          ? "Ocupado"
          : space.status_id === 2
          ? "Disponible"
          : "Obstruido"
      }`}
    >
      {getStatusIcon(space.status_id)}
      <span
        className={`text-xs mt-0.5 ${
          space.status_id === 1
            ? "text-rose-900"
            : space.status_id === 2
            ? "text-emerald-900"
            : "text-amber-900"
        }`}
      >
        {space.id < 10 ? "0" + space.id : space.id}
      </span>
    </div>
  );

  const total = spaces.length;
  const occupied =
    total > 0 ? spaces.filter((s) => s.status_id !== 2).length : 0;
  const occupancyPercentage = total ? Math.round((occupied / total) * 100) : 0;

  return (
    <div className="container mx-auto w-full max-w-full bg-white rounded-2xl shadow pb-6 mb-6 px-4">
      {/* ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 ps-5 pe-6 gap-3">
        {/* TÍTULO */}
        <h2 className="lg:text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
          Parqueo Estudiantil UTEC
          <span className="text-sm font-normal text-gray-500">
            ({total > 0 ? total : 0} espacios)
          </span>
        </h2>

        {/* Indicadores */}
        <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4">
          {/* % DE OCUPACIÓN */}
          <div
            className={`flex items-center gap-1 ${
              occupancyPercentage < 75 ? "text-cyan-600" : "text-red-600"
            }`}
          >
            <Gauge className="h-4 w-4" />
            <span className="text-sm font-medium">
              {occupancyPercentage > 0 ? occupancyPercentage : 0}% ocupado
            </span>
          </div>

          {/* ESTADO DE TRANSMISIÓN */}
          <div className="flex items-center gap-1">
            {transmitionStatus ? (
              <Wifi className="h-4 w-4 animate-pulse text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 animate-pulse text-red-600" />
            )}
            <span className="text-xs font-medium">
              {transmitionStatus ? (
                <span className="text-green-600"> En Vivo </span>
              ) : (
                <span className="text-red-600"> Sin conexión </span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* DISTRIBUCIÓN DINÁMICA */}
      <div className="relative w-full max-h-[59vh] h-[450px] sm:h-[630px] rounded-lg overflow-auto">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <Loading />
          </div>
        ) : total > 0 ? (
          // Wrapper con tamaño dinámico
          <div
            className="relative"
            style={{
              width: Math.max(...spaces.map((s) => s.x + s.width), 0) + "px",
              height: Math.max(...spaces.map((s) => s.y + s.height), 0) + "px",
            }}
          >
            {spaces.map(renderSpace)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Parking;
