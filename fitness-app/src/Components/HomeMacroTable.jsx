import { Table, TableBody, TableRow, TableCell } from "@mui/material";

//displays daily calories, carbs, fats, and protein intake
const HomeMacroTable = ({ data, selectedPlan }) => {
  const currPlan = data[selectedPlan];
  console.log(currPlan);
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
