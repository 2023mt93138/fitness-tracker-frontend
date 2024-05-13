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

export const GoalModal = ({ open, setOpen, setNotification }) => {
  const [goal, setGoal] = useState({
    type: "",
    startDate: "",
    endDate: "",
    target: "",
  });

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    mutate: logNewGoal,
  } = useMutation({
    mutationFn: (body) => {
      return apiClient.post("/v1/progress", body);
    },
  });

  const { refetch: getGoals } = useQuery({
    queryFn: () => {
      return apiClient.get(
        `/v1/progress`
      );
    },
    queryKey: ["get-progress"],
  });

  useEffect(() => {
    if (isSuccess) {
      setNotification({ isOpen: true, message: "Added a new goal!" });
      setGoal({
        type: "",
        startDate: "",
        endDate: "",
        target: "",
      });
      getGoals();
    } else if (isError) {
      setNotification({ isOpen: true, message: "Failed to add goal!" });
      setGoal({
        type: "",
        startDate: "",
        endDate: "",
        target: "",
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
      <DialogTitle>Add a new goal </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add a new fitness goal to track your goals and progress.
        </DialogContentText>

        <div style={{ padding: "1%" }}>
          <FormControl style={{ margin: "1%" }} variant="standard" fullWidth>
            <InputLabel id="type">Goal Type</InputLabel>
            <Select
              labelId="type"
              value={goal.type}
              onChange={(e) => {
                setGoal({ ...goal, type: e.target.value });
              }}
              fullWidth
            >
              <MenuItem value={"WeightGain"}>WeightGain</MenuItem>
              <MenuItem value={"WeightLoss"}>WeightLoss</MenuItem>
              <MenuItem value={"MuscleGain"}>MuscleGain</MenuItem>
              <MenuItem value={"MuscleLean"}>MuscleLean</MenuItem>
            </Select>
          </FormControl>

          <TextField
            style={{ margin: "1%" }}
            type="number"
            label="Target"
            variant="standard"
            fullWidth
            value={goal.target}
            onChange={(e) => {
              setGoal({
                ...goal,
                target: e.target.value.toString(),
              });
            }}
          />

          <TextField
            style={{ margin: "1%" }}
            type="date"
            variant="standard"
            fullWidth
            value={goal.startDate}
            onChange={(e) => {
              setGoal({
                ...goal,
                startDate: e.target.value.toString(),
              });
            }}
          />
          <TextField
            style={{ margin: "1%" }}
            type="date"
            label="End Date"
            variant="standard"
            fullWidth
            value={goal.endDate}
            onChange={(e) => {
              setGoal({
                ...goal,
                endDate: e.target.value.toString(),
              });
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            logNewGoal({
              ...goal,
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
