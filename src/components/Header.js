import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import { useHistory } from 'react-router-dom'

import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../redux";
import logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoImg: {
    width: "auto",
    height: "40px",
  },
  cartValue: {
    color: "#da543a",
    paddingLeft: "5px",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  let history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const logout = () => {
    console.log("logout");
    props.logoutUser();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoReviewOrderPage = () =>{
    handleClose();
    console.log('going to review orders');
    history.push('/review');
  }

  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => history.push('')}
          >
            <img className={classes.logoImg} src={logo} />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
          {!props.user.loggedIn ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/login")}
            >
              Login
            </Button>
          ) : (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={gotoReviewOrderPage}>
                  Review Orders{" "}
                  <span className={classes.cartValue}>
                    &#x20B9;{props.cart.cartTotal}
                  </span>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

// export default compose(connect(),withRouter(Header));
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
