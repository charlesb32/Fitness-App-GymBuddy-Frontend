import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, getPlans } from "../Axios/APICalls";
import { useSelector } from "react-redux";
import HomeMacroTable from "../Components/HomeMacroTable";
import HomeWorkoutTable from "../Components/HomeWorkoutTable";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const currUser = useSelector((state) => state.user.userInfo);
  // console.log(currUser);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);
  useEffect(() => {
    // window.location.reload();
    const fetchData = async () => {
      console.log("Here");
      // window.location.reload();
      if (currUser && currUser.user) {
        try {
          const plans = await getPlans(currUser.user.id);
          setData(plans.data);
          const activePlanIndex = (await getUserInfo(currUser.user.id)).data
            .activePlanIndex;

          setSelectedPlan(activePlanIndex);
        } catch (error) {
          // Handle errors if needed
          console.error("Error fetching plans:", error);
        }
      }
    };

    fetchData();
  }, [currUser]); // Run the effect whenever currUser changes
  return (
    <div className="home">
      {/* Hi */}
      <div className="top-row">
        <h1 className="home_header">Today's Plan</h1>
        {data.length > 0 && (
          <div className="home_table">
            <HomeMacroTable data={data} selectedPlan={selectedPlan} />
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className="bottom_home_table">
          <HomeWorkoutTable data={data} selectedPlan={selectedPlan} />
        </div>
      )}
    </div>
  );
};

export default Home;
