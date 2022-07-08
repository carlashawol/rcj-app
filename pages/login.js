import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

import { Typography, Card, CardContent } from "@mui/material";
export default function AddInstrument() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: "0px 8px 30px rgba(0, 5, 58, 0.18)",
      }}
    >
      <CardContent>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
}
