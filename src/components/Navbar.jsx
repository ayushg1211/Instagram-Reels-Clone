import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { makeStyles } from "tss-react/mui";
import insta from "../Assets/insta1.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles()({
  appb: {
    background: "white",
  },
});

export default function Navbar({ userData }) {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();
  const { logOut } = React.useContext(AuthContext);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    // console.log(userData.userId);
    history.push(`/profile/${userData.userId}`); // onclick go to profile page of the user
  };

  const handleBannerClick = () => {
    history.push("/"); // onclick go to HomePage
  };
  const handleLogout = async () => {
    await logOut();
    history.push("/login");
  };

  const handleExplore = () => {
    let win = window.open("https://www.linkedin.com/in/ayushgoel12/", "_blank");
    win.focus();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp;</p>Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        <p>&nbsp;&nbsp;</p>Log out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp;</p>Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        <p>&nbsp;&nbsp;</p>Log out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {console.log(userData)} */}
      <AppBar position="fixed" sx={{ background: "white" }}>
        <Toolbar>
          <div style={{ marginLeft: "4%" }}>
            <img
              src={insta}
              style={{ width: "20vh" }}
              onClick={handleBannerClick}
            />
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              color: "black",
              alignItems: "center",
              marginRight: "4rem",
            }}
          >
            {/* icons */}
            <HomeIcon
              onClick={handleBannerClick}
              sx={{ marginRight: "1.5rem", cursor: "pointer" }}
            />
            <ExploreIcon
              onClick={handleExplore}
              sx={{ marginRight: "1rem", cursor: "pointer" }}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                src={userData.profileUrl}
                sx={{ height: "2rem", width: "2rem" }}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="default"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
