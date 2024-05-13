import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { apiClient } from "../../axios";

export const ActivityModal = ({ open, setOpen, setNotification }) => {
  const [activity, setActivity] = useState({
    type: "",
    duration: "",
    distance: "",
    caloriesBurned: "",
    intensity: "",
  });

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: logNewActivity,
  } = useMutation({
    mutationFn: (body) => {
      return apiClient.post("/v1/activity", body);
    },
  });

  const { refetch: getActivities } = useQuery({
    queryFn: () => {
      return apiClient.get(
        `/v1/activity`
      );
    },
    queryKey: ["get-activities"],
  });

  useEffect(() => {
    if (isSuccess) {
      setNotification({ isOpen: true, message: "Added a new activity!" });
      setActivity({
        type: "",
        duration: "",
        distance: "",
        caloriesBurned: "",
        intensity: ""
      });
      getActivities();
    } else if (isError) {
      setNotification({ isOpen: true, message: "Failed to add activity!" });
      setActivity({
        type: "",
        duration: "",
        distance: "",
        caloriesBurned: "",
        intensity: ""
      });
    }
  }, [isSuccess, isError]);

  return (
    <Dialog
      open={open.open && open.type === "add"}
      onClose={() => {
        setOpen({ open: false, type: "" });
      }}
    >
      <DialogTitle>Add a new activity </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a new fitness activity to track your goals and progress.
        </DialogContentText>

        <div style={{ padding: "1%" }}>
          <FormControl style={{ margin: "1%" }} variant="standard" fullWidth>
            <InputLabel id="type">Activity Type</InputLabel>
            <Select
              labelId="type"
              value={activity.type}
              onChange={(e) => {
                setActivity({ ...activity, type: e.target.value });
              }}
              fullWidth
            >
              <MenuItem value={"Workout"}>Workout</MenuItem>
              <MenuItem value={"Run"}>Run</MenuItem>
              <MenuItem value={"Walk"}>Walk</MenuItem>
              <MenuItem value={"Cycling"}>Cycling</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ margin: "1%" }} variant="standard" fullWidth>
            <InputLabel id="intensity">Intensity</InputLabel>
            <Select
              labelId="intensity"
              value={activity.intensity}
              onChange={(e) => {
                setActivity({ ...activity, intensity: e.target.value });
              }}
              fullWidth
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Moderate"}>Moderate</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            style={{ margin: "1%" }}
            type="number"
            label="Duration (hrs)"
            variant="standard"
            fullWidth
            value={activity.duration}
            onChange={(e) => {
              setActivity({ ...activity, duration: e.target.value.toString() });
            }}
          />

          {activity.type !== "Workout" ? (
            <TextField
              style={{ margin: "1%" }}
              type="number"
              label="Distance (kms)"
              variant="standard"
              fullWidth
              value={activity.distance}
              onChange={(e) => {
                setActivity({
                  ...activity,
                  distance: e.target.value.toString(),
                });
              }}
            />
          ) : null}

          <TextField
            style={{ margin: "1%" }}
            type="number"
            label="Calories burned (cal)"
            variant="standard"
            fullWidth
            value={activity.caloriesBurned}
            onChange={(e) => {
              setActivity({
                ...activity,
                caloriesBurned: e.target.value.toString(),
              });
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            logNewActivity({
              ...activity,
              username: localStorage.getItem("username"),
              date: new Date().toISOString(),
            });
            setOpen({ open: false, type: "" });
          }}
          variant="contained"
          size="small"
          color="success"
        >
          Submit
        </Button>
        <Button
          onClick={() => {
            setOpen({ open: false, type: "" });
          }}
          variant="contained"
          size="small"
          color="error"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
