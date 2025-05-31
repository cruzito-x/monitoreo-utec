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
      label: "Bloqueados",
      bgColor: "bg-thirdary",
    },
  ];

  return (
    <div className="flex lg:flex-col md:flex-row sm:flex-col items-center justify-center gap-6 sm:gap-6 lg:gap-12 w-full lg:w-2/12 my-5">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`w-full max-w-xs sm:w-1/3 lg:w-full text-white rounded-xl shadow-lg cursor-pointer ${card.bgColor}`}
        >
          <div className="p-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-black mb-2">
              {card.number}
            </h1>
          </div>
          <div className="bg-slate-50 rounded-b-xl w-full">
            <div className="px-6 py-3 text-center">
              <p className="text-sm sm:text-base text-black font-semibold">
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
