//displays all of users plans and allows them to view additional details about a plan, delete a plan, and select an active plan

import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { deletePlanById, setActivePlanIndex } from "../Axios/APICalls";
import { useSelector } from "react-redux";

const MyPlans = ({
  data,
  selectedPlan,
  setSelectedPlan,
  planChangeFlag,
  setPlanChangeFlag,
}) => {
  const currUser = useSelector((state) => state.user.userInfo);
  const rows = data.map((plan) => ({
    plans: plan.goal,
    dailyCalories: plan.dailyCalories,
    dailyCarbs: plan.dailyCarbs,
    dailyFats: plan.dailyFats,
    dailyProtein: plan.dailyProtein,
    active: "Active",
    frequency: plan.frequency,
    planId: plan._id,
  }));
  const [anchorEl, setAnchorEl] = useState(null);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [rowSelected, setRowSelected] = useState(0);
  const [openMorePlanInfoModal, setOpenMorePlanInfoModal] = useState(false);
  const handleActivePlanChange = async (planIndex) => {
    setSelectedPlan(planIndex);
    await setActivePlanIndex(currUser.user.id, planIndex);
  };

  const handleMenuOpen = (event, plan, index) => {
    setRowSelected(index);
    setAnchorEl(event.currentTarget);
    setPlanToDelete(plan);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setPlanToDelete(null);
  };

  const showMorePlanInfoModal = () => {
    setOpenMorePlanInfoModal(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Plan Type</TableCell>
              <TableCell>Days Working Out</TableCell>
              <TableCell>Daily Caloric Intake (kcal)</TableCell>
              <TableCell>Carbs (g)</TableCell>
              <TableCell>Fats (g)</TableCell>
              <TableCell>Protein (g)</TableCell>
              <TableCell>Active Plan</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={`${row.plans} ${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.plans}</TableCell>
                <TableCell align="left">{row.frequency}</TableCell>
                <TableCell align="left">{row.dailyCalories}</TableCell>
                <TableCell align="left">{row.dailyCarbs}</TableCell>
                <TableCell align="left">{row.dailyFats}</TableCell>
                <TableCell align="left">{row.dailyProtein}</TableCell>
                <TableCell align="left">
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
                <TableCell align="left">
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, row, index)}
                  >
                    <MoreHorizOutlinedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={async () => {
            let flag = 0; //determines what new seleceted plan is on a delete
            if (selectedPlan === rowSelected) {
              flag += 1;
              if (rows.length === 1) {
                //remove activePlanId
              } else {
                handleActivePlanChange(0);
              }
            }
            const res = await deletePlanById(
              planToDelete.planId,
              currUser.user.id
            );
            if (res) {
              planChangeFlag++;
              setPlanChangeFlag(planChangeFlag);
            }
            if (flag === 0 && rowSelected < selectedPlan) {
              handleActivePlanChange(selectedPlan - 1);
            }
            handleMenuClose();
          }}
        >
          Delete Plan
        </MenuItem>
        <MenuItem onClick={showMorePlanInfoModal}>View More Plan Info</MenuItem>
      </Menu>
      <Modal
        open={openMorePlanInfoModal}
        onClose={() => setOpenMorePlanInfoModal(false)}
      >
        <Box className="View-More-Plan-Info-Box">
          {data[rowSelected] && (
            <>
              <div>Age: {data[rowSelected].age}</div>
              <div>Gender: {data[rowSelected].gender}</div>
              <div>
                Height: {data[rowSelected].heightFeet} ft
                {" " + data[rowSelected].heightInches} in
              </div>
              <div>Weight: {data[rowSelected].weight} lbs</div>
              <div>Frequency: {data[rowSelected].frequency} times a week</div>
              <div>Goal: {data[rowSelected].goal}</div>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default MyPlans;
