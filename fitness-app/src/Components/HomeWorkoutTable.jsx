//displays exercises for the current day in the user's workout program on home page in a table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const HomeWorkoutTable = ({ data, selectedPlan }) => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Returns 0 for Sunday, 1 for Monday, 2 for Tuesday, etc.
  const todaysWorkout = data[selectedPlan].workoutId.workouts[dayOfWeek];
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todaysWorkout.length > 0 ? (
              todaysWorkout.map((exercise, index) => {
                const regexResult = exercise.match(/(\d+)x(\d+)\s(.+)/);

                if (regexResult) {
                  const [, sets, reps, exerciseName] = regexResult;
                  return (
                    <TableRow key={`${exerciseName}-${index}`}>
                      <TableCell>{exerciseName}</TableCell>
                      <TableCell>{sets}</TableCell>
                      <TableCell>{reps}</TableCell>
                    </TableRow>
                  );
                } else {
                  return null; // Handle invalid data format
                }
              })
            ) : (
              <TableRow>
                <TableCell>Rest</TableCell>
                <TableCell>Rest</TableCell>
                <TableCell>Rest</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomeWorkoutTable;
