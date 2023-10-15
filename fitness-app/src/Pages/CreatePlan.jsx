// import * as React from "react";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  // FormControl,
  // InputLabel,
  Select,
  MenuItem,
  // SelectChangeEvent,
  // Box,
  // OutlinedInput,
  Typography,
} from "@mui/material";
import { addPlanToUser } from "../Axios/APICalls";
import { Navigate, useNavigate } from "react-router-dom";
const CreatePlan = (currUser) => {
  console.log(currUser);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(currUser);
  }, []);
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    frequency: "",
    goal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Name: ${name}, Value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API or perform other actions.
    addPlanToUser(formData, currUser.user.user.id);
    navigate("/plans");
    console.log(formData);
    window.location.reload();
  };

  const handleClear = () => {
    setFormData({
      age: "",
      gender: "",
      heightFeet: "",
      heightInches: "",
      weight: "",
      frequency: "",
      goal: "",
    });
  };

  return (
    <div className="create_plan">
      <h1>Create Plan</h1>
      {currUser && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="age">
              <Typography variant="body1" fontWeight="bold">
                Age:
              </Typography>
            </label>
            <TextField
              required
              id="age"
              onChange={handleChange}
              name="age"
              style={{ width: "200px" }}
              value={formData.age}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">
              <Typography variant="body1" fontWeight="bold">
                Gender:
              </Typography>
            </label>
            <Select
              id="gender"
              name="gender"
              value={formData.gender}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              required
              onChange={handleChange}
              style={{ width: "200px" }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="heightFeet">
              <Typography variant="body1" fontWeight="bold">
                Height:
              </Typography>
            </label>
            <TextField
              required
              id="heightFeet"
              onChange={handleChange}
              name="heightFeet"
              style={{ width: "97px", paddingRight: "3px" }}
              placeholder="Feet"
              value={formData.heightFeet}
            />
            <TextField
              required
              id="heightInches"
              onChange={handleChange}
              name="heightInches"
              style={{ width: "97px", paddingLeft: "3px" }}
              placeholder="Inches"
              value={formData.heightInches}
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">
              <Typography variant="body1" fontWeight="bold">
                Weight:
              </Typography>
            </label>
            <TextField
              required
              id="weight"
              onChange={handleChange}
              name="weight"
              style={{ width: "200px" }}
              placeholder="lbs"
              value={formData.weight}
            />
          </div>
          <div className="form-group">
            <label htmlFor="frequency">
              <Typography variant="body1" fontWeight="bold">
                Frequency:
              </Typography>
            </label>
            <Select
              id="frequency"
              name="frequency"
              required
              value={formData.frequency}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={handleChange}
              style={{ width: "200px" }}
              placeholder="Number of times you want to go to gym a week"
            >
              <MenuItem value={"1"}>1 time a week</MenuItem>
              <MenuItem value={"2"}>2 times a week</MenuItem>
              <MenuItem value={"3"}>3 times a week</MenuItem>
              <MenuItem value={"4"}>4 times a week</MenuItem>
              <MenuItem value={"5"}>5 times a week</MenuItem>
              <MenuItem value={"6"}>6 times a week</MenuItem>
              <MenuItem value={"7"}>7 times a week</MenuItem>
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="goal">
              <Typography variant="body1" fontWeight="bold">
                Goal:
              </Typography>
            </label>
            <Select
              id="goal"
              name="goal"
              value={formData.goal}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={handleChange}
              style={{ width: "200px" }}
              required
            >
              {/* <MenuItem value="">Cut/Bulk/Maintain</MenuItem> */}
              <MenuItem value={"Bulk"}>Bulk</MenuItem>
              <MenuItem value={"Cut"}>Cut</MenuItem>
              <MenuItem value={"Maintain"}>Maintain</MenuItem>
            </Select>
          </div>
          <div className="plan_buttons">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Create
            </Button>
            <Button
              onClick={handleClear}
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
            >
              Clear
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePlan;
