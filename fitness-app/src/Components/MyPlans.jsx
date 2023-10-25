import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox } from "@mui/material";
import { setActivePlanIndex } from "../Axios/APICalls";
import { useSelector } from "react-redux";

//shows all plans that a user account has, with daily calorires, carb, fat, and protein intake, as well as their plan type. From here, the user can also select which plan they want to be their active plan
const MyPlans = ({ data, selectedPlan, setSelectedPlan }) => {
  const dataArr = data;
  const currUser = useSelector((state) => state.user.userInfo);
  const rows = dataArr.map((plan) => ({
    plans: plan.goal,
    dailyCalories: plan.dailyCalories,
    dailyCarbs: plan.dailyCarbs,
    dailyFats: plan.dailyFats,
    dailyProtein: plan.dailyProtein,
    active: "Active",
  }));

  const handleActivePlanChange = (planIndex) => {
    console.log(typeof planIndex);
    setSelectedPlan(planIndex);
    setActivePlanIndex(currUser.user.id, planIndex);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plan Type</TableCell>
            <TableCell align="right">Daily Caloric Intake (kcal)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Fats (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
            <TableCell align="right">Active Plan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={`${row.plans} ${index}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.plans}</TableCell>
              <TableCell align="right">{row.dailyCalories}</TableCell>
              <TableCell align="right">{row.dailyCarbs}</TableCell>
              <TableCell align="right">{row.dailyFats}</TableCell>
              <TableCell align="right">{row.dailyProtein}</TableCell>
              <TableCell align="right">
                <Checkbox
                  color="primary"
                  inputProps={{
                    "aria-label": "select plan",
                  }}
                  // Set the checkbox's checked status based on the active plan
                  checked={selectedPlan === index}
                  // Handle checkbox click to update the active plan
                  onChange={() => handleActivePlanChange(index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyPlans;
