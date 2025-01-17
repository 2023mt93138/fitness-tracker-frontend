import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { ActivityModal } from "./ActivityModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../axios";
import { DeleteModal } from "./DeleteModal";

export const ActivityLogging = ({ setNotification }) => {
  const [open, setOpen] = useState({ open: false, type: "", activity: {} });

  const {
    isLoading,
    isSuccess,
    isError,
    data: activities,
    refetch: getActivities,
  } = useQuery({
    queryFn: () => {
      return apiClient.get(
        `/v1/activity`
      );
    },
    queryKey: ["get-activities"],
  });

  return (
    <div>
      <Button
        onClick={() => {
          setOpen({ open: true, type: "add", activity: {} });
        }}
        variant="outlined"
        size="small"
        style={{ margin: "1%" }}
      >
        Add new activity
      </Button>

      <div style={{ overflowY: "scroll" }}>
        {activities?.data?.activities?.length > 0 ? (
          activities?.data?.activities?.map((activity) => {
            return (
              <Card
                key={activity.date}
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
                    {activity.type}
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
                          <u>Intensity</u> :
                        </td>
                        <td>{activity.intensity}</td>
                      </tr>
                      <tr>
                        <td>
                          <u>Duration</u> :
                        </td>
                        <td>{activity.duration} hrs.</td>
                      </tr>
                      <tr>
                        <td>
                          <u>Distance</u> :
                        </td>
                        <td>
                          {activity.distance ? activity.distance : "NA"} kms.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <u>Calories Burned</u> :
                        </td>
                        <td>{activity.caloriesBurned} cals.</td>
                      </tr>
                      <tr>
                        <td>
                          <u>Date</u> :
                        </td>
                        <td>{new Date(activity.date).toLocaleDateString()} </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
                <CardActions
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <Button
                    onClick={() => {
                      setOpen({
                        open: true,
                        type: "delete",
                        activity: activity,
                      });
                    }}
                    variant="contained"
                    size="small"
                    color="error"
                    style={{ marginLeft: "2%" }}
                  >
                    Delete
                  </Button>
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
              No activity found!
            </Typography>
          </div>
        )}
      </div>

      <ActivityModal
        setNotification={setNotification}
        open={open}
        setOpen={setOpen}
      />
      <DeleteModal
        setNotification={setNotification}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
