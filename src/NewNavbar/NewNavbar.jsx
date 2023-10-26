import * as React from "react";
import { useContext, useState } from "react";
import { GridContext } from "../Contexts";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import "./NewNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ButtonSound1 from "./ButtonSound/buttons.mp3";
import ButtonSound2 from "./ButtonSound/button1.mp3";
import background from "../background.jpg";

const drawerWidth = 190;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function NewNavbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const audio1 = new Audio(ButtonSound1);
  const audio2 = new Audio(ButtonSound2);

  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { state, dispatch } = useContext(GridContext);

  const navItems = [
    { title: "Home", icon: <HomeIcon /> },
    { title: "New Game", icon: <SportsEsportsIcon /> },
    { title: "How to Play?", icon: <LightbulbIcon /> },
    { title: "Options", icon: <SettingsIcon /> },
    { title: "Exit", icon: <LogoutIcon /> },
  ];

  const handleNavClicks = (title) => {
    if (title === "New Game" && state.sel !== "Select size here") {
      dispatch({ type: "SetStates", payload: { sel: "Select size here" } });
    } else if (title === "New Game" && state.sel === "Select size here") {
      alert("Select size or Start Game");
    } else if (title === "Home") {
      navigate("/");
    } else if (title === "Exit") {
      window.close();
    } else if (title === "Options") {
      dispatch({ type: "SetStates", payload: { modalShow: true } });
    } else {
      dispatch({ type: "SetStates", payload: { Routed: true } });
      navigate("/aboutgame");
    }
  };
  const setStatesAfterSel=(row,col)=>{
    let arr = [];
    let horizontal = [];
    let vertical = [];
    let squares = [];
    for (let i = 0; i <= row * col + row + col; i++) {
      arr.push(i);
    }

    for (let i = 0; i < row * col + col; i++) {
      horizontal.push({
        key: i,
        type: "horizontal",
        isClicked: false,
        btncolor: "#2196f3",
        active: false,
      });
    }

    for (let i = 0; i < row * col + row; i++) {
      vertical.push({
        key: i,
        type: "vertical",
        isClicked: false,
        btncolor: "#2196f3",
        active: false,
      });
    }

    for (let i = 0; i < row * col; i++) {
      squares.push({ allClicked: false, squarecolor: "lightgrey", active: false });
    }
    return {horizontalButtons: horizontal,
      verticalButtons: vertical,
      squaresColors: squares,
      Box: arr}
  }
  return (
    <Box sx={{ display: "flex", minWidth: "100vw", height: "65px" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "#4A00E0" }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <button className="button-29" role="button">
              <MenuIcon />
            </button>
          </IconButton>

          {/* //dot and box name code here  */}

          <div className="cont" onClick={() => navigate("/")}>
            <Typography
              variant="h4"
              noWrap
              component="div"
              className="typewriter"
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                overflow: "visible",
              }}
            >
              𝕯𝖔𝖙 & 𝕭𝖔𝖝 𝕲𝖆𝖒𝖊
            </Typography>
            <img
              width="50"
              height="40"
              src="https://media.giphy.com/avatars/jaaaamesperrett/Dx0SbsMf7gjn.gif"
            />
          </div>

          <Typography
            component="div"
            sx={{ alignItems: "right", display: "flex", gap: "20px" }}
          >
            <Typography
              sx={{ display: { xs: "none", sm: "block" }, overflow: "visible" }}
              className="Navbartxt"
              variant="h6"
              noWrap
              component="div"
              title="New Game"
              onClick={(e) => {
                audio2.play();
                handleNavClicks(e.target.title);
              }}
            >
              New Game
            </Typography>
            {state.start ? (
              <select
                value={state.sel}
                onChange={(e) => {
                  console.log("line 157 ", state.sel);
                  const selectValue=e.target.value
                  const row=selectValue.split("*").map(Number)[0]
                  const col=selectValue.split("*").map(Number)[1]
                  let obj=setStatesAfterSel(row,col)
                  console.log("line 221",row,col,obj)
                  if(row && col && Object.keys(obj).length>0){
                    dispatch({
                      type: "SetStates",
                      payload: { 
                        Box: [], 
                        start:false,
                        row:row,
                        col:col,
                        ...obj,
                        sel: selectValue,
                        gridWidth: 80*(col+1),
                        gridHeight: 80*(row+1)
                     },
                    });
                  }
                }}
                style={{
                  color: "white",
                  border: "none",
                  background: "#4A00E0",
                }}
              >
                <option value="Select size here">Select Size</option>
                <option value="2*3">2 x 3</option>
                <option value="3*3">3 x 3</option>
                <option value="3*4">3 x 4</option>
                <option value="4*4">4 x 4</option>
                <option value="4*5">4 x 5</option>
                <option value="5*5">5 x 5</option>
                <option value="5*6">5 x 6</option>
                <option value="6*6">6 x 6</option>
                <option value="6*7">6 x 7</option>
                <option value="7*7">7 x 7</option>
                <option value="7*8">7 x 8</option>
                <option value="8*8">8 x 8</option>
              </select>
            ) : (
              <Typography
                sx={{
                  display: { xs: "block", sm: "block" },
                  overflow: "visible",
                }}
                className="Navbartxt"
                variant="h6"
                noWrap
                component="div"
                title="Start Game"
                onClick={() =>
                  dispatch({ type: "SetStates", payload: { start: true } })
                }
              >
                Start Game
              </Typography>
            )}

            <Typography
              sx={{ display: { xs: "none", sm: "block" }, overflow: "visible" }}
              className="Navbartxt"
              variant="h6"
              noWrap
              component="div"
              title="How to play?"
              onClick={(e) => {
                handleNavClicks(e.target.title);
                audio2.play();
              }}
            >
              <Link to="/aboutgame">About Game</Link>
            </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          color: "white",
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <img
          src={background}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "-10",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            opacity: "0.85",
          }}
        />
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List sx={{ color: "white" }}>
          {navItems.map((ele) => (
            <ListItem key={ele.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleNavClicks(ele.title);
                  audio1.play();
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{ele.icon}</ListItemIcon>
                <ListItemText primary={ele.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
export default NewNavbar;
