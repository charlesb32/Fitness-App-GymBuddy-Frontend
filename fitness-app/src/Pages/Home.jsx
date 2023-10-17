import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans } from "../Axios/APICalls";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // const [selectedPlan, setSelectedPlan] = useState(0);
  const currUser = useSelector((state) => state.user.userInfo);
  console.log(currUser);
  useEffect(() => {
    const fetchData = async () => {
      if (currUser && currUser.user) {
        try {
          const plans = await getPlans(currUser.user.id);
          setData(plans.data);
        } catch (error) {
          // Handle errors if needed
          console.error("Error fetching plans:", error);
        }
      }
    };

    fetchData();
  }, [currUser]); // Run the effect whenever currUser changes
  return <div>Home </div>;
};

export default Home;
