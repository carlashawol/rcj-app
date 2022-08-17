import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import EspecificationForm from "../components/EspecificationForm";

export default function addEspecification() {
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
          <DisplaySettingsIcon sx={{ color: "white", fontSize: "100px" }} />
          <Typography variant="h5" color="white">
            Crear Especificación
          </Typography>
        </Stack>
      </Box>

      <EspecificationForm />
    </Layout>
  );
}
