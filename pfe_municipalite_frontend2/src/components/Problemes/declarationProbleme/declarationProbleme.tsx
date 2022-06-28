import {
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  Select,
  Tabs,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker} from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { formList, useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { FaWpforms } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useLazyGet_vehiculesQuery } from "../../../redux/services/endpoints/vehicule.endpoint";
import { dropzoneChildren } from "../../Vehicules/addVehiculeForm/uploadDropzone";
import { vehiculeInitialState } from "../../Vehicules/vehiculesList/initialState.consts";
import { Vehicule } from "../../../redux/services/interfaces/vehicule.interface";
import { useAdd_demande_problemeMutation } from "../../../redux/services/endpoints/intervention.endpoint";
import { store } from "../../../redux/store";
import { showNotification } from "@mantine/notifications";
import { TiTick } from "react-icons/ti";
import { randomId } from "@mantine/hooks";
import Defauts from "./defauts";

const vehicule_response = {
  data: [vehiculeInitialState],
  meta: {
    page: 1,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};
const vehiculeData: Array<{
  key: string;
  label: string;
  value: string;
  vehicule: Vehicule;
}> = [
  {
    key: "",
    label: "",
    value: "",
    vehicule: {
      vehicule_id: "",
      immatriculation: "",
      num_chassis: "",
      type: "",
      service: "",
      benne: false,
      status: "",
    },
  },
];
export const DeclarationProbleme = () => {
  const dispatch = useDispatch();
  const [get_vehicules] = useLazyGet_vehiculesQuery({});
  const [add_demande_probleme] = useAdd_demande_problemeMutation({});
  const [data, setData] = useState(vehicule_response);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      di_id: "",
      date_declaration: "",
      resume:"",
      status:"Ouvert",
      defauts: formList([{name:"", active: false, key: randomId()}]),
      reparation_provosoire: false,
      declare_par: "",
      vehicule_id: "",
      vehicule: {
        vehicule_id: "",
        immatriculation: "",
        num_chassis: "",
        type: "",
        service: "",
        benne: false,
        status: "",
      },
    },
  });
  function handleData() {
    get_vehicules({
      order: "ASC",
      page: 1,
      take: 50,
      status: "",
      type: "",
      service: "",
    })
      .unwrap()
      .then((data) => setData(data));
    data.data.forEach((vehicule) => {
      if (
        vehiculeData.findIndex(
          (object) => object.key === vehicule.vehicule_id
        ) === -1
      ) {
        vehiculeData.push({
          key: vehicule.vehicule_id,
          label: vehicule.immatriculation,
          value: vehicule.vehicule_id,
          vehicule: vehicule,
        });
      }
    });
  }

  async function handleSubmit(values: typeof form.values) {
    console.log(values)
    if (!form.validate().hasErrors) {
      const payload = values;
      payload.di_id = "DI#" + uuidv4();
      vehiculeData.forEach((item) => {
        if (item.key === form.getInputProps("vehicule_id").value) {
          payload.vehicule = item.vehicule;
        }
      });
      payload.declare_par = store.getState().auth.user?.id!;
      add_demande_probleme(payload)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Demande Intervention",
            autoClose: 5000,
            title: "Success",
            message: `Probleme avec id : ${data.di_id} est déclaré`,
            color: "green",
            icon: <TiTick />,
          })
        )
        .catch((error) => console.log(error));
    }
  }

  useEffect(() => {
    handleData();
    const interval = setInterval(() => {
      handleData();
    }, 10000);
    return () => clearInterval(interval);
  }, [get_vehicules, data, vehiculeData]);
  return (
    <Group position="center">
    <Box sx={{ width: "600px " }} mx="sm">
      <Card>
      <Title order={4}>Déclaration de probleme</Title>
      <Tabs position="center" color="violet">
        <Tabs.Tab label="Informations" icon={<FaWpforms />}>
          <form>
            <Select
              label="Vehicule"
              searchable
              data={Array.from(new Set(vehiculeData))}
              {...form.getInputProps("vehicule_id")}
            />
            <DatePicker
              icon={<BsFillCalendarDateFill />}
              label="Date Déclaration"
              {...form.getInputProps("date_declaration")}
            />
            <TextInput label="Résumé" {...form.getInputProps("resume")}/>
            <Defauts form={form} />
            <Checkbox
              label="Réparation provosoire"
              {...form.getInputProps("reparation_provosoire")}
              my={15}
            />
          </form>
        </Tabs.Tab>
        <Tabs.Tab label="Attachements" icon={<ImAttachment />}>
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            onDrop={(files) => console.log("files", files)}
            onReject={(files) => console.log("files", files)}
          >
            {(status) => dropzoneChildren(status, theme)}
          </Dropzone>
        </Tabs.Tab>
      </Tabs>
      <Group position="right" mt="md">
        <Button
          type="button"
          onClick={() => handleSubmit(form.values)}
          color="violet"
        >
          Sauvgarder
        </Button>
      </Group>
      </Card>
    </Box>
    </Group>
  );
};
