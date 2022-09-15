import {
  Typography,
  Box,
  Stack,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  FormHelperText,
  Select,
  OutlinedInput,
  MenuItem,
} from "@mui/material";
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import StyledSelect from "./StyledSelect";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useItemReceptionReport from "../hooks/useItemReceptionReport";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function ItemReceptionForm({
  onHandleGenerate,
  instrumentsData,
  offersData,
}) {
  const schema = yup.object({
    instrument: yup.string().required("Este campo es requerido"),
    order_number: yup.string().required("Este campo es requerido"),
    request_created_by: yup.string().required("Este campo es requerido"),
    unique_id: yup.string().required("Este campo es requerido"),
    good_physical_state: yup.string().required("Este campo es requerido"),
    good_operative_state: yup.string().required("Este campo es requerido"),
    operation_manual: yup.string().required("Este campo es requerido"),
    secure_image_url: yup.string(),
    responsible_entering_item: yup.string().required("Este campo es requerido"),
    responsible_receiving_item: yup
      .string()
      .required("Este campo es requerido"),
    item_reception_date: yup.string().required("Este campo es requerido"),
    offerId: yup.number().required().typeError("Este campo es requerido"),
    observations: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [dateReception, setDateReception] = React.useState(
    dayjs("2022-08-18T21:11:54")
  );
  const { createItemReport } = useItemReceptionReport();
  const [imageDta, setImageDta] = useState();
  const [clientName, setClientName] = useState("");
  const [filteredOffer, setFilteredOffer] = useState([]);

  const handleDateReception = (newValue) => {
    setDateReception(newValue);
  };

  const handleGenerateItemReception = async (values) => {
    console.log(values);

    let image_url = "";

    if (imageDta) {
      const formData = new FormData();

      for (const file of imageDta.files) {
        formData.append("file", file);
      }

      formData.append("upload_preset", "pnn9konm-my-uploads");

      const itemImage = await fetch(
        "https://api.cloudinary.com/v1_1/dkqgxm2vu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      if (itemImage.secure_url) {
        image_url = itemImage.secure_url;
      }
    }

    const instrumentDta = JSON.parse(values.instrument);

    const itemReceptionDTO = {
      instrument_id: instrumentDta.id,
      specification_name: instrumentDta.name,
      order_number: values.order_number,
      request_created_by: values.request_created_by,
      unique_id: values.unique_id,
      item_reception_date: values.item_reception_date,
      secure_image_url: image_url,
      responsible_entering_item: values.responsible_entering_item,
      responsible_receiving_item: values.responsible_receiving_item,
      good_physical_state: values.good_physical_state,
      good_operative_state: values.good_operative_state,
      operation_manual: values.operation_manual,
      observations: values.observations,
      client_name: clientName,
      offer_id: values.offerId
    };

    const apiResponse = await createItemReport(itemReceptionDTO);

    if (!apiResponse.error && apiResponse.data) {
      reset();
      if (apiResponse.data.id) {
        const reportPDFGenerationDTO = {
          id: apiResponse.data.id,
          instrument: instrumentDta,
          order_number: values.order_number,
          request_created_by: values.request_created_by,
          secure_image_url: image_url,
          unique_id: values.unique_id,
          good_physical_state: values.good_physical_state,
          good_operative_state: values.good_operative_state,
          item_reception_date: values.item_reception_date,
          responsible_entering_item: values.responsible_entering_item,
          responsible_receiving_item: values.responsible_receiving_item,
          operation_manual: values.operation_manual,
          observations: values.observations,
        };
        onHandleGenerate(true, reportPDFGenerationDTO);
      }
    } else {
      console.log("there was an error");
    }
  };

  useEffect(() => {
    const filteredOfferData = offersData.filter(
      (offer) => offer.client_name === clientName
    );

    setFilteredOffer(filteredOfferData);

    console.log(filteredOfferData);
  }, [clientName, offersData]);

  console.log(filteredOffer);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      padding={4}
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(handleGenerateItemReception)}
    >
      <Stack justifyContent="center" spacing={4} pt={5}>
        <Stack direction={"row"} spacing={3} alignItems="flex-end">
          <FormControl>
            <InputLabel
              shrink={true}
              id="instrument"
              sx={{
                color: "#42A0CE",
                fontWeight: 700,
                fontSize: "1.125rem",
              }}
              error={!!errors["instrument"]}
            >
              INSTRUMENTO
            </InputLabel>
            <Select
              id="instrument"
              labelId="instrument"
              label="INSTRUMENTO"
              {...register("instrument")}
              input={
                <OutlinedInput
                  sx={{
                    width: 514,
                    height: 48,
                    border: "1px solid #ced4da",
                    borderRadius: 5,
                    marginTop: 2.5,
                    bgcolor: "white",
                  }}
                />
              }
            >
              {instrumentsData.map((data) => (
                <MenuItem
                  key={data.id}
                  onClick={() => {
                    setClientName(data.client_name);
                  }}
                  value={JSON.stringify({
                    id: data.id,
                    name: data.specification_name,
                    client: data.client_name,
                    serial: data.serial,
                    sensor_type: data.sensor_type,
                    sensor_serial: data.sensor_serial,
                  })}
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
                  ID: {data.id} --- {data.specification_name} --- {data.client_name}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["instrument"] ? errors["instrument"].message : ""}
            </FormHelperText>
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel
              htmlFor="image"
              label="FOTO DEL INSTRUMENTO (OPCIONAL)"
            />
            <StyledInput
              id="image"
              inputProps={{ accept: "image/*" }}
              type="file"
              sx={{ "& .MuiInputBase-input": { width: "500px" } }}
              onChange={(event) => {
                setImageDta(event.target);
              }}
            />
          </FormControl>
        </Stack>

        <Stack>
          <Stack direction={"row"} spacing={3}>
            <FormControl variant="standard" error={!!errors["order_number"]}>
              <StyledInputLabel
                htmlFor="nit"
                label="N° ORDEN DE COMPRA DEL CLIENTE"
              />
              <StyledInput
                id="nit"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                {...register("order_number")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["order_number"] ? errors["order_number"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              variant="standard"
              error={!!errors["request_created_by"]}
            >
              <StyledInputLabel htmlFor="name" label="REPORTE REALIZADO POR" />
              <StyledInput
                id="name"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                {...register("request_created_by")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["request_created_by"]
                  ? errors["request_created_by"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>

        <Stack>
          <Stack direction={"row"} spacing={3}>
            <FormControl>
              <InputLabel
                shrink={true}
                id="unique_id"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
                error={!!errors["unique_id"]}
              >
                Tiene indentifiación única?
              </InputLabel>
              <Select
                id="unique_id"
                labelId="unique_id"
                label="Tiene indentifiación única?"
                displayEmpty
                {...register("unique_id")}
                input={
                  <OutlinedInput
                    sx={{
                      width: 230,
                      height: 48,
                      border: "1px solid #ced4da",
                      borderRadius: 5,
                      marginTop: 2.5,
                      bgcolor: "white",
                    }}
                  />
                }
              >
                <MenuItem
                  value="Si"
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
                  Sí
                </MenuItem>
                <MenuItem
                  value="No"
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
                  No
                </MenuItem>
              </Select>

              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["unique_id"] ? errors["unique_id"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel
                shrink={true}
                id="good_physical_state"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
                error={!!errors["good_physical_state"]}
              >
                Está en buen estado físico?
              </InputLabel>
              <Select
                id="good_physical_state"
                labelId="good_physical_state"
                label="Está en buen estado físico?"
                displayEmpty
                {...register("good_physical_state")}
                input={
                  <OutlinedInput
                    sx={{
                      width: 240,
                      height: 48,
                      border: "1px solid #ced4da",
                      borderRadius: 5,
                      marginTop: 2.5,
                      bgcolor: "white",
                    }}
                  />
                }
              >
                <MenuItem
                  value="Si"
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
                  Sí
                </MenuItem>
                <MenuItem
                  value="No"
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
                  No
                </MenuItem>
              </Select>

              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["good_physical_state"]
                  ? errors["good_physical_state"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel
                shrink={true}
                id="good_operative_state"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
                error={!!errors["good_operative_state"]}
              >
                Está en buen estado operativo?
              </InputLabel>
              <Select
                id="good_operative_state"
                labelId="good_operative_state"
                label="Está en buen estado operativo?"
                displayEmpty
                {...register("good_operative_state")}
                input={
                  <OutlinedInput
                    sx={{
                      width: 260,
                      height: 48,
                      border: "1px solid #ced4da",
                      borderRadius: 5,
                      marginTop: 2.5,
                      bgcolor: "white",
                    }}
                  />
                }
              >
                <MenuItem
                  value="Si"
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
                  Sí
                </MenuItem>
                <MenuItem
                  value="No"
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
                  No
                </MenuItem>
              </Select>

              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["good_operative_state"]
                  ? errors["good_operative_state"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel
                shrink={true}
                id="operation_manual"
                sx={{
                  color: "#42A0CE",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                }}
                error={!!errors["operation_manual"]}
              >
                Tiene manual de operaciones?
              </InputLabel>
              <Select
                id="operation_manual"
                labelId="operation_manual"
                label="Tiene manual de operaciones?"
                displayEmpty
                {...register("operation_manual")}
                input={
                  <OutlinedInput
                    sx={{
                      width: 250,
                      height: 48,
                      border: "1px solid #ced4da",
                      borderRadius: 5,
                      marginTop: 2.5,
                      bgcolor: "white",
                    }}
                  />
                }
              >
                <MenuItem
                  value="Si"
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
                  Sí
                </MenuItem>
                <MenuItem
                  value="No"
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
                  No
                </MenuItem>
              </Select>

              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["operation_manual"]
                  ? errors["operation_manual"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>

        <Stack>
          <Stack direction={"row"} spacing={3}>
            <FormControl
              variant="standard"
              error={!!errors["responsible_entering_item"]}
            >
              <StyledInputLabel
                htmlFor="responsible_entering_item"
                label="PERSONA ENCARGADA DE ENTREGAR EL ÍTEM"
              />
              <StyledInput
                id="responsible_entering_item"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                {...register("responsible_entering_item")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["responsible_entering_item"]
                  ? errors["responsible_entering_item"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl
              variant="standard"
              error={!!errors["responsible_receiving_item"]}
            >
              <StyledInputLabel
                htmlFor="responsible_receiving_item"
                label="PERSONA ENCARGADA DE RECIBIR EL ÍTEM"
              />
              <StyledInput
                id="responsible_receiving_item"
                sx={{ "& .MuiInputBase-input": { width: "500px" } }}
                {...register("responsible_receiving_item")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["responsible_receiving_item"]
                  ? errors["responsible_receiving_item"].message
                  : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={3} alignItems="flex-end">
          <FormControl variant="standard">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                shrink={true}
                inputFormat="MM/DD/YYYY"
                value={dateReception}
                onChange={handleDateReception}
                renderInput={(params) => (
                  <>
                    <StyledInputLabel
                      htmlFor="item_reception_date"
                      label="FECHA DE RECEPCIÓN DEL ITEM"
                    />
                    <TextField
                      {...params}
                      id="item_reception_date"
                      {...register("item_reception_date")}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 20,
                          backgroundColor: "white",
                          border: "1px solid #ced4da",
                          color: "black",
                          width: "515px",
                          height: "48px",
                          fontSize: "1rem",
                          marginTop: 3.2,
                          "&:focus": {
                            borderColor: "#42A0CE",
                          },
                        },
                      }}
                    />
                  </>
                )}
              />
            </LocalizationProvider>
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["item_reception_date"]
                ? errors["item_reception_date"].message
                : ""}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel
              shrink={true}
              id="offerId"
              sx={{
                color: "#42A0CE",
                fontWeight: 700,
                fontSize: "1.125rem",
              }}
              error={!!errors["offerId"]}
            >
              OFERTA DE SERVICIO ASOCIADA
            </InputLabel>
            <Select
              id="offerId"
              labelId="offerId"
              label="INSTRUMENTO"
              {...register("offerId")}
              input={
                <OutlinedInput
                  sx={{
                    width: 514,
                    height: 48,
                    border: "1px solid #ced4da",
                    borderRadius: 5,
                    marginTop: 2.5,
                    bgcolor: "white",
                  }}
                />
              }
            >
              {filteredOffer.map((data) => (
                <MenuItem
                  key={data.id}
                  value={data.id}
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
                  N° de Solicitud: {data.id} --- Cliente: {data.client_name}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["offerId"] ? errors["offerId"].message : ""}
            </FormHelperText>
          </FormControl>
        </Stack>

        <FormControl variant="standard" error={!!errors["observations"]}>
          <StyledInputLabel
            htmlFor="observations"
            label="OBSERVACIONES / ANOMALÍAS"
          />
          <StyledInput
            id="observations"
            sx={{ "& .MuiInputBase-input": { width: "1038px" } }}
            {...register("observations")}
          />

          <FormHelperText sx={{ color: "#D32F2F" }}>
            {errors["observations"] ? errors["observations"].message : ""}
          </FormHelperText>
        </FormControl>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        sx={{
          alignSelf: "end",
          backgroundColor: "#27749C",
          borderRadius: 20,
          fontWeight: 500,
          px: 4,
          py: 1.5,
          mt: "30px !important",
          mr: 35
        }}
      >
        Generar Reporte de recepción de Item
      </Button>
    </Stack>
  );
}
