import free from "../../assets/img/cars/free.webp";
import occupied from "../../assets/img/cars/ocuppied.webp";
import outOfService from "../../assets/img/cars/out-of-service.webp";

const Parking = () => {
  // Configuración de los espacios de estacionamiento
  const parkingSpaces = [
    // Columna izquierda (vertical)
    { id: 1, status: "free" },
    { id: 2, status: "occupied" },
    { id: 3, status: "free" },
    { id: 4, status: "free" },
    { id: 5, status: "occupied" },
    { id: 6, status: "out of service" },

    // Fila superior (horizontal)
    { id: 7, status: "free" },
    { id: 8, status: "free" },
    { id: 9, status: "occupied" },
    { id: 10, status: "occupied" },
    { id: 11, status: "free" },
    { id: 12, status: "free" },
    { id: 13, status: "occupied" },
    { id: 14, status: "free" },
    { id: 15, status: "occupied" },
    { id: 16, status: "free" },
    { id: 17, status: "occupied" },
    { id: 18, status: "free" },

    // Fila inferior (horizontal)
    { id: 19, status: "free" },
    { id: 20, status: "occupied" },
    { id: 21, status: "free" },
    { id: 22, status: "occupied" },
    { id: 23, status: "free" },
    { id: 24, status: "occupied" },
    { id: 25, status: "free" },
    { id: 26, status: "occupied" },
    { id: 27, status: "free" },
    { id: 28, status: "occupied" },
    { id: 29, status: "free" },
    { id: 30, status: "occupied" },
  ];

  const getStatusImage = (status) => {
    switch (status) {
      case "free":
        return free;
      case "occupied":
        return occupied;
      case "out of service":
        return outOfService;
      default:
        return free;
    }
  };

  return (
    <div className="container xl:mx-auto sm:mx-10 p-6 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-black">
        PARQUEO ESTUDIANTIL
      </h1>

      <div className="flex">
        {/* Columna izquierda */}
        <div className="flex flex-col mr-4">
          {parkingSpaces.slice(0, 6).map((space) => (
            <div key={space.id}>
              <div className="flex">
                <div className="bg-yellow-500 p-1 my-5"></div>
                <img
                  key={space.id}
                  src={getStatusImage(space.status)}
                  className="w-20 h-auto object-contain rotate-90"
                  alt={`Espacio ${space.status}`}
                  title={`Espacio ${space.status}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-32 h-auto bg-gray-500 rounded" />

        {/* Área central */}
        <div className="flex flex-col items-center">
          {/* Fila superior */}
          <div className="flex">
            {parkingSpaces.slice(6, 18).map((space) => (
              <div key={space.id}>
                <div className="block">
                  <div className="bg-yellow-500 p-1 mx-5"></div>
                  <img
                    src={getStatusImage(space.status)}
                    className="w-20 h-auto object-contain rotate-180"
                    alt={`Espacio ${space.status}`}
                    title={`Espacio ${space.status}`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Calle (espacio gris) */}
          <div className="w-full h-48 bg-gray-500 my-10 rounded-tr rounded-br" />

          {/* Fila inferior */}
          <div className="flex">
            {parkingSpaces.slice(18).map((space) => (
              <div key={space.id}>
                <div className="block">
                  <img
                    src={getStatusImage(space.status)}
                    className="w-20 h-auto object-contain"
                    alt={`Espacio ${space.status}`}
                    title={`Espacio ${space.status}`}
                  />
                  <div className="bg-yellow-500 p-1 mx-5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parking;
