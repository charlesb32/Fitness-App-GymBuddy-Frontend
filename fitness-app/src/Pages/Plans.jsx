import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans } from "../Axios/APICalls";
import MyPlans from "../Components/MyPlans";
import ViewPlan from "../Components/ViewPlan";

const Plans = (currUser) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(0);
  // Fetch data when the component mounts
  useEffect(() => {
    console.log(currUser);
    // console.log(plans);
    // Fetch data when currUser is updated
    const fetchData = async () => {
      if (currUser && currUser.user) {
        try {
          const plans = await getPlans(currUser.user.user.id);
          setData(plans.data);
        } catch (error) {
          // Handle errors if needed
          console.error("Error fetching plans:", error);
        }
      }
    };

    fetchData();
  }, [currUser]); // Run the effect whenever currUser changes

  return (
    <div className="plans">
      <div className="plans_heading_container">
        <h1 className="plan_heading">My Plans</h1>
        <Button
          className="create_plan_button"
          variant="contained"
          onClick={() => navigate("/createPlan")}
        >
          Create Plan
        </Button>
      </div>
      {data.length > 0 && (
        <MyPlans
          data={data}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />
      )}
      {data.length > 0 && (
        <div className="View_Plan_Table">
          <h1 style={{ textAlign: "left" }}>Workout Schedule</h1>
          <ViewPlan
            data={data}
            selectedPlan={selectedPlan}
            // style={{ marginTop: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Plans;
