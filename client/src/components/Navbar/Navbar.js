import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Avatar, Typography, Toolbar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px" />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="primary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            className={classes.logout}
            component={Link}
            color="primary"
            to="/auth"
            variant="contained"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
