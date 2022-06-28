import { Box, Button, Group, NumberInput, Tabs, Text, TextInput, useMantineTheme } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { vehicule_attachement_mockup } from "..";
import { useAdd_vehiculeItMutation, useAdd_vehicule_attachementsMutation, useUpdate_vehicule_itMutation } from "../../../../redux/services/endpoints/vehicule.endpoint";
import { schema_VehiculeIT } from "../../addVehiculeForm/schemas";
import { v4 as uuidv4 } from "uuid";
import { Attachements } from "../attachements";
import { vehicule } from "./innertab";
import { Dropzone } from "@mantine/dropzone";
import { dropzoneChildren } from "../../addVehiculeForm/uploadDropzone";
import { CgDetailsMore } from "react-icons/cg";
import { AiOutlineFileText } from "react-icons/ai";

interface VehiculeItProps {
  vehicule_id: string;
  vehicule_it : typeof vehicule.vehicule_it;
  vehiculeIT_attachements: Array<typeof vehicule_attachement_mockup>;
}

const VehiculeIt:React.FC<VehiculeItProps> = ({vehicule_id,vehicule_it,vehiculeIT_attachements}) => {
  const theme = useMantineTheme();
  const [add_vehiculeIt] = useAdd_vehiculeItMutation({});
  const [add_vehicule_attachements] = useAdd_vehicule_attachementsMutation({});
  const [update_vehiculeIT] = useUpdate_vehicule_itMutation({});
  const [attachements, SetAttachements] = useState<File[]>();
  const [disabled, SetDisabled] = useState(true);
  const form = useForm({
    schema: joiResolver(schema_VehiculeIT),
    initialValues: {
      vit_id:'',
      motorisation: '',
      pf: 0,
      moteur:'',
      volume_reservoire:0,
      marque: '',
      modele:'',
    }
  })

  const handleAdd = () =>{
    if(!form.validate().hasErrors){
      form.setFieldValue("vit_id","VIT#" + uuidv4())
      add_vehiculeIt({vehicule_id:vehicule_id,vehicule_it:form.values})
      .unwrap()
      .then((data)=>showNotification({
        id:"Ajout VehiculeIT",
        title:"Success",
        autoClose: 5000,
        message: `Information Technique de vehicule avec id : ${vehicule_id.slice(0,9)} on mis a jour`,
        color: "green",
        icon: <TiTick />
      }))
      .catch((error)=>console.log(error))
    }
  }

  const handleUpdate = () =>{
    if(!form.validate().hasErrors){
      update_vehiculeIT(form.values)
      .unwrap()
      .then((data) => showNotification({
        id:"Update VehiculeIT",
        title:"Success",
        autoClose: 5000,
        message: `Information Technique de vehicule avec id : ${vehicule_id.slice(0,9)} on mis a jour`,
        color: "green",
        icon: <TiTick />
      }))
      .catch((error) => console.log(error));
    }
  }

  const handleFileUpload = () => {
    const new_attachements = new FormData();
    attachements?.map((file) =>
      new_attachements.append("files", file, file.name)
    );
    add_vehicule_attachements({
      vehicule_id: vehicule_id,
      files: new_attachements,
      categories: "IT",
    })
      .unwrap()
      .then((payload) => {
        showNotification({
        id:"Ajout VehiculeITAttachement",
        title:"Success",
        autoClose: 5000,
        message: `Les Attachements d'information technique de vehicule avec id : ${vehicule_id.slice(0,9)} on mis a jour`,
        color: "green",
        icon: <TiTick />
        })
      });
  }

  useEffect(() => {
    if(vehicule_it !== null){
      form.setValues({
        vit_id: vehicule_it.vit_id,
        motorisation:vehicule_it.motorisation,
        pf:vehicule_it.pf,
        moteur:vehicule_it.moteur,
        volume_reservoire:vehicule_it.volume_reservoire,
        marque: vehicule_it.marque,
        modele: vehicule_it.modele
      })
    }
  },[])

  return (
      <>
      {vehicule_it === null ?
        <Text color="red">Cette vehicule ne contient pas les informations technique nécessaire !</Text> :
        <></>
      }
          <Tabs color="violet" grow variant="outline">
          <Tabs.Tab label="Infromation" icon={<CgDetailsMore />}>
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
            </form>
            <Group my="md" sx={{ float: "right" }}>
              {vehicule_it === null ?
                <Button type="button" color={"green"} onClick={()=> handleAdd()}>
                  Ajouter
                </Button>
              :
                <Button type="button" color={"green"} onClick={() => handleUpdate()}>
                  Modifier
                </Button>
              }
            </Group>
          </Tabs.Tab>
          <Tabs.Tab label="Attachement" icon={<AiOutlineFileText />}>
            {vehiculeIT_attachements.length === 0 ?
              <Box>
                <Text color="red" my={15}>Il n'y a pas des attachements d'informations technique</Text>
                <Dropzone
                accept={[
                  "image/png",
                  "image/jpeg",
                  "image/svg+xml",
                  "image/gif",
                  "application/pdf",
                ]}
                onDrop={(files) => {SetAttachements(files);SetDisabled((o)=> !o)}}
                onReject={(files) => console.log("rejected files", files)}>
                  {(status) => dropzoneChildren(status, theme)}
                </Dropzone>
                <Group my="md" sx={{ float: "right"}}>
                <Button onClick={() => handleFileUpload()} disabled={disabled}>Ajouter Attachements</Button>
                </Group>
              </Box>
              :
              <Attachements vehicules={vehiculeIT_attachements} />
            }
          </Tabs.Tab>
        </Tabs>
      </>
    )
}

export default VehiculeIt;