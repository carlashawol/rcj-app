import {
  Typography,
  Box,
  Stack,
  Button,
  FormControl,
  InputAdornment,
} from "@mui/material";
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import StyledSelect from "./StyledSelect";

export default function FormAddClients() {
  const payment_method = [
    "Contado contra entrega",
    "Crédito 7 días",
    "Crédito 15 días",
    "Crédito 30 días",
    "Crédito 45 días",
    "Crédito 60 días",
    "Crédito 90 días",
    "Crédito 180 días",
  ];

  return (
    <form>
      <Stack justifyContent="center" alignItems="center" spacing={4} pt={5}>
        <Stack direction={"row"} paddingTop={2} spacing={3}>
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="name" label="NOMBRE" />
            <StyledInput id="name" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="nit" label="NIT" />
            <StyledInput id="nit" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="rif" label="RIF" />
            <StyledInput id="rif" />
          </FormControl>
        </Stack>

        <FormControl variant="standard">
          <StyledInputLabel htmlFor="direction" label="DIRECCIÓN" />
          <StyledInput
            id="direction"
            sx={{ "& .MuiInputBase-input": { width: "1030px" } }}
          />
        </FormControl>

        <Stack direction={"row"} paddingTop={2} spacing={3}>
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="city" label="CIUDAD" />
            <StyledInput id="city" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="state" label="DEPARTAMENTO" />
            <StyledInput id="state" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="state" label="PAIS" />
            <StyledInput id="state" />
          </FormControl>
        </Stack>

        <Stack direction={"row"} paddingTop={2} spacing={3}>
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="contact" label="PERSONA CONTACTO" />
            <StyledInput id="contact" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="telephone" label="TELÉFONO" />
            <StyledInput id="telephone" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="cellphone" label="CELULAR" />
            <StyledInput id="cellphone" />
          </FormControl>
        </Stack>

        <Stack direction={"row"} paddingTop={2} spacing={3}>
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="email" label="CORREO ELECTRÓNICO" />
            <StyledInput id="email" sx={{ "& .MuiInputBase-input": { width: "400px" } }}/>
          </FormControl>

          <StyledSelect title="FORMA DE PAGO" data={payment_method} />
        </Stack>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: "#27749C", borderRadius: 20 }}
      >
        Guardar
      </Button>
    </form>
  );
}
