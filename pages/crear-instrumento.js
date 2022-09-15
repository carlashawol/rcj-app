import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AddInstrumentForm from "../components/AddInstrumentForm";
import useClients from "./../hooks/useClients";
import useSpecification from "./../hooks/useSpecifications";
import React, {useState, useEffect} from "react";

export default function createInstrument() {
  const { getClients } = useClients();
  const { getSpecifications } = useSpecification();
  const [clients, setClients] = useState([]);
  const [specifications, setSpecifications] = useState([]);


  useEffect(() => {
    const getClientsResponse = async () => {
      const apiResponse = await getClients();
      if (!apiResponse.error && apiResponse.data) {
        setClients(apiResponse.data)
      }
    };
    getClientsResponse();
  }, [getClients, setClients]);


  useEffect(() => {
    const getSpecificationResponse = async () => {
      const apiResponse = await getSpecifications();
      if (!apiResponse.error && apiResponse.data) {
        setSpecifications(apiResponse.data)
      }
    };
    getSpecificationResponse();
  }, [getSpecifications, setSpecifications]);


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Box
        className={utilStyles.formsHeading}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack justifyContent="center" alignItems="center">
          <HomeRepairServiceIcon sx={{ color: "white", fontSize: "100px" }} />
          <Typography variant="h5" color="white">
            Crear Instrumento
          </Typography>
        </Stack>
      </Box>

      <AddInstrumentForm clients={clients} specifications={specifications}/>
    </Layout>
  );
}
