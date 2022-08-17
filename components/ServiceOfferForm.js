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

export default function ServiceOfferForm({onHandleGenerate}) {
  const payment_method = ["Joan Rendon", "Carla Baliero", "Verónica Baliero"];

  return (
    <form>
      <Stack justifyContent="center" pt={5} alignItems="center" pb={5}>
        <Stack spacing={4} maxWidth={1090}>
          <Stack direction={"row"} paddingTop={2} spacing={3}>
            <FormControl variant="standard">
              <StyledSelect
                title="NOMBRE DEL CLIENTE"
                data={payment_method}
                size="350px"
              />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="nit" label="MONEDA OFERTA" />
              <StyledInput id="nit" />
            </FormControl>

            <FormControl variant="standard">
              <StyledSelect
                title="ORIGEN DE LOS PRECIOS"
                data={payment_method}
                size="350px"
              />
            </FormControl>
          </Stack>

          <Stack
            direction={"row"}
            paddingTop={2}
            justifyContent="space-between"
          >
            <FormControl variant="standard">
              <StyledSelect
                title="OFERTA ELABORADA POR"
                data={payment_method}
                size="500px"
              />
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="email" label="CLAVE VALIDACIÓN DE FIRMA" />
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
          >
            <Stack direction={"row"} justifyContent="space-between" width="85%">
              <FormControl variant="standard">
                <StyledSelect
                  title="FECHA DE RECEPCIÓN"
                  data={payment_method}
                  size="415px"
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledSelect
                  title="FECHA DE LA OFERTA"
                  data={payment_method}
                  size="415px"
                />
              </FormControl>
            </Stack>

            <Stack direction={"row"} justifyContent="space-between" width="85%">
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="GARATÍA" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="VALIDEZ DE LA OFERTA" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "400px" } }}
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

            <Stack direction={"row"} justifyContent="space-between" width="85%">
              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="DISPONIBILIDAD" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "400px" } }}
                />
              </FormControl>

              <FormControl variant="standard">
                <StyledInputLabel htmlFor="direction" label="TIEMPO DE CERTIFICADO" />
                <StyledInput
                  id="direction"
                  sx={{ "& .MuiInputBase-input": { width: "400px" } }}
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

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="direction" label="MONTO DE VIATICOS" />
              <StyledInput
                id="direction"
                sx={{ "& .MuiInputBase-input": { width: "400px" } }}
              />
            </FormControl>
          </Stack>

          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack spacing={3}>
              <Stack direction={"row"} spacing={3}>
                <FormControl variant="standard">
                  <StyledSelect
                    title="FECHA DE RECEPCIÓN DE LA OFERTA"
                    data={payment_method}
                    size="515px"
                  />
                </FormControl>

                <FormControl variant="standard">
                  <StyledSelect
                    title="FECHA PLANIFICADA DE RECEPCIÓN DEL ITEM"
                    data={payment_method}
                    size="515px"
                  />
                </FormControl>
              </Stack>
              <Typography
                sx={{
                  color: "gray",
                  fontWeight: 700,
                  fontSize: "16px",
                  paddingLeft: "5px",
                }}
              >
                Periodo de análisis de las encuestas
              </Typography>

              <Stack direction={"row"} spacing={3}>
                <FormControl variant="standard">
                  <StyledInputLabel htmlFor="email" label="INICIO" />
                  <StyledInput
                    id="email"
                    sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                  />
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel htmlFor="email" label="FINAL" />
                  <StyledInput
                    id="email"
                    sx={{ "& .MuiInputBase-input": { width: "230px" } }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>

      <Box display={"flex"} justifyContent="right" mr={40}>
        <Button
          onClick={()=>{
            onHandleGenerate(true)
            console.log("lo hice")
          }}
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