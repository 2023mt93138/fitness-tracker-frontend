import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../Login/Login";
import { Dashboard } from "../Dashboard/Dashboard";

export const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("username"));
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: 'green' }}>
          <img
            style={{ height: "35px", width: "35px", marginRight: "1%" }}
            src={"../../../public/fitness.png"}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FitFolio
          </Typography>
          {user ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.removeItem("username");
                  setUser("");
                }}
                style={{ border: "1px solid white", marginLeft: "1%" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/login");
                }}
                style={{ border: "1px solid white" }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/register");
                }}
                style={{ border: "1px solid white", marginLeft: "1%" }}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {user ? <Dashboard user={user} /> : <Login />}
    </div>
  );
};
