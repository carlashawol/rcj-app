import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ItemReceptionForm from "../components/ItemReceptionForm";

export default function createItemReception() {
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
          <ConstructionRoundedIcon sx={{ color: "white", fontSize: "100px" }} />
          <Typography variant="h5" color="white">
            Generar expediente de recepción de ítems
          </Typography>
        </Stack>
      </Box>

      <ItemReceptionForm />
    </Layout>
  );
}
