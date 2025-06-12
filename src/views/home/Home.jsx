import Bottom from "../../components/bottom/Bottom";
import Cards from "../../components/cards/Cards";
import Parking from "../../components/parking/Parking";
import Top from "../../components/top/Top";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Top />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <Cards />
          <div className="flex">
            <Parking />
          </div>
        </div>
      </main>

      <Bottom />
    </div>
  );
};

export default Home;
