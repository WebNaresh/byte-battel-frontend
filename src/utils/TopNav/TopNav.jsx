import { Person } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import useAppCookies from "../../hooks/useAppCookies";
import useAppState from "../../hooks/useAppState";

export default function TopNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, setUser } = useAppState();
  console.log(`🚀 ~ file: TopNav.jsx:19 ~ user:`, user);
  const { removeCookie } = useAppCookies();

  const isMenuOpen = Boolean(anchorEl);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    setUser(null);
    removeCookie("app-cookie");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="sticky" enableColorOnDark>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link to={"/"}>
              <Typography
                variant="body1"
                style={{ color: "#1D6EB7", fontWeight: "bold" }}
                component="h2"
              >
                सहाय्य भोजन
              </Typography>
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
            <Typography
              style={{ fontSize: 14, fontWeight: "bold" }}
              color={"#1D6EB7"}
            >
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Person color="primary" />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {user === null && (
                  <Link to={"/login"}>
                    <MenuItem onClick={handleClose}>Login</MenuItem>
                  </Link>
                )}
                {user === null && (
                  <Link to={"/signup"}>
                    <MenuItem onClick={handleClose}>Signup</MenuItem>
                  </Link>
                )}
                <Link to={"/login"}>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
              </Menu>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
