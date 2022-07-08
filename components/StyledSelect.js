import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Stack, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";

const StyledSelect = ({ title, data }) => {
  const [filter, setFilter] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter(value);
  };

  return (
    <Stack>
      <Typography
        sx={{
          color: "#42A0CE",
          fontWeight: 700,
          fontSize: "16px",
          marginLeft: "5px",
          marginBottom: "6px"
        }}
      >
        {title}
      </Typography>
      <FormControl sx={{ width: 220 }}>
        <Select
          displayEmpty
          value={filter}
          onChange={handleChange}
          input={
            <OutlinedInput
              sx={{
                height: "47px",
                width: "400px",
                border: "1px solid #ced4da",
                borderRadius: 20,
              }}
            />
          }
        >
          {data.map((data) => (
            <MenuItem
              key={data}
              value={data}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#DDF2F9",
                  "&:hover": {
                    backgroundColor: "#DDF2F9",
                  },
                },
                "&:hover": {
                  backgroundColor: "#DDF2F9",
                },
              }}
            >
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default StyledSelect;
