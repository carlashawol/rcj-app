import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FormAddClients from "../components/FormAddClients"

export default function addClient() {
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
          <PersonAddAltIcon sx={{color: "white",  fontSize: "100px"}}/>
          <Typography variant="h5" color="white">
            Agregar un cliente
          </Typography>
        </Stack>
      </Box>

      <FormAddClients/>
    </Layout>
  );
}
