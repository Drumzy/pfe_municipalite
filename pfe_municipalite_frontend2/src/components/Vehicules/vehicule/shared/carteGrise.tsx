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
  useUpdate_carte_griseMutation,
} from "../../../../redux/services/endpoints/vehicule.endpoint";
import { schema_Assurance, schema_CarteGrise } from "../../addVehiculeForm/schemas";
import { v4 as uuidv4 } from "uuid";
import { Attachements } from "../attachements";
import { vehicule } from "./innertab";
import { Dropzone } from "@mantine/dropzone";
import { dropzoneChildren } from "../../addVehiculeForm/uploadDropzone";
import { DatePicker } from "@mantine/dates";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { CgDetailsMore } from "react-icons/cg";

interface CarteGProps {
  vehicule_id: string;
  carteGrise: typeof vehicule.carte_grise;
  carteGrise_attachements: Array<typeof vehicule_attachement_mockup>;
}

const CarteG: React.FC<CarteGProps> = ({
  vehicule_id,
  carteGrise,
  carteGrise_attachements,
}) => {
  const theme = useMantineTheme();
  const [add_CarteG] = useAdd_carte_griseMutation({});
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation({});
  const [update_CarteG] = useUpdate_carte_griseMutation({});
  const [attachements, SetAttachements] = useState<File[]>();
  const [disabled, SetDisabled] = useState(true);
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

  const handleAdd = () => {
    if (!form.validate().hasErrors) {
      form.setFieldValue("carte_grise_id", "CG#" + uuidv4());
      add_CarteG({ vehicule_id: vehicule_id, carte_grise: form.values })
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Ajout CarteGrise",
            title: "Success",
            autoClose: 5000,
            message: `CarteGrise de vehicule avec id : ${vehicule_id.slice(
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
      update_CarteG(form.values)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Update CarteGrise",
            title: "Success",
            autoClose: 5000,
            message: `CarteGrise de vehicule avec id : ${vehicule_id.slice(
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
      categories: "CG",
    })
      .unwrap()
      .then((payload) => {
        showNotification({
          id: "Ajout CarteGriseAttachement",
          title: "Success",
          autoClose: 5000,
          message: `Les Attachements de CarteGrise de vehicule avec id : ${vehicule_id.slice(
            0,
            9
          )} on mis a jour`,
          color: "green",
          icon: <TiTick />,
        });
      });
  };

  useEffect(() => {
    if (carteGrise !== null) {
      form.setValues({
        carte_grise_id: carteGrise.carte_grise_id,
        adresse: carteGrise.adresse,
        activite: carteGrise.activite,
        matricule_fiscale: carteGrise.matricule_fiscale,
        genre: carteGrise.genre,
        num_serie_type: carteGrise.num_serie_type,
        attachement: carteGrise.attachement,
        date_mise_circulation: new Date(carteGrise.date_mise_circulation),
        vehicule_id: carteGrise.vehicule_id,
      });
    }
  }, []);

  return (
    <>
      {carteGrise === null ? (
        <Text color="red">
          Cette vehicule ne contient pas les informations de carteGrise nécessaire
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
          <Group my="md" sx={{ float: "right" }}>
            {carteGrise === null ? (
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
          {carteGrise_attachements.length === 0 ? (
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
            <Attachements vehicules={carteGrise_attachements} />
          )}
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default CarteG