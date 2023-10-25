import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, getUserInfo } from "../Axios/APICalls";
import MyPlans from "../Components/MyPlans";
import ViewPlan from "../Components/ViewPlan";
import { useSelector } from "react-redux";

const Plans = () => {
  const navigate = useNavigate();
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
    <div className="plans-container">
      <header className="plans-header">
        <h1>My Plans</h1>
        <Button
          className="plans-create-button"
          variant="contained"
          onClick={() => navigate("/createPlan")}
        >
          Create Plan
        </Button>
      </header>
      <section className="plans-section">
        {data.length > 0 && (
          <MyPlans
            data={data}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        )}
      </section>
      <section className="plans-section">
        {data.length > 0 && (
          <>
            <h2 className="plans-subheader">Workout Schedule</h2>
            <div className="plans-view">
              <ViewPlan data={data} selectedPlan={selectedPlan} />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Plans;
