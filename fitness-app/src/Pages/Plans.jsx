import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();
  return (
    <div>
      Plans
      <Button variant="contained" onClick={() => navigate("/createPlan")}>
        Create Plan
      </Button>
    </div>
  );
};

export default Plans;
