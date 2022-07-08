import { InputBase, styled } from "@mui/material";

const StyledInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2.5),
  },
  "& .MuiInputBase-input": {
    marginTop: 8,
    borderRadius: 20,
    position: "relative",
    backgroundColor: "white",
    color: "black",
    border: "2px solid #ced4da",
    fontSize: "1.125rem",
    width: "320px",
    height: "30px",
    paddingLeft: "12px",
    paddingRigth: "12px",
    paddingTop: "7px",
    paddingBottom: "7px",
    "&:focus": {
      borderColor: "#42A0CE",
    },
  },
}));

export default StyledInput;
