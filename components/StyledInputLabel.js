import { InputLabel } from "@mui/material";
import React from "react";

const StyledInputLabel = ({ htmlFor, label }) => {
  return (
    <InputLabel
      shrink={true}
      htmlFor={htmlFor}
      sx={{
        color: "#42A0CE",
        fontWeight: 700,
        fontSize: "1.125rem",
        marginLeft: "5px"
      }}
    >
      {label}
    </InputLabel>
  );
};

export default StyledInputLabel;
