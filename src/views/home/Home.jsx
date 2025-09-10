import { useLocation } from "react-router-dom";
import Bottom from "../../components/bottom/Bottom";
import Cards from "../../components/cards/Cards";
import Parking from "../../components/parking/Parking";
import Stats from "../../components/stats/Stats";
import Top from "../../components/top/Top";

const Home = () => {
  const location = useLocation();
  const { carnet, user_name, role } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Top carnet={carnet} user_name={user_name} />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-4 mt-5">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-5">
          <div className="w-full lg:max-w-sm">
            <Cards />
          </div>

          <div className="flex-1 w-full min-w-0 overflow-x-auto lg:overflow-visible">
            <Parking />
          </div>

          <>
            {role !== 1 && (
              <div className="w-full lg:max-w-sm">
                <Stats />
              </div>
            )}
          </>
        </div>
      </main>

      <Bottom />
    </div>
  );
};

export default Home;
