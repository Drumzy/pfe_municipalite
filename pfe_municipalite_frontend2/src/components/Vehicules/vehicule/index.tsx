import {
  Badge,
  Box,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { ImFilesEmpty } from "react-icons/im";
import { GiAutoRepair } from "react-icons/gi";
import { AiFillCopy } from "react-icons/ai";
import {
  useLazyGet_vehiculeQuery,
  useLazyGet_vehicule_attachementsQuery,
} from "../../../redux/services/endpoints/vehicule.endpoint";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DeleteModal } from "./delete.modal";
import InnerTab from "./shared/innertab";
import Plans from "./shared/plans";

const vehicule_mockup = {
  vehicule_id: "",
  immatriculation: "",
  num_chassis: "",
  type: "",
  status: "",
  service: "",
  position_parking: 0,
  benne: false,
  maintenances: [{
    pm_id: '',
    nbr_repetition:0,
    periodicite: '',
    type: '',
    mots_cle:'',
  }]
};
export const vehicule_attachement_mockup = {
  vha_id: "",
  file_name: "",
  cree_le: Date,
  maj_le: Date,
  type: "",
  categories: "",
};
function Vehicule() {
  const { vehicule_id } = useParams();
  const [get_vehicule] = useLazyGet_vehiculeQuery({});
  const [get_vehicule_attachements] = useLazyGet_vehicule_attachementsQuery({});
  const [vehicule_loaded, setVehiculeLoaded] = useState(vehicule_mockup);
  const [vehicule_attachements, setVehiculeAttachements] = useState([
    vehicule_attachement_mockup,
  ]);
  function dataHandler() {
    get_vehicule(vehicule_id!)
      .unwrap()
      .then((data) => {
        setVehiculeLoaded(data);
      });
    get_vehicule_attachements(vehicule_id!)
      .unwrap()
      .then((data) => {
        setVehiculeAttachements(data);
      });
  }
  useEffect(() => {
    dataHandler();
  }, [vehicule_loaded]);
  return (
    <Container fluid>
      <Card
        shadow="sm"
        p="sm"
        sx={{
          display: "flex",
          width: "100%",
          height: "150px",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: 15,
        }}
      >
        <Center sx={{}}>
          {vehicule_attachements.length !== 0 ? (
            <Image
              width="150px"
              src={
                "http://localhost:5000/files_api/v1/vehicule/attachements/" +
                vehicule_attachements.at(0)?.file_name
              }
            />
          ) : (
            <Text>Pas d'image</Text>
          )}
        </Center>
        <Divider orientation="vertical" />
        <Group grow position="center" spacing="sm">
          <Grid columns={6}>
            <Grid.Col span={3}>
              <Group sx={{ justifyContent: "space-between" }}>
                <Text>Type: </Text>
                <Text>{vehicule_loaded?.type}</Text>
              </Group>
              <Divider my="sm" />
            </Grid.Col>
            <Grid.Col span={3}>
              <Group sx={{ justifyContent: "space-between" }}>
                <Text>Service: </Text>
                <Text>{vehicule_loaded?.service}</Text>
              </Group>
              <Divider my="sm" />
            </Grid.Col>
            <Grid.Col span={3}>
              <Group sx={{ justifyContent: "space-between" }}>
                <Text>N° de châssis: </Text>
                <Text>{vehicule_loaded?.num_chassis}</Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={3}>
              <Group sx={{ justifyContent: "space-between" }}>
                <Text>Immatriculation: </Text>
                <Text>{vehicule_loaded?.immatriculation}</Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Group>
        <Divider orientation="vertical" />
        <Stack>
          <Badge color="red" size="xl">
            {" "}
            3 Critique
          </Badge>
          <Badge color="orange" size="xl">
            {" "}
            1 Moyenne
          </Badge>
        </Stack>
      </Card>
      <Card shadow="sm" p="lg" my={25} sx={{ borderRadius: 15 }}>
        <Tabs orientation="horizontal" grow color="violet">
          <Tabs.Tab label="Plan d'entretien" icon={<GiAutoRepair />}>
            <Plans maintenances={vehicule_loaded.maintenances} />
          </Tabs.Tab>
          <Tabs.Tab label="Administration" icon={<AiFillCopy />}>
            <InnerTab />
          </Tabs.Tab>
        </Tabs>
      </Card>
      <DeleteModal props={vehicule_id} />
    </Container>
  );
}
export default Vehicule;
