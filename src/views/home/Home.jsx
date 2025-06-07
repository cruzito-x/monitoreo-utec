import Bottom from "../../components/bottom/Bottom";
import Cards from "../../components/cards/Cards";
import Parking from "../../components/parking/Parking";
import Top from "../../components/top/Top";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Top />

      <main className="flex-1 px-10 py-8">
        <Cards />
        {/* <Parking /> */}
      </main>
      <Bottom />
    </div>
  );
};

export default Home;
