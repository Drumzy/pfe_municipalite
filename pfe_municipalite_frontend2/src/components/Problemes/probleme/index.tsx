import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  InputWrapper,
  List,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLazyGet_demandeQuery } from "../../../redux/services/endpoints/intervention.endpoint";
import { useLazyGet_vehicule_attachementsQuery } from "../../../redux/services/endpoints/vehicule.endpoint";
import { vehicule_attachement_mockup } from "../../Vehicules/vehicule";
import { interventionInitialState } from "../demandesList/initialState.consts";
import { useLazyGet_employeeQuery } from "../../../redux/services/endpoints/employee.endpoint";
import { bnt_initialState, employeeData } from "./data.const";
import BonTravailForm from "./workOreder_form";
import { MdReportProblem } from "react-icons/md";

function Probleme() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const { probleme_id } = useParams();
  const [get_demande] = useLazyGet_demandeQuery({});
  const [get_vehicule_attachements] = useLazyGet_vehicule_attachementsQuery({});
  const [demande_loaded, setDemandeLoaded] = useState(interventionInitialState);
  const [vehicule_attachements, setVehiculeAttachements] = useState([
    vehicule_attachement_mockup,
  ]);
  const [get_employee] = useLazyGet_employeeQuery({});
  const [formdisplay, setFormDisplay] = useState(true);
  const [employee, setEmployee] = useState(employeeData);
  const [{ equipement, description }, setState] = useState(bnt_initialState);

  const formRef = useRef<HTMLDivElement>(null);
  function handleData() {
    get_demande(probleme_id!)
      .unwrap()
      .then((data) => setDemandeLoaded(data));
    get_vehicule_attachements(demande_loaded.vehicule.vehicule_id)
      .unwrap()
      .then((data) => setVehiculeAttachements(data));
    get_employee(demande_loaded.declare_par)
      .unwrap()
      .then((data) => setEmployee(data));
  }
  const form_place = document.getElementById("bnform");
  const scrollToForm = () => {
    setFormDisplay(false);
    if (formdisplay == false) {
      form_place!.scrollIntoView({ behavior: "smooth" });
    }
  };
  const inspectVehicule = (vehicule_id: string) => {
    navigate(`/vehicules/vehicule/${encodeURIComponent(vehicule_id)}`);
  };
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    handleData();
    const interval = setInterval(() => {
      handleData();
    }, 3000);
    return () => clearInterval(interval);
  }, [demande_loaded, vehicule_attachements, equipement, description]);

  return (
    <Box p={5}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }} mx="xs">
        <Group position="left" sx={{ width: "30%", minWidth: "300px" }}>
          <Card shadow="lg" p="lg">
            <Card.Section p={25}>
              {vehicule_attachements.length === 0 ? (
                <></>
              ) : (
                <Image
                  width="100%"
                  src={
                    "http://localhost:5000/files_api/v1/vehicule/attachements/" +
                    vehicule_attachements.at(0)?.file_name
                  }
                />
              )}
            </Card.Section>
            <Group
              position="apart"
              style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
            >
              <Text weight={500}>
                {demande_loaded.vehicule.vehicule_id.slice(0, 9)}
              </Text>
              <Badge
                color={
                  demande_loaded.vehicule.status === "Active" ? "green" : "red"
                }
              >
                {demande_loaded.vehicule.status}
              </Badge>
            </Group>
            <Stack spacing="md">
              <Group sx={{ width: "100%", justifyContent: "space-between" }}>
                <Title order={5}>Immatriculation: </Title>
                <Text>{demande_loaded.vehicule.immatriculation}</Text>
              </Group>
              <Group sx={{ width: "100%", justifyContent: "space-between" }}>
                <Title order={5}>N° Chassis: </Title>
                <Text>{demande_loaded.vehicule.num_chassis}</Text>
              </Group>
              <Group sx={{ width: "100%", justifyContent: "space-between" }}>
                <Title order={5}>Type: </Title>
                <Text>{demande_loaded.vehicule.type}</Text>
              </Group>
              <Group sx={{ width: "100%", justifyContent: "space-between" }}>
                <Title order={5}>Service: </Title>
                <Text>{demande_loaded.vehicule.service}</Text>
              </Group>
            </Stack>
            <Button
              color="violet"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={() =>
                inspectVehicule(demande_loaded.vehicule.vehicule_id)
              }
            >
              Inspecter la vehicule
            </Button>
          </Card>
        </Group>
        <Group sx={{ width: "70%" }} ml={25}>
          <Card shadow="lg" p="lg" sx={{ width: "100%" }}>
            <Group mb={25}>
              <Title order={5}> Demande d'intervention N°:</Title>
              <Text color="blue" weight={800}>
                {demande_loaded.di_id.slice(0, 9)}
              </Text>
            </Group>
            <TextInput
              label="Date Declaration"
              value={demande_loaded.date_declaration.slice(0, 10)}
              readOnly
            />
            <TextInput label="Résumé" value={demande_loaded.resume} readOnly />
            <InputWrapper label="Defauts Constatée">
              <List withPadding>
                {demande_loaded.defauts.map((defaut) => (
                  <List.Item icon={<MdReportProblem />} key={defaut.id}>
                    {defaut.name}
                  </List.Item>
                ))}
              </List>
            </InputWrapper>
            <TextInput label="Etat" value={demande_loaded.status} readOnly />
            <Group position="right" mt={15}>
              <Button
                color="violet"
                onClick={() => {
                  scrollToForm();
                }}
              >
                Créer un bon de travail
              </Button>
            </Group>
          </Card>
        </Group>
      </Box>
      <BonTravailForm
        formdisplay={formdisplay}
        demande={demande_loaded}
        employee={employee}
        formProps={{ description, equipement }}
        setFormDisplay={setFormDisplay}
        onChange={onChange}
        formRef={formRef}
      />
    </Box>
  );
}
export default Probleme;
