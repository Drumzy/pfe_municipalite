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
  useAdd_assuranceMutation,
  useAdd_vehicule_attachementsMutation,
  useUpdate_assuranceMutation,
} from "../../../../redux/services/endpoints/vehicule.endpoint";
import { schema_Assurance } from "../../addVehiculeForm/schemas";
import { v4 as uuidv4 } from "uuid";
import { Attachements } from "../attachements";
import { vehicule } from "./innertab";
import { Dropzone } from "@mantine/dropzone";
import { dropzoneChildren } from "../../addVehiculeForm/uploadDropzone";
import { DatePicker } from "@mantine/dates";
import { CgDetailsMore } from "react-icons/cg";
import { AiOutlineFileText } from "react-icons/ai";

interface AssuranceProps {
  vehicule_id: string;
  assurance: typeof vehicule.assurance;
  assurance_attachements: Array<typeof vehicule_attachement_mockup>;
}

const Assurance: React.FC<AssuranceProps> = ({
  vehicule_id,
  assurance,
  assurance_attachements,
}) => {
  const theme = useMantineTheme();
  const [add_assurance] = useAdd_assuranceMutation({});
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation({});
  const [update_assurance] = useUpdate_assuranceMutation({});
  const [attachements, SetAttachements] = useState<File[]>();
  const [disabled, SetDisabled] = useState(true);
  const form = useForm({
    schema: joiResolver(schema_Assurance),
    initialValues: {
      assurance_id: "",
      numero: 0,
      nom_agence: "",
      date_debut: new Date(),
      date_fin: new Date(),
      attachement: "",
    },
  });

  const handleAdd = () => {
    if (!form.validate().hasErrors) {
      form.setFieldValue("assurance_id", "AS#" + uuidv4());
      console.log(form.values.assurance_id);
      add_assurance({ vehicule_id: vehicule_id, assurance: form.values })
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Ajout Assurance",
            title: "Success",
            autoClose: 5000,
            message: `Assurance de vehicule avec id : ${vehicule_id.slice(
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
      update_assurance(form.values)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Update Assurance",
            title: "Success",
            autoClose: 5000,
            message: `Assurance de vehicule avec id : ${vehicule_id.slice(
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
      categories: "AS",
    })
      .unwrap()
      .then((payload) => {
        showNotification({
          id: "Ajout AssuranceAttachement",
          title: "Success",
          autoClose: 5000,
          message: `Les Attachements d'assurance de vehicule avec id : ${vehicule_id.slice(
            0,
            9
          )} on mis a jour`,
          color: "green",
          icon: <TiTick />,
        });
      });
  };

  useEffect(() => {
    if (assurance !== null) {
      form.setValues({
        assurance_id: assurance.assurance_id,
        numero: assurance.numero,
        nom_agence: assurance.nom_agence,
        date_debut: new Date(assurance.date_debut),
        date_fin: new Date(assurance.date_fin),
        attachement: assurance.attachement,
      });
    }
  }, []);

  return (
    <>
      {assurance === null ? (
        <Text color="red">
          Cette vehicule ne contient pas les informations d'assurance nécessaire
          !
        </Text>
      ) : (
        <></>
      )}
      <Tabs color="violet" grow variant="outline" >
      <Tabs.Tab label="Infromation" icon={<CgDetailsMore />}>
          <form>
            <NumberInput
              required
              label="Numéro"
              min={0}
              stepHoldDelay={500}
              stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
              {...form.getInputProps("numero")}
            />
            <TextInput
              required
              label="Nom d'agence"
              {...form.getInputProps("nom_agence")}
            />
            <DatePicker
              required
              label="Date début"
              {...form.getInputProps("date_debut")}
            />
            <DatePicker
              required
              label="Date fin"
              {...form.getInputProps("date_fin")}
            />
          </form>
          <Group my="md" sx={{ float: "right" }}>
            {assurance === null ? (
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
          {assurance_attachements.length === 0 ? (
            <Box>
              <Text color="red" my={15}>
                Il n'y a pas des attachements d'assurance
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
            <Attachements vehicules={assurance_attachements} />
          )}
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default Assurance;
