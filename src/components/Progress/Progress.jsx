import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
// import { ProgressModal } from "./ProgressModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../axios";

export const Progress = ({ setNotification }) => {
  const [open, setOpen] = useState({ open: false, type: "", progress: {} });

  const {
    isLoading,
    isSuccess,
    isError,
    data: progress,
    refetch: getProgress,
  } = useQuery({
    queryFn: () => {
      return apiClient.get(
        `/v1/progress`
      );
    },
    queryKey: ["get-progress"],
  });

  const progressArr = [{
    id: 1,
    goalType: 'Weight Gain',
    target: 80,
    startDate: '05/01/2024',
    endDate: '05/31/2024',
    currentProgress: 65
  }, {
    id: 2,
    goalType: 'Muscle Gain',
    target: 16,
    startDate: '04/01/2024',
    endDate: '05/31/2024',
    currentProgress: 12
  }]

  return (
    <div>

      <div style={{ overflowY: "scroll" }}>
        {progressArr?.length > 0 ? (
          progressArr?.map((progress) => {
            return (
              <Card
                key={progress.id}
                sx={{
                  width: 300,
                  margin: "1%",
                  float: "left",
                  background: "#f5f5f5",
                  padding: "1%",
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {progress.goalType}
                  </Typography>
                  <table
                    style={{
                      margin: "2%",
                      padding: "1%",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <u>Goal Target</u> :
                        </td>
                        <td>{progress.target}</td>
                      </tr>
                      <tr>
                        <td>
                          <u>Start Date</u> :
                        </td>
                        <td>{new Date(progress.startDate).toLocaleDateString()} </td>
                      </tr>
                      <tr>
                        <td>
                          <u>End Date</u> :
                        </td>
                        <td>{new Date(progress.endDate).toLocaleDateString()} </td>
                      </tr>
                      <tr>
                        <td>
                          <u>Current Progress</u> :
                        </td>
                        <td>{progress.currentProgress} </td>
                      </tr>
                      <br></br>
                      <Button
                        onClick={() => {
                          deleteActivity(open.activity._id);
                        }}
                        variant="contained"
                        size="small"
                        color="error"
                      >
                        Update
                      </Button>
                    </tbody>
                  </table>
                </CardContent>
                <CardActions
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                </CardActions>
              </Card>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5%",
            }}
          >
            <Typography gutterBottom variant="h5">
              No progress found!
            </Typography>
          </div>
        )}
      </div>

      {/* <GoalModal
        setNotification={setNotification}
        open={open}
        setOpen={setOpen}
      /> */}
    </div>
  );
};
