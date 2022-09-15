import {
  Typography,
  Box,
  Stack,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Input,
  LinearProgress,
  FormHelperText,
  IconButton,
} from "@mui/material";
import StyledInputLabel from "./StyledInputLabel";
import StyledInput from "./StyledInput";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useOffers from "../hooks/useOffers";
import CloseIcon from "@mui/icons-material/Close";

export default function ServiceOfferForm({
  onHandleGenerate,
  clientsData,
  activities,
}) {
  const users = [
    { name: "Joan Rendon", charge: "Superintendente" },
    { name: "Carla Baliero", charge: "Gerente de Operaciones" },
    { name: "Verónica Baliero", charge: "Gerente de Operaciones" },
  ];

  const { createOffer } = useOffers();

  const [activityList, setActivityList] = useState(["actividad"]);
  const [dateReception, setDateReception] = React.useState(
    dayjs("2022-08-18T21:11:54")
  );
  const [offerDate, setOfferDate] = React.useState(
    dayjs("2022-08-18T21:11:54")
  );
  const [offerDateReception, setOfferDateReception] = React.useState(
    dayjs("2022-08-18T21:11:54")
  );
  const [dateItemReception, setDateItemReception] = React.useState(
    dayjs("2022-08-18T21:11:54")
  );

  const schema = yup.object({
    client_name: yup.string().required("Este campo es requerido"),
    coin: yup.string().required("Este campo es requerido"),
    offer_created_by: yup.string().required("Este campo es requerido"),
    date_reception: yup.string().required("Este campo es requerido"),
    offer_date: yup.string().required("Este campo es requerido"),
    warranty: yup.string().required("Este campo es requerido"),
    validity: yup
      .number()
      .required("Este campo es requerido")
      .moreThan(
        -1,
        "En este campo se debe ingresar un número mayor o igual que 0"
      )
      .integer()
      .typeError("En este campo se debe ingresar un número"),
    disponibility: yup.string().required("Este campo es requerido"),
    certificate_time: yup
      .number()
      .required("Este campo es requerido")
      .moreThan(
        -1,
        "En este campo se debe ingresar un número mayor o igual que 0"
      )
      .integer()
      .typeError("En este campo se debe ingresar un número"),
    travelers: yup
      .number()
      .required("Este campo es requerido")
      .moreThan(
        -1,
        "En este campo se debe ingresar un número mayor o igual que 0"
      )
      .integer()
      .typeError("En este campo se debe ingresar un número"),
    date_offer_reception: yup.string().required("Este campo es requerido"),
    date_item_reception: yup.string().required("Este campo es requerido"),
    activities: yup.array().of(
      yup.object().shape({
        service_type: yup.string().required("Este campo es requerido"),
        brand: yup.string().required("Este campo es requerido"),
        model: yup.string().required("Este campo es requerido"),
        serial: yup.string().required("Este campo es requerido"),
        code: yup.string().required("Este campo es requerido"),
        place: yup.string().required("Este campo es requerido"),
        price: yup
          .number()
          .required("Este campo es requerido")
          .positive()
          .typeError("En este campo se debe ingresar un número"),
        quantity: yup
          .number()
          .required("Este campo es requerido")
          .positive()
          .typeError("En este campo se debe ingresar un número"),
        start_range: yup
          .number()
          .required("Este campo es requerido")
          .moreThan(
            -1,
            "En este campo se debe ingresar un número mayor o igual que 0"
          )
          .typeError("En este campo se debe ingresar un número"),
        end_range: yup
          .number()
          .required("Este campo es requerido")
          .moreThan(
            -1,
            "En este campo se debe ingresar un número mayor o igual que 0"
          )
          .typeError("En este campo se debe ingresar un número"),
        unity: yup.string().required("Este campo es requerido"),
        conformity: yup.string().required("Este campo es requerido"),
        status: yup.string().required("Este campo es requerido"),
        client_requirements: yup.string(),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleDateReception = (newValue) => {
    setDateReception(newValue);
  };

  const handleOfferDate = (newValue) => {
    setOfferDate(newValue);
  };
  const handleOfferDateReception = (newValue) => {
    setOfferDateReception(newValue);
  };
  const handleDateItemReception = (newValue) => {
    setDateItemReception(newValue);
  };

  const handleGenerateServiceOffer = async (values) => {
    const client = JSON.parse(values.client_name);
    const responsable = JSON.parse(values.offer_created_by);

    const offerCreationDTO = {
      client_name: client.name,
      coin: values.coin,
      offer_created_by: responsable.name,
      reception_date: values.date_reception,
      offer_date: values.offer_date,
      warranty: values.warranty,
      offer_validity: values.validity,
      availability: values.disponibility,
      time_certificate: values.certificate_time,
      viatics: values.travelers,
      offer_reception_date: values.date_offer_reception,
      planned_reception_date: values.date_item_reception,
    };

    const apiResponse = await createOffer(offerCreationDTO);
    console.log("api response",apiResponse);
    if (!apiResponse.error && apiResponse.data) {
      if (apiResponse.data.id) {
        reset();
        setActivityList(["actividad"]);
        const activitiesPdfDTO = values.activities.map((activity) => {
          const serviceData = JSON.parse(activity.service_type);
          return { ...activity, service_type: serviceData };
        });

        console.log("activitues",activitiesPdfDTO)

        const offePDFGenerationDTO = {
          id: apiResponse.data.id,
          client_name: client,
          coin: values.coin,
          offer_created_by: responsable,
          date_reception: values.date_reception,
          offer_date: values.offer_date,
          warranty: values.warranty,
          validity: values.validity,
          disponibility: values.disponibility,
          certificate_time: values.certificate_time,
          travelers: values.travelers,
          date_offer_reception: values.date_offer_reception,
          date_item_reception: values.date_item_reception,
          activities: activitiesPdfDTO,
        };
        console.log("pdf", offePDFGenerationDTO)
        onHandleGenerate(true, offePDFGenerationDTO);
      }
    } else {
      console.log("there was an error");
    }
  };

  return (
    <Stack
      py={6}
      pl={11}
      component="form"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(handleGenerateServiceOffer)}
    >
      <Stack spacing={4} maxWidth={1500}>
        <Stack
          direction={"row"}
          paddingTop={2}
          spacing={3}
          alignItems="flex-end"
          justifyContent={"center"}
        >
          <FormControl
            sx={{
              marginTop: "8px",
            }}
          >
            <InputLabel
              shrink={true}
              id="client_name"
              sx={{
                color: "#42A0CE",
                fontWeight: 700,
                fontSize: "1.125rem",
              }}
            >
              NOMBRE DEL CLIENTE
            </InputLabel>
            <Select
              id="client_name"
              labelId="client_name"
              label="NOMBRE DEL CLIENTE"
              displayEmpty
              {...register("client_name")}
              input={
                <OutlinedInput
                  sx={{
                    width: 350,
                    height: 48,
                    border: "1px solid #ced4da",
                    borderRadius: 5,
                    marginTop: 2.5,
                    bgcolor: "white",
                  }}
                />
              }
            >
              {clientsData.map((data) => (
                <MenuItem
                  key={data.id}
                  value={JSON.stringify({
                    name: data.name,
                    country: data.country,
                    nit: data.nit,
                    rif: data.rif,
                    address: data.address,
                    city: data.city,
                    department: data.department,
                    contact: data.contact,
                    telephone: data.telephone,
                    cellphone: data.cellphone,
                    email: data.email,
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
                  {data.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["client_name"] ? errors["client_name"].message : ""}
            </FormHelperText>
          </FormControl>

          <FormControl variant="standard">
            <StyledInputLabel htmlFor="coin" label="MONEDA OFERTA" />
            <StyledInput id="coin" {...register("coin")} />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["coin"] ? errors["coin"].message : ""}
            </FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel
              shrink={true}
              id="offer_created_by"
              sx={{
                color: "#42A0CE",
                fontWeight: 700,
                fontSize: "1.125rem",
              }}
            >
              OFERTA ELABORADA POR
            </InputLabel>
            <Select
              id="offer_created_by"
              labelId="offer_created_by"
              label="OFERTA ELABORADA POR"
              displayEmpty
              {...register("offer_created_by")}
              input={
                <OutlinedInput
                  sx={{
                    width: 350,
                    height: 48,
                    border: "1px solid #ced4da",
                    borderRadius: 5,
                    marginTop: 2.5,
                    bgcolor: "white",
                  }}
                />
              }
            >
              {users.map((data) => (
                <MenuItem
                  key={data.id}
                  value={JSON.stringify({
                    name: data.name,
                    charge: data.charge,
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
                  {data.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {errors["offer_created_by"]
                ? errors["offer_created_by"].message
                : ""}
            </FormHelperText>
          </FormControl>
        </Stack>

        <Stack bgcolor={"#DDF2F9"} p={3} borderRadius={10} spacing={3}>
          <Stack
            direction={"row"}
            spacing={3}
            alignItems="flex-end"
            justifyContent="center"
          >
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
                        htmlFor="date_reception"
                        label="FECHA DE RECEPCIÓN"
                      />
                      <TextField
                        {...params}
                        id="date_reception"
                        {...register("date_reception")}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 20,
                            backgroundColor: "white",
                            border: "1px solid #ced4da",
                            color: "black",
                            width: "315px",
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
                {errors["date_reception"]
                  ? errors["date_reception"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  shrink={true}
                  inputFormat="MM/DD/YYYY"
                  value={offerDate}
                  onChange={handleOfferDate}
                  renderInput={(params) => (
                    <>
                      <StyledInputLabel
                        htmlFor="offer_date"
                        label="FECHA DE LA OFERTA"
                      />
                      <TextField
                        {...params}
                        id="offer_date"
                        {...register("offer_date")}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 20,
                            backgroundColor: "white",
                            border: "1px solid #ced4da",
                            color: "black",
                            width: "315px",
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
                {errors["offer_date"] ? errors["offer_date"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="warranty" label="GARANTÍA" />
              <StyledInput
                id="warranty"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("warranty")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["warranty"] ? errors["warranty"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="validity"
                label="VALIDEZ DE LA OFERTA"
              />
              <StyledInput
                id="validity"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("validity")}
                endAdornment={
                  <InputAdornment>
                    <Typography
                      fontSize={18}
                      fontWeight={500}
                      ml={-6}
                      mt={1}
                      zIndex={3}
                    >
                      Días
                    </Typography>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["validity"] ? errors["validity"].message : ""}
              </FormHelperText>
            </FormControl>
          </Stack>

          <Stack direction={"row"} spacing={3} justifyContent="center">
            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="disponibility"
                label="DISPONIBILIDAD"
              />
              <StyledInput
                id="disponibility"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("disponibility")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["disponibility"] ? errors["disponibility"].message : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel
                htmlFor="certificate_time"
                label="TIEMPO DE ENTREGA"
              />
              <StyledInput
                id="certificate_time"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("certificate_time")}
                endAdornment={
                  <InputAdornment>
                    <Typography
                      fontSize={18}
                      fontWeight={500}
                      ml={-6}
                      mt={1}
                      zIndex={3}
                    >
                      Días
                    </Typography>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["certificate_time"]
                  ? errors["certificate_time"].message
                  : ""}
              </FormHelperText>
            </FormControl>

            <FormControl variant="standard">
              <StyledInputLabel htmlFor="travelers" label="MONTO DE VIATICOS" />
              <StyledInput
                id="travelers"
                sx={{ "& .MuiInputBase-input": { width: "300px" } }}
                {...register("travelers")}
              />
              <FormHelperText sx={{ color: "#D32F2F" }}>
                {errors["travelers"] ? errors["travelers"].message : ""}
              </FormHelperText>
            </FormControl>
          </Stack>
        </Stack>

        <Box display="flex" justifyContent={"center"}>
          <Stack spacing={3} justifyContent="center" alignItems={"center"}>
            <Stack
              direction={"row"}
              spacing={3}
              justifyContent="center"
              alignItems={"center"}
            >
              <FormControl variant="standard">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    shrink={true}
                    inputFormat="MM/DD/YYYY"
                    value={offerDateReception}
                    onChange={handleOfferDateReception}
                    renderInput={(params) => (
                      <>
                        <StyledInputLabel
                          htmlFor="date_offer_reception"
                          label="FECHA DE RECEPCIÓN DE LA OFERTA"
                        />
                        <TextField
                          {...params}
                          id="date_offer_reception"
                          {...register("date_offer_reception")}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 20,
                              backgroundColor: "white",
                              border: "1px solid #ced4da",
                              color: "black",
                              width: "415px",
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
                  {errors["date_offer_reception"]
                    ? errors["date_offer_reception"].message
                    : ""}
                </FormHelperText>
              </FormControl>

              <FormControl variant="standard">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    shrink={true}
                    inputFormat="MM/DD/YYYY"
                    value={dateItemReception}
                    onChange={handleDateItemReception}
                    renderInput={(params) => (
                      <>
                        <StyledInputLabel
                          htmlFor="date_item_reception"
                          label="FECHA PLANIFICADA DE RECEPCIÓN DEL ITEM"
                        />
                        <TextField
                          {...params}
                          id="date_item_reception"
                          {...register("date_item_reception")}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 20,
                              backgroundColor: "white",
                              border: "1px solid #ced4da",
                              color: "black",
                              width: "415px",
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
                  {errors["date_item_reception"]
                    ? errors["date_item_reception"].message
                    : ""}
                </FormHelperText>
              </FormControl>
            </Stack>
          </Stack>
        </Box>

        {activityList.map((spec, index) => {
          return (
            <Stack spacing={1} bgcolor={"#DDF2F9"} p={3} borderRadius={10}>
              <Stack direction={"row"} justifyContent="space-between">
                <Typography
                  sx={{
                    color: "#42A0CE",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    marginLeft: "5px",
                  }}
                >
                  ACTIVIDAD {index + 1}
                </Typography>
                {index > 0 && (
                  <IconButton
                    sx={{ color: "gray" }}
                    onClick={() => {
                      setActivityList(
                        activityList.filter((activity, idx) => idx !== index)
                      );
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <FormControl
                  sx={{
                    marginTop: "8px",
                    marginRight: "55px",
                  }}
                >
                  <InputLabel
                    shrink={true}
                    id={`activities.${index}.service_type`}
                    error={!!errors[`activities.${index}.service_type`]}
                    sx={{
                      color: "#42A0CE",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                    }}
                  >
                    TIPO DE ACTIVIDAD
                  </InputLabel>
                  <Select
                    id={`activities.${index}.service_type`}
                    labelId={`activities.${index}.service_type`}
                    label="NOMBRE DEL CLIENTE"
                    displayEmpty
                    {...register(`activities.${index}.service_type`)}
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
                    {activities.map((data) => (
                      <MenuItem
                        key={data.id}
                        value={JSON.stringify({
                          service_type: data.service_type,
                          item: data.item,
                          method: data.method,
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
                        {data.service_type} --- {data.item} --- {data.method}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.service_type`]
                      ? errors[`activities.${index}.service_type`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.brand`}
                    label="MARCA"
                  />
                  <StyledInput
                    id={`activities.${index}.brand`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.brand`)}
                  />

                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.brand`]
                      ? errors[`activities.${index}.brand`].message
                      : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.model`}
                    label="MODELO"
                  />
                  <StyledInput
                    id={`activities.${index}.model`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.model`)}
                  />

                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.model`]
                      ? errors[`activities.${index}.model`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.serial`}
                    label="SERIAL"
                  />
                  <StyledInput
                    id={`activities.${index}.serial`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.serial`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.serial`]
                      ? errors[`activities.${index}.serial`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.code`}
                    label="CÓDIGO"
                  />
                  <StyledInput
                    id={`activities.${index}.code`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.code`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.code`]
                      ? errors[`activities.${index}.code`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.place`}
                    label="LUGAR"
                  />
                  <StyledInput
                    id={`activities.${index}.place`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.place`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.place`]
                      ? errors[`activities.${index}.place`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.price`}
                    label="PRECIO"
                  />
                  <StyledInput
                    id={`activities.${index}.price`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.price`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.price`]
                      ? errors[`activities.${index}.price`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.quantity`}
                    label="CANTIDAD"
                  />
                  <StyledInput
                    id={`activities.${index}.quantity`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.quantity`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.quantity`]
                      ? errors[`activities.${index}.quantity`].message
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Stack>

              <Stack direction={"row"} spacing={1}>
                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.start_range`}
                    label="RANGO INICIO"
                  />
                  <StyledInput
                    id={`activities.${index}.start_range`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.start_range`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.start_range`]
                      ? errors[`activities.${index}.start_range`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.end_range`}
                    label="RANGO FIN"
                  />
                  <StyledInput
                    id={`activities.${index}.end_range`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.end_range`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.end_range`]
                      ? errors[`activities.${index}.end_range`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.unity`}
                    label="UNIDAD"
                  />
                  <StyledInput
                    id={`activities.${index}.unity`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.unity`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.unity`]
                      ? errors[`activities.${index}.unity`].message
                      : ""}
                  </FormHelperText>
                </FormControl>
                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.conformity`}
                    label="CONFORMIDAD"
                  />
                  <StyledInput
                    id={`activities.${index}.conformity`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.conformity`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.conformity`]
                      ? errors[`activities.${index}.conformity`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.status`}
                    label="ESTATUS"
                  />
                  <StyledInput
                    id={`activities.${index}.status`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.status`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.status`]
                      ? errors[`activities.${index}.status`].message
                      : ""}
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <StyledInputLabel
                    htmlFor={`activities.${index}.client_requirements`}
                    label="REQUISITOS DEL CLIENTE"
                  />
                  <StyledInput
                    id={`activities.${index}.client_requirements`}
                    sx={{ "& .MuiInputBase-input": { width: "200px" } }}
                    {...register(`activities.${index}.client_requirements`)}
                  />
                  <FormHelperText sx={{ color: "#D32F2F" }}>
                    {errors[`activities.${index}.client_requirements`]
                      ? errors[`activities.${index}.client_requirements`]
                          .message
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Stack>
            </Stack>
          );
        })}

        <Button
          onClick={() => {
            setActivityList([...activityList, "actividad"]);
          }}
        >
          + Añadir Actividad
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            alignSelf: "flex-end",
            backgroundColor: "#27749C",
            borderRadius: 20,
            fontWeight: 500,
            px: 4,
            py: 1.5,
            mb: "30px !important",
          }}
        >
          GENERAR OFERTA DE SERVICIO
        </Button>
      </Stack>
    </Stack>
  );
}
