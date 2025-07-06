import { Car, CheckCircle, AlertTriangle, Wifi, Gauge } from "lucide-react";

const Parking = () => {
  const parkingSpaces = [
    // Columna izquierda
    { id: 1, status: "disponible" },
    { id: 2, status: "ocupado" },
    { id: 3, status: "disponible" },
    { id: 4, status: "disponible" },
    { id: 5, status: "ocupado" },
    { id: 6, status: "obstruido" },

    // Fila superior
    { id: 7, status: "disponible" },
    { id: 8, status: "disponible" },
    { id: 9, status: "ocupado" },
    { id: 10, status: "ocupado" },
    { id: 11, status: "disponible" },
    { id: 12, status: "disponible" },
    { id: 13, status: "ocupado" },
    { id: 14, status: "disponible" },
    { id: 15, status: "ocupado" },
    { id: 16, status: "disponible" },
    { id: 17, status: "ocupado" },
    { id: 18, status: "disponible" },

    // Fila inferior
    { id: 19, status: "disponible" },
    { id: 20, status: "ocupado" },
    { id: 21, status: "disponible" },
    { id: 22, status: "ocupado" },
    { id: 23, status: "disponible" },
    { id: 24, status: "ocupado" },
    { id: 25, status: "disponible" },
    { id: 26, status: "ocupado" },
    { id: 27, status: "disponible" },
    { id: 28, status: "ocupado" },
    { id: 29, status: "disponible" },
    { id: 30, status: "ocupado" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "ocupado":
        return <Car className="h-4 w-4 text-red-600" />;
      case "disponible":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "obstruido":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ocupado":
        return "bg-red-100 border-red-300 hover:bg-red-200";
      case "disponible":
        return "bg-emerald-100 border-emerald-300 hover:bg-emerald-200";
      case "obstruido":
        return "bg-amber-100 border-amber-300 hover:bg-amber-200";
    }
  };

  const total = parkingSpaces.length;
  const occupied = parkingSpaces.filter((s) => s.status === "ocupado").length;
  const occupancyPercentage = Math.round((occupied / total) * 100);

  return (
    <div className="container xl:mx-auto sm:mx-10 max-w-5xl w-full bg-white rounded-2xl shadow p-6">
      {/* ENCABEZADO estilo dashboard */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            Parqueo Estudiantil UTEC
            <span className="text-sm font-normal text-gray-500">
              ({total} espacios)
            </span>
          </h2>

          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                occupancyPercentage < 75 ? "text-cyan-600" : "text-red-600"
              }`}
            >
              <Gauge className="h-4 w-4" />
              <span className="text-sm font-medium">
                {occupancyPercentage}% ocupado
              </span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Wifi className="h-4 w-4 animate-pulse" />
              <span className="text-xs font-medium">En vivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO del layout */}
      <div className="flex">
        {/* Columna izquierda */}
        <div className="flex flex-col mr-4 gap-2">
          {parkingSpaces.slice(0, 6).map((space) => (
            <div
              key={space.id}
              className={`
                aspect-square w-12 border-2 rounded-lg flex flex-col items-center justify-center 
                transition-all duration-200 cursor-pointer hover:scale-105
                ${getStatusStyle(space.status)}
              `}
              title={`Espacio ${space.id < 10 ? "0" + space.id : space.id} - ${
                space.status
              }`}
            >
              {getStatusIcon(space.status)}
              <span className="text-xs font-medium mt-1">
                {space.id < 10 ? "0" + space.id : space.id}
              </span>
            </div>
          ))}
        </div>

        {/* Área central */}
        <div className="flex flex-col items-center">
          {/* Fila superior */}
          <div className="flex gap-2 mb-10">
            {parkingSpaces.slice(6, 18).map((space) => (
              <div
                key={space.id}
                className={`
                  aspect-square w-12 border-2 rounded-lg flex flex-col items-center justify-center 
                  transition-all duration-200 cursor-pointer hover:scale-105
                  ${getStatusStyle(space.status)}
                `}
                title={`Espacio ${
                  space.id < 10 ? "0" + space.id : space.id
                } - ${space.status}`}
              >
                {getStatusIcon(space.status)}
                <span className="text-xs font-medium mt-1">
                  {space.id < 10 ? "0" + space.id : space.id}
                </span>
              </div>
            ))}
          </div>

          {/* Fila inferior */}
          <div className="flex gap-2">
            {parkingSpaces.slice(18).map((space) => (
              <div
                key={space.id}
                className={`
                  aspect-square w-12 border-2 rounded-lg flex flex-col items-center justify-center 
                  transition-all duration-200 cursor-pointer hover:scale-105
                  ${getStatusStyle(space.status)}
                `}
                title={`Espacio ${
                  space.id < 10 ? "0" + space.id : space.id
                } - ${space.status}`}
              >
                {getStatusIcon(space.status)}
                <span className="text-xs font-medium mt-1">
                  {space.id < 10 ? "0" + space.id : space.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-6 mt-6 pt-4 border-t justify-center lg:justify-start">
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-red-600" />
          <span className="text-sm text-gray-700">Ocupado</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span className="text-sm text-gray-700">Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-gray-700">Obstruido</span>
        </div>
      </div>
    </div>
  );
};

export default Parking;
