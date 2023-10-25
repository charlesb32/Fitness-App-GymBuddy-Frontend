import { useEffect, useState } from "react";
import { getUserInfo, getPlans } from "../Axios/APICalls";
import { useSelector } from "react-redux";
import HomeMacroTable from "../Components/HomeMacroTable";
import HomeWorkoutTable from "../Components/HomeWorkoutTable";

//home page that users land on when they login
const Home = () => {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const currUser = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      if (currUser && currUser.user) {
        try {
          const plans = await getPlans(currUser.user.id);
          setData(plans.data);
          const activePlanIndex = (await getUserInfo(currUser.user.id)).data
            .activePlanIndex;

          setSelectedPlan(activePlanIndex);
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
      }
    };

    fetchData();
  }, [currUser]); // Run the effect whenever currUser changes
  return (
    <div className="home-container">
      <h1 className="home-header">Today's Plan</h1>
      <section className="home-section">
        {data.length > 0 && (
          <>
            <h2 className="home-subheader">Macros</h2>
            <div className="home-macro-table">
              <HomeMacroTable data={data} selectedPlan={selectedPlan} />
            </div>
          </>
        )}
      </section>
      <section className="home-section">
        {data.length > 0 && (
          <>
            <h2 className="home-subheader">Workout</h2>
            <div className="home-workout-table">
              <HomeWorkoutTable data={data} selectedPlan={selectedPlan} />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
