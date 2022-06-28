import {
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGet_mecaniciensQuery } from "../../../../../redux/services/endpoints/employee.endpoint";
import { useAdd_planMutation } from "../../../../../redux/services/endpoints/maintenance.enpoint";
import { CreatePlanDto } from "../../../../../redux/services/interfaces/maintenance.interface";
import { mecanicienInitialState } from "../../../../Problemes/probleme/data.const";
import { mechanicData, periodiciteData, typeData } from "./data.const";
import { v4 as uuid } from "uuid";
import { showNotification } from "@mantine/notifications";
import { TiTick } from "react-icons/ti";
const NewPlan = () => {
  const { vehicule_id } = useParams();
  const [get_mecaniciens] = useLazyGet_mecaniciensQuery({});
  const [add_plan] = useAdd_planMutation({});
  const [data, setData] = useState([mecanicienInitialState]);
  const form = useForm({
    initialValues: {
      concerned_equipement: vehicule_id!,
      type: "",
      nbr_repetition: 0,
      assigned_to: "",
      periodicite: "",
      mots_cle: "",
    },
  });

  const handleData = () => {
    get_mecaniciens({})
      .unwrap()
      .then((data) => setData(data));
    data.forEach((employee) => {
      if (
        mechanicData.findIndex(
          (object) => object.key === employee.mecancien_id
        ) === -1
      ) {
        mechanicData.push({
          key: employee.mecancien_id,
          label: employee.employee.nom + " " + employee.employee.prenom,
          value: employee.mecancien_id,
          disabled: false,
        });
      }
    });
  };
  const handleSubmit = () => {
    if (!form.validate().hasErrors) {
      const payload: CreatePlanDto = {
        pm_id: "PM#" + uuid(),
        ...form.values,
      };
      add_plan(payload)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Ajout Assurance",
            title: "Success",
            autoClose: 5000,
            message: `Plan de maintenance avec id: ${payload.pm_id.slice(
              0,
              9
            )} de vehicule avec id: ${vehicule_id?.slice(
              0,
              9
            )} a été entregistré avec success`,
            color: "green",
            icon: <TiTick />,
          })
        )
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    handleData();
  }, [data]);
  return (
    <Group position="center">
      <Card sx={{ width: "75%" }} shadow="md">
        <Title order={3} mb={10}>
          Nouveau Plan de maintenance
        </Title>
        <form>
          <Select
            label="Type"
            data={typeData}
            {...form.getInputProps("type")}
            clearable
          />
          <NumberInput
            label="N° repetition"
            {...form.getInputProps("nbr_repetition")}
            min={0}
          />
          <Select
            label="Assigné a"
            placeholder="Assigner ce plan au mecanicien"
            data={Array.from(new Set(mechanicData))}
            clearable
            {...form.getInputProps("assigned_to")}
          />
          <Select
            label="Périodicité"
            data={periodiciteData}
            clearable
            {...form.getInputProps("periodicite")}
          />
          <TextInput label="Mots clé" {...form.getInputProps("mots_cle")} />
        </form>
        <Group position="right" my={15}>
          <Button color="green" onClick={() => handleSubmit()}>
            Sauvegarder
          </Button>
        </Group>
      </Card>
    </Group>
  );
};

export default NewPlan;
