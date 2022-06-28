import { useDispatch } from "react-redux";
import { setVehicule } from "../../../redux/features/vehicules";
import {
  Box,
  Select,
  TextInput,
  Button,
  Group,
  Text,
  useMantineTheme,
  Tabs,
} from "@mantine/core";
import { useState } from "react";
import { data, dataService, dataStatut, SelectItem } from "./vehiculeTypes";
import { v4 as uuidv4 } from "uuid";
import {
  useAdd_vehiculeMutation,
  useAdd_vehicule_attachementsMutation,
} from "../../../redux/services/endpoints/vehicule.endpoint";
import { useForm, joiResolver } from "@mantine/form";
import { schema_Identification } from "./schemas";
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { dropzoneChildren } from "./uploadDropzone";
import { FaWpforms } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { store } from "../../../redux/store";

export const Identification = ({ toggleButton, current }: any) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [add_vehicule] = useAdd_vehiculeMutation();
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation();
  const [error, setError] = useState({
    status: "",
    data: { statusCode: 0, message: "", error: "" },
  });
  const [attachements, setAttachements] = useState<File[]>();
  const form = useForm({
    schema: joiResolver(schema_Identification),
    initialValues: {
      immatriculation: "",
      num_chassis: "",
      type: "",
      service: "",
      status: "",
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
      categories: "ID",
    })
      .unwrap()
      .then((payload) => {
        toggleButton(!current);
      });
  }
  async function handleSubmit(values: typeof form.values) {
    if (!form.validate().hasErrors) {
      const payload = values;
      Object.assign(payload, { vehicule_id: "VH#" + uuidv4() });
      Object.assign(payload, { benne: false });
      add_vehicule(payload)
        .unwrap()
        .then((payload) => {
          dispatch(setVehicule({ vehicule: payload }));
          handlefileupload();
          form.reset();
        })
        .catch((error) => setError(error));
    }
  }

  return (
    <Box sx={{ width: "600px" }} mx="sm">
      <Tabs color="violet" grow  >
        <Tabs.Tab label="Informations" icon={<FaWpforms />}>
          <form>
            <TextInput
              required
              label="Num Chassis"
              {...form.getInputProps("num_chassis")}
            />
            <TextInput
              required
              label="Immatriculation"
              {...form.getInputProps("immatriculation")}
            />
            <Select
              itemComponent={SelectItem}
              label="Type"
              data={data}
              {...form.getInputProps("type")}
            />

            <Select
              label="Service"
              data={dataService}
              {...form.getInputProps("service")}
            />
            <Select
              label="Status"
              data={dataStatut}
              {...form.getInputProps("status")}
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
          Insérer
        </Button>
      </Group>
    </Box>
  );
};
