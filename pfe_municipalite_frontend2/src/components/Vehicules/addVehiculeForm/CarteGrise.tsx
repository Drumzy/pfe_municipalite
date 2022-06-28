import { useDispatch } from "react-redux";
import { setCarteGrise } from "../../../redux/features/vehicules";
import {
  Box,
  TextInput,
  Button,
  Group,
  Tabs,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { useForm, joiResolver } from "@mantine/form";
import {
  useAdd_carte_griseMutation,
  useAdd_vehicule_attachementsMutation,
} from "../../../redux/services/endpoints/vehicule.endpoint";
import { store } from "../../../redux/store";
import { schema_CarteGrise } from "./schemas";
import { FaWpforms } from "react-icons/fa";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { dropzoneChildren } from "./uploadDropzone";
import { ImAttachment } from "react-icons/im";

const error_body = {
  status: "",
  data: { statusCode: 0, message: "", error: "" },
};

export const CarteGrise = ({ toggleButton, current }: any) => {
  const theme = useMantineTheme();
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation();
  const [attachements, setAttachements] = useState<File[]>();
  const dispatch = useDispatch();
  const [add_carteGrise] = useAdd_carte_griseMutation();
  const [error, setError] = useState({
    status: "",
    data: { statusCode: 0, message: "", error: "" },
  });
  const form = useForm({
    schema: joiResolver(schema_CarteGrise),
    initialValues: {
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
  });

  function handlefileupload() {
    const new_attachements = new FormData();
    attachements?.map((file) =>
      new_attachements.append("files", file, file.name)
    );
    add_vehicule_attachements({
      vehicule_id: store.getState().vehicule.vehicule?.vehicule_id,
      files: new_attachements,
      categories:"CG"
    })
      .unwrap()
      .then((payload) => {
        toggleButton(!current);
      });
  }

  function handleSubmit(values: typeof form.values) {
    if (!form.validate().hasErrors) {
      const payload = values;
      payload.carte_grise_id = "CG#" + uuidv4();
      add_carteGrise({
        vehicule_id: store.getState().vehicule.vehicule?.vehicule_id!,
        carte_grise: payload,
      })
        .unwrap()
        .then((payload) => {
          dispatch(setCarteGrise({ carte_grise: payload }));
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
            <TextInput
              required
              label="Adresse"
              {...form.getInputProps("adresse")}
            />
            <TextInput
              required
              label="Matricule Fiscale"
              {...form.getInputProps("matricule_fiscale")}
            />
            <TextInput
              required
              label="Activite"
              {...form.getInputProps("activite")}
            />
            <TextInput
              required
              label="Genre"
              {...form.getInputProps("genre")}
            />
            <TextInput
              required
              label="Numero De Serie"
              {...form.getInputProps("num_serie_type")}
            />
            <DatePicker
              icon={<BsFillCalendarDateFill />}
              label="Date Mise en Circulation"
              {...form.getInputProps("date_mise_circulation")}
            />
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
