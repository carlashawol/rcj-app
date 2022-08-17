import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import AddInstrumentForm from "../components/AddInstrumentForm";

export default function createInstrument() {
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

      <AddInstrumentForm />
    </Layout>
  );
}
