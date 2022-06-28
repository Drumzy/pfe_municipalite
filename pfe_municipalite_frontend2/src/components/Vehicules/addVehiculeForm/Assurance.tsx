import { useDispatch } from "react-redux";
import { setAssurance } from "../../../redux/features/vehicules";
import {
  Box,
  TextInput,
  Button,
  Group,
  NumberInput,
  Text,
  useMantineTheme,
  Tabs,
} from "@mantine/core";
import Joi, { date } from "joi";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import {
  useAdd_assuranceMutation,
  useAdd_vehicule_attachementsMutation,
} from "../../../redux/services/endpoints/vehicule.endpoint";
import { useForm, joiResolver } from "@mantine/form";
import { store } from "../../../redux/store";
import { v4 as uuidv4 } from "uuid";
import { schema_Assurance } from "./schemas";
import { FaWpforms } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { dropzoneChildren } from "./uploadDropzone";
const error_body = {
  status: "",
  data: { statusCode: 0, message: "", error: "" },
};

export const Assurance = ({ toggleButton, current }: any) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation();
  const [add_assurance] = useAdd_assuranceMutation();
  const [attachements, setAttachements] = useState<File[]>();
  const [error, setError] = useState({
    status: "",
    data: { statusCode: 0, message: "", error: "" },
  });
  const form = useForm({
    schema: joiResolver(schema_Assurance),
    initialValues: {
      assurance_id: "",
      attachement: "",
      numero: 0,
      nom_agence: "",
      date_debut: new Date(),
      date_fin: new Date(),
      vehicule_id: "",
    },
  });

  function handlefileupload() {
    const new_attachements = new FormData();
    attachements?.map((file) =>
      new_attachements.append("files", file, file.name)
    );
    add_vehicule_attachements({
      vehicule_id: store.getState().vehicule.vehicule?.vehicule_id,
      files: new_attachements,
      categories:"AS"
    })
      .unwrap()
      .then((payload) => {
        toggleButton(!current);
      });
  }

  async function handleSubmit(values: typeof form.values) {
    if (!form.validate().hasErrors) {
      const payload = values;
      payload.assurance_id = "AS#" + uuidv4();
       add_assurance({
        vehicule_id: store.getState().vehicule.vehicule?.vehicule_id!,
        assurance: payload,
      })
        .unwrap()
        .then((payload) => {
          dispatch(setAssurance({ assurance: payload }));
          toggleButton(!current);
          handlefileupload();
          form.reset();
          setError(error_body);
        })
        .catch((error) => setError(error));
    }
  }
  return (
    <Box sx={{ width: "600px" }} mx="sm">
      <Tabs color="violet" grow >
        <Tabs.Tab label="Informations" icon={<FaWpforms />}>
          <form>
            <NumberInput
              required
              label="Contrat Numero"
              {...form.getInputProps("numero")}
            />
            <TextInput
              required
              label="Nom d'agence"
              {...form.getInputProps("nom_agence")}
            />
            <DatePicker
              icon={<BsFillCalendarDateFill />}
              label="Date De Debut"
              {...form.getInputProps("date_debut")}
            />
            <DatePicker
              icon={<BsFillCalendarDateFill />}
              label="Date De Fin"
              {...form.getInputProps("date_fin")}
            />
            {error ? <Text color="red">{error.data.message}</Text> : null}
          </form>
        </Tabs.Tab>
        <Tabs.Tab label="Attachements" icon={<ImAttachment />}>
          <Dropzone
            accept={[
              "image/png",
              "image/jpeg",
              "image/sgv+xml",
              "image/gif",
              "application/pdf",
            ]}
            onDrop={(files) => setAttachements(files)}
            onReject={(files) => console.log("rejected files", files)}
          >
            {(status) => dropzoneChildren(status, theme)}
          </Dropzone>
        </Tabs.Tab>
      </Tabs>
      <Group mt="md">
        <Button
          type="button"
          onClick={() => handleSubmit(form.values)}
          color={"violet"}
        >
          Verifier les données
        </Button>
      </Group>
    </Box>
  );
};
