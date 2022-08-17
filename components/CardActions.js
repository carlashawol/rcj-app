import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Stack,
} from "@mui/material";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import DocumentScannerRoundedIcon from "@mui/icons-material/DocumentScannerRounded";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

const CardActions = (props) => {
  return (
    <>
      {props.type === "orderGeneration" && (
        <Card
          sx={{
            maxWidth: 345,
            borderRadius: 4,
            boxShadow: "0px 8px 30px rgba(0, 5, 58, 0.18)",
          }}
        >
          <CardActionArea href="/crear-oferta-servicio">
            <CardContent>
              <Stack justifyContent="center" alignItems="center">
                <InventoryRoundedIcon sx={{ fontSize: 60 }} color="primary" />
                <Typography gutterBottom fontSize={24} align="center" color="gray">
                  Generar una oferta de servicio
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      {props.type === "itemsReception" && (
        <Card
          sx={{
            maxWidth: 345,
            borderRadius: 4,
            boxShadow: "0px 8px 30px rgba(0, 5, 58, 0.18)",
          }}
        >
          <CardActionArea href="/crear-expediente-recepcion">
            <CardContent>
              <Stack justifyContent="center" alignItems="center">
                <ConstructionRoundedIcon
                  sx={{ fontSize: 60 }}
                  color="primary"
                />
                <Typography gutterBottom fontSize={24} align="center" color="gray">
                  Crear un expediente de recepción de Items
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      {props.type === "addClient" && (
        <Card
          sx={{
            minWidth: 345,
            borderRadius: 4,
            boxShadow: "0px 8px 30px rgba(0, 5, 58, 0.18)",
          }}
        >
          <CardActionArea href="/crear-cliente">
            <CardContent>
              <Stack justifyContent="center" alignItems="center">
                <PersonAddAltIcon sx={{ fontSize: 60 }} color="primary" />
                <Typography gutterBottom fontSize={24} align="center" color="gray">
                  Agregar un Cliente
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      {props.type === "addInstrument" && (
        <Card
          sx={{
            minWidth: 345,
            borderRadius: 4,
            boxShadow: "0px 8px 30px rgba(0, 5, 58, 0.18)",
          }}
        >
          <CardActionArea href="/crear-instrumento">
            <CardContent>
              <Stack justifyContent="center" alignItems="center">
                <HomeRepairServiceIcon sx={{ fontSize: 60 }} color="primary" />
                <Typography gutterBottom fontSize={24} align="center" color="gray">
                  Agregar un Instrumento
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      {props.type === "addEspecification" && (
        <Card
          sx={{
            minWidth: 345,
            borderRadius: 4,
            boxShadow: "0px 8px 30px rgba(0, 5, 58, 0.18)",
          }}
        >
          <CardActionArea href="/crear-especificacion">
            <CardContent>
              <Stack justifyContent="center" alignItems="center">
                <DisplaySettingsIcon sx={{ fontSize: 60 }} color="primary" />
                <Typography gutterBottom fontSize={24} align="center" color="gray">
                  Agregar una Especificación
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      {props.type === "calibrationGeneration" && (
        <Card
          sx={{
            maxWidth: 345,
            borderRadius: 4,
            boxShadow: "0px 8px 30px rgba(0, 5, 58, 0.18)",
          }}
        >
          <CardActionArea href="/crear-certificado-calibracion">
            <CardContent>
              <Stack justifyContent="center" alignItems="center">
                <DocumentScannerRoundedIcon
                  sx={{ fontSize: 60 }}
                  color="primary"
                />
                <Typography gutterBottom fontSize={24} align="center" color="gray">
                  Generar un certificado de calibración
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default CardActions;
