import { Snackbar, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Goals } from "../Goals/Goals";
import { ActivityLogging } from "../ActivityLogging/ActivityLogging";
import { Progress } from "../Progress/Progress";

export const Dashboard = ({ user }) => {
  const [tabval, setTabval] = useState(0);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
  });
  return (
    <div
      style={{ margin: "1%", border: "1px solid #bdbdbd", minHeight: "90dvh" }}
    >
      <Tabs
        value={tabval}
        onChange={(e, newValue) => {
          setTabval(newValue);
        }}
      >
        <Tab label="Activities" value={0} sx={{ color: 'green' }}/>
        <Tab label="Goals" value={1} sx={{ color: 'green' }}/>
        <Tab label="Progress" value={2} sx={{ color: 'green' }}/>
      </Tabs>
      {tabval === 0 ? (
        <ActivityLogging setNotification={setNotification} />
      ) : tabval === 1 ? (
        <Goals setNotification={setNotification} />
      ) : tabval === 2 ? (
        <Progress setNotification={setNotification} />
      ) : null}
      <Snackbar
        open={notification.isOpen}
        autoHideDuration={3000}
        onClose={() => {
          setNotification({ isOpen: false, message: "" });
        }}
        message={notification.message}
      />
    </div>
  );
};
