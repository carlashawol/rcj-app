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
import Image from "next/image";
import Images from "../public/images/images.png"

export default function AddInstrumentForm() {
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
        <Stack justifyContent="center" alignItems="flex-end" spacing={4} pt={5}>

          <Stack direction={"row"} justifyContent="center" alignItems={"center"} spacing={2}>
            <Image src={Images} width={540} height={150}/>
          
          <FormControl variant="standard">
            <StyledSelect
              title="NOMBRE CLIENTE"
              data={payment_method}
              size="514px"
            />
          </FormControl>

          </Stack>

          <Stack spacing={3}>
            <Stack direction={"row"} spacing={3}>
              <FormControl variant="standard">
                <StyledSelect
                  title="ESTATUS OPERATIVO"
                  data={payment_method}
                  size="514px"
                />
              </FormControl>
              <FormControl variant="standard">
                <StyledSelect
                  title="ESTATUS METROLÓGICO"
                  data={payment_method}
                  size="514px"
                />
              </FormControl>
            </Stack>
            <Stack direction={"row"} paddingTop={2} spacing={3}>
              <FormControl variant="standard">
                <StyledSelect
                  title="MARCA Y MODELO DEL INSTRUMENTO"
                  data={payment_method}
                  size="514px"
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#27749C",
                  borderRadius: 20,
                  fontWeight: 500,
                  px: 17,
                  py: 1.5,
                  mt: "22px !important",
                }}
              >
                CREAR UNA ESPECIFICACIÓN
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction={"row"} paddingTop={4} spacing={5}>
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="name" label="SERIAL" />
            <StyledInput id="name" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="nit" label="PLACA INVETARIO" />
            <StyledInput id="nit" />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel
              htmlFor="direction"
              label="FRECUENCIA CALIBRACIÓN"
            />

            <StyledInput
              id="direction"
              sx={{ "& .MuiInputBase-input": { width: "285px" } }}
              endAdornment={
                <InputAdornment>
                  <Typography
                    fontSize={18}
                    fontWeight={500}
                    ml={-6}
                    mt={1}
                    zIndex={3}
                  >
                    Dias
                  </Typography>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} paddingTop={3} spacing={5}>
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="name" label="CÓDIGO INTERNO" />
            <StyledInput id="name" />
          </FormControl>

          <FormControl variant="standard">
            <StyledSelect
              title="TIPO SENSOR"
              data={payment_method}
              size="340px"
            />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel
              htmlFor="direction"
              label="FRECUENCIA MANTENIMIENTO"
            />

            <StyledInput
              id="direction"
              sx={{ "& .MuiInputBase-input": { width: "285px" } }}
              endAdornment={
                <InputAdornment>
                  <Typography
                    fontSize={18}
                    fontWeight={500}
                    ml={-6}
                    mt={1}
                    zIndex={3}
                  >
                    Dias
                  </Typography>
                </InputAdornment>
              }
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} paddingTop={4} spacing={3}>
          <FormControl variant="standard">
            <StyledInputLabel htmlFor="name" label="SERIAL DEL SENSOR" />
            <StyledInput
              id="name"
              sx={{ "& .MuiInputBase-input": { width: "500px" } }}
            />
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="nit" label="UBICACION DEL SENSOR" />
            <StyledInput
              id="nit"
              sx={{ "& .MuiInputBase-input": { width: "500px" } }}
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
          Guardar
        </Button>
      </Box>
    </form>
  );
}
