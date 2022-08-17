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

export default function ItemReceptionForm() {
  const payment_method = [
    "Alimentos Polar Planta Palmonagas",
    "C.A. Cigarrera Biggot SUCS",
    "E.S.E Hospital San Rafael de Tunja",
    "Halliburton Latin America S R L",
    "Toxi-Lab Centro de Analisis C.A.",
    "Atlantida Socotherm  S.A.",
    "Clover Internacional C.A.",
    "Cooperativa Drilling Tools Service, R.L.",
  ];

  return (
    <form>
      <Stack justifyContent="center" alignItems="center" padding={4}>
        <Stack justifyContent="center" spacing={4} pt={5}>
          <FormControl variant="standard">
            <StyledSelect
              title="NOMBRE CLIENTE"
              data={payment_method}
              size="514px"
            />
          </FormControl>

          <Stack >
            <Stack direction={"row"} spacing={3}>
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="name" label="CODIGO DE REGISTRO" />
                <StyledInput id="name" sx={{ "& .MuiInputBase-input": { width: "500px" } }}/>
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="nit"
                  label="ORDEN DE COMPRA N°"
                />
                <StyledInput id="nit" sx={{ "& .MuiInputBase-input": { width: "500px" } }}/>
              </FormControl>
            </Stack>
            <Stack direction={"row"} paddingTop={2} spacing={3}>
              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="name"
                  label="SOLICITUD REALIZADA POR"
                />
                <StyledInput id="name" sx={{ "& .MuiInputBase-input": { width: "500px" } }}/>
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="nit"
                  label="CLAVE DE APROBACION DE NOTA DE ENTREGA"
                />
                <StyledInput id="nit" sx={{ "& .MuiInputBase-input": { width: "500px" } }}/>
              </FormControl>
            </Stack>
          </Stack>

          <FormControl variant="standard">
            <StyledInputLabel
              htmlFor="direction"
              label="OBSERVACIONES IMPORTANTES"
            />
            <StyledInput
              id="direction"
              sx={{ "& .MuiInputBase-input": { width: "1038px" } }}
            />
          </FormControl>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#27749C",
            borderRadius: 20,
            fontWeight: 500,
            px: 4,
            py: 1.5,
            mt: "30px !important",
          }}
        >
          Generar
        </Button>
      </Stack>
    </form>
  );
}
