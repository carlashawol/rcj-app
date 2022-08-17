import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import { Typography, Box, Stack } from "@mui/material";
import DocumentScannerRoundedIcon from "@mui/icons-material/DocumentScannerRounded";
import CalibrationCertificateForm from "../components/CalibrationCertificateForm";

export default function createCalibrationCertificate() {
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
          <DocumentScannerRoundedIcon sx={{ color: "white", fontSize: "100px" }} />
          <Typography variant="h5" color="white">
            Generar Certificado de calibración
          </Typography>
        </Stack>
      </Box>

      <CalibrationCertificateForm />
    </Layout>
  );
}
