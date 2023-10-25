import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ViewPlan = ({ data, selectedPlan }) => {
  const currPlan = data[selectedPlan];
  const workouts = currPlan.workoutId.workouts;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Plan Type</TableCell>
            {daysOfWeek.map((day, index) => (
              <TableCell key={day} align="right">
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{currPlan.goal}</TableCell>
            {workouts.map((dayWorkout, index) => (
              <TableCell key={index} align="right">
                {dayWorkout.length > 0 ? (
                  <ul>
                    {dayWorkout.map((workout, setIndex) => (
                      <li key={setIndex}>{workout}</li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    <li>Rest Day</li>
                  </ul>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewPlan;
