import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { GoalModal } from "./GoalModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../axios";

export const Goals = ({ setNotification }) => {
  const [open, setOpen] = useState({ open: false, type: "", goal: {} });

  const {
    isLoading,
    isSuccess,
    isError,
    data: goals,
    refetch: getGoals,
  } = useQuery({
    queryFn: () => {
      return apiClient.get(
        `/v1/goals`
      );
    },
    queryKey: ["get-goals"],
  });

  return (
    <div>
      <Button
        onClick={() => {
          setOpen({ open: true, type: "add", goal: {} });
        }}
        variant="outlined"
        size="small"
        style={{ margin: "1%" }}
      >
        Add new goal
      </Button>

      <div style={{ overflowY: "scroll" }}>
        {goals?.data?.goals?.length > 0 ? (
          goals?.data?.goals?.map((goal) => {
            return (
              <Card
                key={goal.date}
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
                    {goal.type}
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
                          <u>Goal Type</u> :
                        </td>
                        <td>{goal.type}</td>
                      </tr>
                      <tr>
                        <td>
                          <u>Goal Target</u> :
                        </td>
                        <td>{goal.target}</td>
                      </tr>
                      <tr>
                        <td>
                          <u>Start Date</u> :
                        </td>
                        <td>{new Date(goal.startDate).toLocaleDateString()} </td>
                      </tr>
                      <tr>
                        <td>
                          <u>End Date</u> :
                        </td>
                        <td>{new Date(goal.endDate).toLocaleDateString()} </td>
                      </tr>
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
              No goal found!
            </Typography>
          </div>
        )}
      </div>

      <GoalModal
        setNotification={setNotification}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
