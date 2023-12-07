//this is the plans page that holds all components rendered on the plans tab

import { useEffect, useState } from "react";
import { getPlans, getUserInfo } from "../Axios/APICalls";
import MyPlans from "../Components/MyPlans";
import ViewPlan from "../Components/ViewPlan";
import { useSelector } from "react-redux";

const Plans = () => {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const currUser = useSelector((state) => state.user.userInfo);
  const [planChangeFlag, setPlanChangeFlag] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (currUser && currUser.user) {
        try {
          const plans = await getPlans(currUser.user.id);
          const userInfo = await getUserInfo(currUser.user.id);
          const activePlanIndex = userInfo.data.activePlanIndex;
          setData(plans.data);
          setSelectedPlan(activePlanIndex);
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
      }
    };

    fetchData();
  }, [currUser, planChangeFlag]);

  return (
    <div className="plans-container">
      {data.length === 0 && (
        <p>
          You have not made any plans, click create new plan in the topbar to
          get started!
        </p>
      )}
      {data.length > 0 && (
        <>
          <header className="plans-header">
            <h1>My Plans</h1>
          </header>
          <section className="plans-section">
            {data.length > 0 && (
              <MyPlans
                data={data}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                planChangeFlag={planChangeFlag}
                setPlanChangeFlag={setPlanChangeFlag}
              />
            )}
          </section>
          <h1 className="workout-plan-header">Workout Schedule</h1>
          <section className="plans-section">
            {data.length > 0 && (
              <>
                <div className="plans-view">
                  <ViewPlan data={data} selectedPlan={selectedPlan} />
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Plans;
