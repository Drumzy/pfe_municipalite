import { useDispatch } from "react-redux";
import { setVignette } from "../../../redux/features/vehicules";
import {
  Box,
  TextInput,
  Button,
  Group,
  NumberInput,
  Tabs,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import Joi from "joi";
import {
  useAdd_vehicule_attachementsMutation,
  useAdd_vignetteMutation,
} from "../../../redux/services/endpoints/vehicule.endpoint";
import { useForm, joiResolver } from "@mantine/form";
import { v4 as uuidv4 } from "uuid";
import { store } from "../../../redux/store";
import { schema_Vignette } from "./schemas";
import { FaWpforms } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { dropzoneChildren } from "./uploadDropzone";
import { DatePicker } from "@mantine/dates";
import { BsFillCalendarDateFill } from "react-icons/bs";

const error_body = {
  status: "",
  data: { statusCode: 0, message: "", error: "" },
};

export const Vignette = ({ toggleButton, current }: any) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation();
  const [attachements, setAttachements] = useState<File[]>();
  const [add_vignette] = useAdd_vignetteMutation();
  const [error, setError] = useState({
    status: "",
    data: { statusCode: 0, message: "", error: "" },
  });
  const form = useForm({
    schema: joiResolver(schema_Vignette),
    initialValues: {
      vignette_id: "",
      vehicule_id: "",
      num_quittance: "",
      date_debut: new Date(),
      date_fin : new Date(),
      prix: 0,
      attachement: "",
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
      categories: "VI",
    })
      .unwrap()
      .then((payload) => {
        toggleButton(!current);
      });
  }

  function handleSubmit(values: typeof form.values) {
    if (!form.validate().hasErrors) {
      const payload = values;
      payload.vignette_id = "VG#" + uuidv4();
      add_vignette({
        vehicule_id: store.getState().vehicule.vehicule?.vehicule_id!,
        vignette: payload,
      })
        .unwrap()
        .then((payload) => {
          dispatch(setVignette({ vignette: payload }));
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
              label="Numero Quittance"
              {...form.getInputProps("num_quittance")}
            />           
            <DatePicker
              icon={<BsFillCalendarDateFill />}
              label="Date_Debut"
              {...form.getInputProps("date_debut")}
            />
            <DatePicker
              icon={<BsFillCalendarDateFill />}
              label="Date_Fin"
              {...form.getInputProps("date_fin")}
            />
            <NumberInput
              required
              label="Prix"
              {...form.getInputProps("prix")}
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
