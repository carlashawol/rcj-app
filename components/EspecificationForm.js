import { Box, Stack, Button, FormControl } from "@mui/material";
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import StyledSelect from "./StyledSelect";

export default function EspecificationForm() {
  const payment_method = [
    "Digital",
    "Analógico",
    "Material de Referencia",
    "Patrón Analógico",
    "Patrón Analógico",
    "Equipo de calibración",
  ];
  const payment_method1 = ["g", "G", "Hz", "L", "m", "N"];
  const payment_method2 = ["g", "G", "Hz", "L", "m", "N"];

  return (
    <form>
      <Stack justifyContent="center" pt={5} alignItems="center" pb={5}>
        <Stack spacing={4} maxWidth={1090}>
          <Stack direction={"row"} paddingTop={2} spacing={5}>
            <FormControl variant="standard">
              <StyledInputLabel htmlFor="name" label="NOMBRE" />
              <StyledInput id="name" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="nit" label="MARCA" />
              <StyledInput id="nit" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="rif" label="MODELO" />
              <StyledInput id="rif" />
            </FormControl>
          </Stack>

          <Stack
            direction={"row"}
            paddingTop={2}
            justifyContent="space-between"
          >
            <FormControl variant="standard">
              <StyledSelect
                title="TIPO DE INSTRUMENTO"
                data={payment_method}
                size="450px"
              />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="email" label="CLASE DE EXATITUD" />
              <StyledInput
                id="email"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
              />
            </FormControl>
          </Stack>

          <Stack
            bgcolor={"#DDF2F9"}
            p={3}
            alignItems="center"
            justifyContent={"center"}
            borderRadius={10}
            spacing={3}
            padding={3}
          >
            <Stack direction={"row"} spacing={3}>
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="RANGO INICIO 1" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                />
              </FormControl>
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="RANGO FIN 1" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledSelect
                  title="UNIDAD 1"
                  data={payment_method1}
                  size="125px"
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="RESOLUCIÓN 1" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                />
              </FormControl>
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="VAL DIVISIÓN 1" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="EMP 1" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "120px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledSelect
                  title="UNIDAD"
                  data={payment_method2}
                  size="125px"
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack direction={"row"} paddingTop={2} spacing={3}>
            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="name"
                label="COHEFICIENTE DE TEMPERATURA"
              />
              <StyledInput id="name" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="nit" label="RENTABILIDAD" />
              <StyledInput id="nit" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="rif" label="LINEALIDAD" />
              <StyledInput id="rif" />
            </FormControl>
          </Stack>
          <Stack direction={"row"} paddingTop={2} spacing={3}>
            <FormControl variant="standard">
              <StyledInputLabel htmlFor="name" label="HISTERESIS" />
              <StyledInput id="name" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="nit" label="SENSIBILIDAD" />
              <StyledInput id="nit" />
            </FormControl>

            <FormControl variant="standard">
              <StyledSelect
                title="METODO DE CALIBRACIÓN"
                data={payment_method1}
                size="340px"
              />
            </FormControl>
          </Stack>
        </Stack>
      </Stack>
      <Box display={"flex"} justifyContent="right" mr={20}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#27749C",
            borderRadius: 20,
            fontWeight: 500,
            px: 4,
            py: 1.5,
            mb: "30px !important",
          }}
        >
          Guardar
        </Button>
      </Box>
    </form>
  );
}
