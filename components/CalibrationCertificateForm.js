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

export default function ServiceOfferForm() {
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
              <StyledInputLabel htmlFor="name" label="CERTIFICADO N" />
              <StyledInput id="name" />
            </FormControl>

            <FormControl variant="standard">
              <StyledSelect
                title="TIPO DE CALIBRACIÓN"
                data={payment_method}
                size="340px"
              />
            </FormControl>

            <FormControl variant="standard">
              <StyledSelect
                title="ESTATUS DE LA ACTIVIDAD"
                data={payment_method}
                size="330px"
              />
            </FormControl>
          </Stack>
          <Stack direction={"row"} paddingTop={2} spacing={5}>
            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="name"
                label="FECHA DE RECEPCIÓN DEL ITEM"
              />
              <StyledInput id="name" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="nit"
                label="FECHA CALIBRACIÓN O ACTIVIDAD"
              />
              <StyledInput id="nit" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="rif"
                label="FECHA DE EMISIÓN DEL CERTIFICADO"
              />
              <StyledInput id="rif" />
            </FormControl>
          </Stack>

          <Stack direction={"row"} paddingTop={2} spacing={5}>
            <FormControl variant="standard">
              <StyledSelect
                title="NOMBRE CLIENTE"
                data={payment_method}
                size="340px"
              />
            </FormControl>

            <FormControl variant="standard">
              <StyledSelect title="MODELO" data={payment_method} size="330px" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="name" label="SERIAL" />
              <StyledInput id="name" />
            </FormControl>
          </Stack>
          <Stack direction={"row"} paddingTop={2} spacing={5}>
            <FormControl variant="standard">
              <StyledInputLabel htmlFor="name" label="CÓDIGO INTERNO" />
              <StyledInput id="name" />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="nit" label="PLACA INVENTARIO" />
              <StyledInput id="nit" />
            </FormControl>

            <FormControl variant="standard">
              <StyledSelect
                title="TIPO DE SENSOR"
                data={payment_method}
                size="330px"
              />
            </FormControl>
          </Stack>
          <Stack direction={"row"} paddingTop={2} spacing={3}>
            <FormControl variant="standard">
              <StyledInputLabel htmlFor="name" label="SERIAL SENSOR" />
              <StyledInput
                id="name"
                sx={{ "& .MuiInputBase-input": { width: "550px" } }}
              />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="nit" label="UBICACIÓN DE ITEM" />
              <StyledInput
                id="nit"
                sx={{ "& .MuiInputBase-input": { width: "550px" } }}
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
                <StyledInputLabel htmlFor="direction" label="NOMBRE" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "240px" } }}
                />
              </FormControl>
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="MARCA" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="MODELO" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="direction"
                  label="TIPO DE INSTRUMENTO"
                />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                />
              </FormControl>
            </Stack>

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
            <Stack direction={"row"} spacing={3}>
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="REPETIBILIDAD" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "240px" } }}
                />
              </FormControl>
              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="direction"
                  label="COEF DE TEMPERATURA"
                />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="SENSIBILIDAD" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="LINEALIDAD" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            paddingTop={2}
            justifyContent="space-between"
          >
            <FormControl variant="standard">
              <StyledInputLabel htmlFor="email" label="COMENTARIOS" />
              <StyledInput
                id="email"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
              />
            </FormControl>
            <FormControl variant="standard">
              <StyledSelect
                title="LUGAR DE LA CALIBRACIÓN"
                data={payment_method}
                size="550px"
              />
            </FormControl>
          </Stack>
          <Stack>
            <Stack direction={"row"} paddingTop={2} spacing={3}>
              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="name"
                  label="CALIBRACION REALIZADA POR"
                />
                <StyledInput
                  id="name"
                  sx={{ "& .MuiInputBase-input": { width: "550px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel
                  htmlFor="nit"
                  label="CALIBRACION APROBADA POR"
                />
                <StyledInput
                  id="nit"
                  sx={{ "& .MuiInputBase-input": { width: "550px" } }}
                />
              </FormControl>
            </Stack>
          </Stack>
          <FormControl variant="standard">
            <StyledInputLabel
              htmlFor="direction"
              label="DIRECCIÓN DONDE DE EFECTUO LA CALIBRACIÓN"
            />
            <StyledInput
              id="direction"
              sx={{ "& .MuiInputBase-input": { width: "1080px" } }}
            />
          </FormControl>
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
          Generar
        </Button>
      </Box>
    </form>
  );
}
