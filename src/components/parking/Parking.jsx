import { Car, CheckCircle, AlertTriangle, Wifi, Gauge } from "lucide-react";

const Parking = () => {
  const parkingSpaces = Array.from({ length: 43 }, (_, i) => {
    const id = i + 1;
    const statuses = ["ocupado", "disponible", "obstruido"];
    return {
      id,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });

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

  const renderSpace = (space) => (
    <div
      key={space.id}
      className={`
        aspect-square w-11 border-2 rounded-lg flex flex-col items-center justify-center 
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
  );

  const total = parkingSpaces.length;
  const occupied = parkingSpaces.filter((s) => s.status === "ocupado").length;
  const occupancyPercentage = Math.round((occupied / total) * 100);

  return (
    <div className="container xl:mx-auto sm:mx-10 max-w-6xl w-full bg-white rounded-2xl shadow p-6">
      {/* ENCABEZADO */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-1">
            Parqueo Estudiantil UTEC
            <span className="text-sm font-normal text-gray-500">
              ({total} espacios)
            </span>
          </h2>
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center gap-1 ${
                occupancyPercentage < 75 ? "text-cyan-600" : "text-red-600"
              }`}
            >
              <Gauge className="h-4 w-4" />
              <span className="text-sm font-medium">
                {occupancyPercentage}% ocupado
              </span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <Wifi className="h-4 w-4 animate-pulse" />
              <span className="text-xs font-medium">En vivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* DISTRIBUCIÓN */}
      <div className="flex gap-6">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-1">
          {parkingSpaces.slice(0, 10).map(renderSpace)}
        </div>

        {/* Centro */}
        <div className="flex flex-col justify-between">
          {/* Contenedor de fila superior + columnas derechas */}
          <div className="flex flex-row gap-1">
            {/* Fila superior */}
            <div className="block mt-48 ml-25">
              <div className="flex gap-1">
                {parkingSpaces.slice(10, 20).map(renderSpace)}
              </div>
            </div>

            {/* Columnas derechas */}
            <div className="flex gap-4">
              {/* Columna fucsia */}
              <div className="flex flex-col gap-1 mr-26">
                {parkingSpaces.slice(20, 25).map(renderSpace)}
              </div>

              {/* Segunda columna derecha */}
              <div className="flex flex-col gap-1">
                {parkingSpaces.slice(25, 30).map(renderSpace)}
              </div>
            </div>
          </div>

          {/* Fila inferior */}
          <div className="flex gap-1 mt-12">
            {parkingSpaces.slice(30, 43).map(renderSpace)}
          </div>
        </div>
      </div>

      {/* LEYENDA */}
      {/* <div className="mt-8 pt-4 border-t border-gray-200 flex justify-center">
        <div className="flex gap-8 flex-wrap justify-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 border border-red-300 rounded-lg">
            <Car className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-900">Ocupado</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-lg">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-900">
              Disponible
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900">
              Obstruido
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Parking;
