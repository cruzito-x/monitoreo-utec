import Bottom from "../../components/bottom/Bottom";
import Cards from "../../components/cards/Cards";
import Parking from "../../components/parking/Parking";
import Top from "../../components/top/Top";

const Home = () => {
  return (
    <>
      <Top />
      <div className="flex items-center px-10 py-16">
        <Cards />
        <Parking />
      </div>
      <Bottom />
    </>
  );
};

export default Home;
