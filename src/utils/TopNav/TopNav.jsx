import { Person } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import useAppCookies from "../../hooks/useAppCookies";
import useAppFunction from "../../hooks/useAppFunction";
import useAppState from "../../hooks/useAppState";

export default function TopNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, setUser } = useAppState();
  const { removeCookie, cookies } = useAppCookies();
  const { handleLoader } = useAppFunction();

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
    handleLoader(true, "#f97316");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const getNotification = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies["app-cookie"],
      },
    };
    let data = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/route/get-notification`,
      config
    );
    return data.data;
  };
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotification,
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        component={"nav"}
        enableColorOnDark
        style={{
          backdropFilter: "blur(2px) saturate(14%)",
          WebkitBackdropFilter: "blur(2px) saturate(14%)",
          backgroundColor: "rgba(249, 115, 22, 0.4)",
        }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Link to={"/"}>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold" }}
                className="!text-primary"
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
              <Badge
                badgeContent={data?.notification?.length || 0}
                color="warning"
              >
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className=" !border-[0.5px] !border-primary !border-solid"
                >
                  <Person color="primary" />
                </IconButton>
              </Badge>
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
                {user !== null && (
                  <Link to={"/login"}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Link>
                )}
                {user !== null && user.type === "Provider" && (
                  <Link to={"/notification"}>
                    <MenuItem onClick={handleClose}>Notification</MenuItem>
                  </Link>
                )}
                {user !== null && user.type === "Consumer" && (
                  <Link to={"/notification-consumer"}>
                    <MenuItem onClick={handleClose}>
                      Reports of distribution
                    </MenuItem>
                  </Link>
                )}
              </Menu>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
