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
  ];

  return (
    <form>
      <Stack justifyContent="center" pt={5} alignItems="center" pb={5}>
        <Stack
          spacing={4}
          maxWidth={1080}
        >
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
              sx={{ "& .MuiInputBase-input": { width: "1037px" } }}
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

          <Stack direction={"row"} paddingTop={2} justifyContent="space-between">
            <FormControl variant="standard">
              <StyledInputLabel htmlFor="email" label="CORREO ELECTRÓNICO" />
              <StyledInput
                id="email"
                sx={{ "& .MuiInputBase-input": { width: "450px" } }}
              />
            </FormControl>

            <FormControl variant="standard">
              <StyledSelect title="FORMA DE PAGO" data={payment_method} size="500px"/>
            </FormControl>
          </Stack>

          <Stack direction={"row"} alignItems="center" justifyContent="center"  spacing={55}>
            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="price-ajustment"
                label="AJUSTAR PRECIOS"
              />
              <StyledInput
                id="price-ajustment"
                sx={{ "& .MuiInputBase-input": { width: "450px", mr: "5px" } }}
                endAdornment={
                  <InputAdornment>
                    <Typography
                      fontSize={20}
                      fontWeight={700}
                      ml={-6}
                      mt={1}
                      zIndex={3}
                    >
                      %
                    </Typography>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#27749C", borderRadius: 20, fontWeight: 500, px: 4, py: 1.5, mt: "30px !important" }}
            >
              Guardar
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}
