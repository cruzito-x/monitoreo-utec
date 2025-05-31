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
    <div className="space-y-12">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`w-52 text-white text-center rounded-xl shadow-lg cursor-pointer ${card.bgColor}`}
        >
          <div className="p-6">
            <h1 className="text-3xl font-black mb-2">{card.number}</h1>
          </div>
          <div className="bg-slate-50 rounded-bl-xl rounded-br-xl w-full">
            <div className="px-6 py-3">
              <p className="text-lg text-black font-semibold">{card.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
