import { useDispatch } from "react-redux";
import { setInfosTechnique } from "../../../redux/features/vehicules/";
import {
  Box,
  TextInput,
  Button,
  Group,
  Text,
  NumberInput,
  Tabs,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { useForm, joiResolver } from "@mantine/form";
import {
  useAdd_vehiculeItMutation,
  useAdd_vehicule_attachementsMutation,
} from "../../../redux/services/endpoints/vehicule.endpoint";
import { store } from "../../../redux/store";
import { schema_VehiculeIT } from "./schemas";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { ImAttachment } from "react-icons/im";
import { dropzoneChildren } from "./uploadDropzone";
import { FaWpforms } from "react-icons/fa";

const error_body = {
  status: "",
  data: { statusCode: 0, message: "", error: "" },
};

export const VehiculeIT = ({ toggleButton, current }: any) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [add_vehiculeIt] = useAdd_vehiculeItMutation();
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation();
  const [error, setError] = useState(error_body);
  const [attachements, setAttachements] = useState<File[]>();
  const form = useForm({
    schema: joiResolver(schema_VehiculeIT),
    initialValues: {
      vit_id: "",
      motorisation: "",
      pf: 0,
      moteur: "",
      volume_reservoire: 0,
      marque: "",
      modele: "",
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
      categories: "IT",
    })
      .unwrap()
      .then((payload) => {
        toggleButton(!current);
      });
  }

  async function handleSubmit(values: typeof form.values) {
    if (!form.validate().hasErrors) {
      const payload = values;
      payload.vit_id = "VIT#" + uuidv4();
      add_vehiculeIt({
        vehicule_id: store.getState().vehicule.vehicule?.vehicule_id!,
        vehicule_it: payload,
      })
        .unwrap()
        .then((payload) => {
          dispatch(setInfosTechnique({ infos_technique: payload }));
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
              label="Motorisation"
              {...form.getInputProps("motorisation")}
            />
            <NumberInput
              required
              label="Puissance Fiscal"
              min={0}
              {...form.getInputProps("pf")}
            />
            <TextInput
              required
              label="Moteur"
              {...form.getInputProps("moteur")}
            />
            <TextInput
              required
              label="Volume Reservoire (L)"
              {...form.getInputProps("volume_reservoire")}
            />
            <TextInput
              required
              label="Marque"
              {...form.getInputProps("marque")}
            />
            <TextInput
              required
              label="Modele"
              {...form.getInputProps("modele")}
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
