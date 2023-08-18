import * as React from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function BasicMenu({ idShippable, groups }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnClickAdv = (idGroup) => {
    setAnchorEl(null);
    navigate(`/avances/${idShippable}/${idGroup}`);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AddCircleOutlineIcon />
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
        {/* <MenuItem onClick={() => handleOnClickAdv()}>Fase 1</MenuItem>
        <MenuItem onClick={() => handleOnClickAdv()}>Fase 2</MenuItem>
        <MenuItem onClick={() => handleOnClickAdv()}>Fase 3</MenuItem> */}
        {_.map(groups, (group, index) => (
          <MenuItem onClick={() => handleOnClickAdv(group.idGrupo)} key={index}>
            {group.fase}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
