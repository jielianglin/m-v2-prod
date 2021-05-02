import React from "react";
import Button from "@material-ui/core/Button";
import Info from "./Info";
import logo from "./logo/logo.png";
import Popover from "@material-ui/core/Popover";

const style = {
  top: "5px",
};

export default function SimplePopOver() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <img src={logo} width="50px" alt="" />
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={style}
        elevation={0}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Info />
      </Popover>
    </div>
  );
}
