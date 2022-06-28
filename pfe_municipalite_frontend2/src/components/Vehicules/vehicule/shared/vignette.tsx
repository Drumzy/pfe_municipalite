import {
  Box,
  Button,
  Group,
  NumberInput,
  Tabs,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { vehicule_attachement_mockup } from "..";
import {
  useAdd_carte_griseMutation,
  useAdd_vehicule_attachementsMutation,
  useAdd_vignetteMutation,
  useUpdate_carte_griseMutation,
  useUpdate_vignetteMutation,
} from "../../../../redux/services/endpoints/vehicule.endpoint";
import {
  schema_Assurance,
  schema_CarteGrise,
  schema_Vignette,
} from "../../addVehiculeForm/schemas";
import { v4 as uuidv4 } from "uuid";
import { Attachements } from "../attachements";
import { vehicule } from "./innertab";
import { Dropzone } from "@mantine/dropzone";
import { dropzoneChildren } from "../../addVehiculeForm/uploadDropzone";
import { DatePicker } from "@mantine/dates";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";

interface VignetteProps {
  vehicule_id: string;
  vignet: typeof vehicule.vignette;
  vignette_attachements: Array<typeof vehicule_attachement_mockup>;
}

const Vignette: React.FC<VignetteProps> = ({
  vehicule_id,
  vignet,
  vignette_attachements,
}) => {
  const theme = useMantineTheme();
  const [add_vignette] = useAdd_vignetteMutation({});
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation({});
  const [update_vignette] = useUpdate_vignetteMutation({});
  const [attachements, SetAttachements] = useState<File[]>();
  const [disabled, SetDisabled] = useState(true);
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

  const handleAdd = () => {
    if (!form.validate().hasErrors) {
      form.setFieldValue("vignette_id", "CG#" + uuidv4());
      add_vignette({ vehicule_id: vehicule_id, vignette: form.values })
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Ajout Vignette",
            title: "Success",
            autoClose: 5000,
            message: `Vignette de vehicule avec id : ${vehicule_id.slice(
              0,
              9
            )} on mis a jour`,
            color: "green",
            icon: <TiTick />,
          })
        )
        .catch((error) => console.log(error));
    }
  };

  const handleUpdate = () => {
    if (!form.validate().hasErrors) {
      update_vignette(form.values)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Update Vignette",
            title: "Success",
            autoClose: 5000,
            message: `Vignette de vehicule avec id : ${vehicule_id.slice(
              0,
              9
            )} on mis a jour`,
            color: "green",
            icon: <TiTick />,
          })
        )
        .catch((error) => console.log(error));
    }
  };

  const handleFileUpload = () => {
    const new_attachements = new FormData();
    attachements?.map((file) =>
      new_attachements.append("files", file, file.name)
    );
    add_vehicule_attachements({
      vehicule_id: vehicule_id,
      files: new_attachements,
      categories: "VI",
    })
      .unwrap()
      .then((payload) => {
        showNotification({
          id: "Ajout VignetteAttachement",
          title: "Success",
          autoClose: 5000,
          message: `Les Attachements de Vignette de vehicule avec id : ${vehicule_id.slice(
            0,
            9
          )} on mis a jour`,
          color: "green",
          icon: <TiTick />,
        });
      });
  };

  useEffect(() => {
    if (vignet !== null) {
      form.setValues({
        vignette_id: vignet.vignette_id,
        num_quittance: vignet.num_quittance,
        date_debut: vignet.date_debut,
        date_fin : vignet.date_fin,
        prix: vignet.prix,
        attachement: vignet.attachement,
        vehicule_id: vignet.vehicule_id,
      });
    }
  }, []);

  return (
    <>
      {vignet === null ? (
        <Text color="red">
          Cette vehicule ne contient pas les informations de Vignette nécessaire
          !
        </Text>
      ) : (
        <></>
      )}
      <Tabs color="violet" grow variant="outline">
      <Tabs.Tab label="Infromation" icon={<CgDetailsMore />}>
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
          <Group my="md" sx={{ float: "right" }}>
            {vignet === null ? (
              <Button type="button" color={"green"} onClick={() => handleAdd()}>
                Ajouter
              </Button>
            ) : (
              <Button
                type="button"
                color={"green"}
                onClick={() => handleUpdate()}
              >
                Modifier
              </Button>
            )}
          </Group>
        </Tabs.Tab>
        <Tabs.Tab label="Attachement" icon={<AiOutlineFileText />}>
          {vignette_attachements.length === 0 ? (
            <Box>
              <Text color="red" my={15}>
                Il n'y a pas des attachements de carteGrise
              </Text>
              <Dropzone
                accept={[
                  "image/png",
                  "image/jpeg",
                  "image/svg+xml",
                  "image/gif",
                  "application/pdf",
                ]}
                onDrop={(files) => {
                  SetAttachements(files);
                  SetDisabled((o) => !o);
                }}
                onReject={(files) => console.log("rejected files", files)}
              >
                {(status) => dropzoneChildren(status, theme)}
              </Dropzone>
              <Group my="md" sx={{ float: "right" }}>
                <Button onClick={() => handleFileUpload()} disabled={disabled}>
                  Ajouter Attachements
                </Button>
              </Group>
            </Box>
          ) : (
            <Attachements vehicules={vignette_attachements} />
          )}
        </Tabs.Tab>
      </Tabs>
    </>
  );
};
export default Vignette