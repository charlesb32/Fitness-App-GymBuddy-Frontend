import { useEffect, useState } from "react";
import { getUserInfo, getPlans } from "../Axios/APICalls";
import { useSelector } from "react-redux";
import HomeMacroTable from "../Components/HomeMacroTable";
import HomeWorkoutTable from "../Components/HomeWorkoutTable";
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
//home page that users land on when they login
const Home = () => {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const currUser = useSelector((state) => state.user.userInfo);
  console.log(data);
  // const navigate = useNavigate();
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
      {data.length === 0 && (
        <p>
          You have not made any plans, click create new plan in the topbar to
          get started!
        </p>
      )}
      {data.length > 0 && (
        <>
          <h1 className="home-header">Today's Plan</h1>
          {/* <Button
        className="plans-create-button"
        variant="contained"
        onClick={() => navigate("/createPlan")}
      >
        Create Plan
      </Button> */}
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
        </>
      )}
    </div>
  );
};

export default Home;
