import {
  Button,
  Group,
  NumberInput,
  Select,
  SelectItem,
  Tabs,
  TextInput,
} from "@mantine/core";
import { Attachements } from "../attachements";
import { useState, useEffect, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import {
  useLazyGet_assuranceQuery,
  useLazyGet_carte_griseQuery,
  useLazyGet_vehiculeItQuery,
  useLazyGet_vehiculeQuery,
  useLazyGet_vehicule_attachementsQuery,
} from "../../../../redux/services/endpoints/vehicule.endpoint";
import {
  data,
  dataService,
  dataStatut,
} from "../../addVehiculeForm/vehiculeTypes";
import { DatePicker } from "@mantine/dates";
import { BsFillCalendarDateFill } from "react-icons/bs";
import VehiculeIt from "./vehiculeIT";
import Assurance from "./Assurance";
import CarteG from "./carteGrise";
import Vignette from "./vignette";
import { AiOutlineFileText } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";
export const vehicule = {
  vehicule_id: "",
  immatriculation: "",
  num_chassis: "",
  type: "",
  status: "",
  service: "",
  numm_chassis: "",
  position_parking: 0,
  benne: false,

  vehicule_it: {
    vit_id: "",
    motorisation: "",
    pf: 0,
    moteur: "",
    volume_reservoire: 0,
    marque: "",
    modele: "",
  },
  assurance: {
    assurance_id: "",
    attachement: "",
    numero: 0,
    nom_agence: "",
    date_debut: new Date(),
    date_fin: new Date(),
    vehicule_id: "",
  },
  carte_grise: {
    carte_grise_id: "",
    adresse: "",
    activite: "",
    matricule_fiscale: "",
    genre: "",
    num_serie_type: "",
    attachement: "",
    date_mise_circulation: new Date(),
    vehicule_id: "",
  },
  vignette: {
    vignette_id: "",
    vehicule_id: "",
    num_quittance: "",
    date_debut: new Date(),
    date_fin: new Date(),
    prix: 0,
    attachement: "",
  },
};
export const vehicule_attachement_mockup = {
  vha_id: "",
  file_name: "",
  cree_le: Date,
  maj_le: Date,
  type: "",
  categories: "",
};

function InnerTab() {
  const [inputValue, setInputValue] = useState("");
  const { vehicule_id, categories } = useParams();
  const [get_vehicule] = useLazyGet_vehiculeQuery({});
  const [get_vehicule_attachements] = useLazyGet_vehicule_attachementsQuery({});
  const [vehicule_loaded, setVehiculeLoaded] = useState(vehicule);
  const [vehicule_attachements, setVehiculeAttachements] = useState([
    vehicule_attachement_mockup,
  ]);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value);
  };
  const updateInput = () => {
    console.log(inputValue);
  };
  function dataHandler() {
    get_vehicule(vehicule_id!)
      .unwrap()
      .then((data) => {
        setVehiculeLoaded({ ...vehicule_loaded, ...data });
      });
    get_vehicule_attachements(vehicule_id!)
      .unwrap()
      .then((data) => setVehiculeAttachements(data));
  }

  useEffect(() => {
    dataHandler();

    const interval = setInterval(() => {
      console.log(vehicule_loaded);
      dataHandler();
    }, 5000);

    return () => clearInterval(interval);
  }, [vehicule_loaded]);
  const handleFilter = (categorie: string, attachement: any) => {
    return attachement.filter((e: any) => e.categories === categorie);
  };

  return (
    <Tabs color="violet" grow>
      <Tabs.Tab label="Identification">
      <Tabs color="violet" grow variant="outline">
      <Tabs.Tab label="Infromation" icon={<CgDetailsMore />}>
            <form>
              <TextInput
                required
                label="Num Chassis"
                defaultValue={vehicule_loaded?.num_chassis}
                onChange={handleChange}
                onBlur={updateInput}
              />
              <TextInput
                required
                label="Immatriculation"
                defaultValue={vehicule_loaded?.immatriculation}
                onChange={handleChange}
                onBlur={updateInput}
              />
              <Select
                label="Type"
                data={data}
                defaultValue={vehicule_loaded?.type}
              />
              <Select
                label="Service"
                data={dataService}
                defaultValue={vehicule_loaded?.service}
              />
              <Select
                label="Status"
                data={dataStatut}
                defaultValue={vehicule_loaded?.status}
              />
            </form>
            <Group my="md" sx={{ float: "right" }}>
              <Button type="button" color={"green"}>
                Modifier
              </Button>
            </Group>
          </Tabs.Tab>
          <Tabs.Tab label="Attachement" icon={<AiOutlineFileText />}>
            <Attachements
              vehicules={handleFilter("ID", vehicule_attachements)}
            />
          </Tabs.Tab>
        </Tabs>
      </Tabs.Tab>

      <Tabs.Tab label="Information Technique">
        <VehiculeIt
          vehicule_it={vehicule_loaded.vehicule_it}
          vehiculeIT_attachements={handleFilter("IT", vehicule_attachements)}
          vehicule_id={vehicule_loaded.vehicule_id}
        />
      </Tabs.Tab>

      <Tabs.Tab label="Assurance">
        <Assurance
          vehicule_id={vehicule_loaded.vehicule_id}
          assurance={vehicule_loaded.assurance}
          assurance_attachements={handleFilter("AS", vehicule_attachements)}
        />
      </Tabs.Tab>

      <Tabs.Tab label="Carte Grise">
        <CarteG
          vehicule_id={vehicule_loaded.vehicule_id}
          carteGrise={vehicule_loaded.carte_grise}
          carteGrise_attachements={handleFilter("CG", vehicule_attachements)}
        />
      </Tabs.Tab>
      <Tabs.Tab label="Vignette">
        <Vignette
          vehicule_id={vehicule_loaded.vehicule_id}
          vignet={vehicule_loaded.vignette}
          vignette_attachements={handleFilter("VI", vehicule_attachements)}
        />
      </Tabs.Tab>
    </Tabs>
  );
}
export default InnerTab;
