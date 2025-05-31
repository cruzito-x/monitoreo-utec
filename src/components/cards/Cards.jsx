const Cards = () => {
  const cardData = [
    {
      number: 16,
      label: "Disponibles",
      bgColor: "bg-secondary",
    },
    {
      number: 13,
      label: "Ocupados",
      bgColor: "bg-primary",
    },
    {
      number: 2,
      label: "Fuera de Servicio",
      bgColor: "bg-thirdary",
    },
  ];

  return (
    <div className="lg:space-y-12 sm:w-full lg:w-3/12 flex lg:flex-col sm:flex-row lg:space-x-0 md:space-x-12 sm:space-x-12 items-center sm:justify-center md:my-5">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`xl:w-52 lg:w-44 md:w-44 h-auto md:h-full text-white text-center rounded-xl shadow-lg cursor-pointer ${card.bgColor}`}
        >
          <div className="p-6">
            <h1 className="xl:text-3xl lg:text-2xl sm:text-sm font-black mb-2">
              {card.number}
            </h1>
          </div>
          <div className="bg-slate-50 rounded-bl-xl rounded-br-xl w-full">
            <div className="px-6 py-3">
              <p className="xl:text-lg lg:text-sm sm:text-sm text-black font-semibold">
                {card.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
