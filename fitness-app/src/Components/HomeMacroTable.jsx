import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useSelector } from "react-redux";
const HomeMacroTable = ({ data, selectedPlan }) => {
  const currUser = useSelector((state) => state.user.userInfo);
  //   console.log(currUser, data, selectedPlan);
  //   const selectedPlan = currUser.user.activePlanIndex;
  const currPlan = data[selectedPlan];
  const macroBreakDown = {
    Calories: `${currPlan.dailyCalories} cal`,
    Carbs: `${currPlan.dailyCarbs} g`,
    Fats: `${currPlan.dailyFats} g`,
    Protein: `${currPlan.dailyProtein} g`,
  };
  const macroArr = Object.entries(macroBreakDown).map(([key, value]) => ({
    key,
    value,
  }));
  return (
    <Table style={{ tableLayout: "auto" }}>
      <TableBody>
        {macroArr.map((item) => (
          <TableRow key={item.key}>
            <TableCell style={{ padding: "20px", width: "1%" }}>
              {item.key}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default HomeMacroTable;
