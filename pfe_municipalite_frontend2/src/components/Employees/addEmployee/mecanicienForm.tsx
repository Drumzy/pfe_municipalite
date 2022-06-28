import {
  Box,
  Button,
  Group,
  InputWrapper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { joiResolver, useForm } from "@mantine/form";
import { PinInput } from "@mantine/labs";
import { showNotification } from "@mantine/notifications";
import Joi from "joi";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { v4 as uuid } from "uuid";
import { useAdd_mcMutation } from "../../../redux/services/endpoints/employee.endpoint";
import { MecanicienPayLoad } from "../../../redux/services/interfaces/user.interface";

const MC_schema = Joi.object({
  id: Joi.string().allow(""),
  cin: Joi.number().required(),
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  date_naissance: Joi.date().required(),
  num_telephone: Joi.number().required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().required(),
  role: Joi.string().allow(""),
});

export const MecanicienForm = () => {
  const [add_mc] = useAdd_mcMutation({});
  const form = useForm({
    schema: joiResolver(MC_schema),
    initialValues: {
      id: "",
      cin: 0,
      nom: "",
      prenom: "",
      date_naissance: new Date(),
      num_telephone: 0,
      email: "",
      password: "",
      role: "Mec#5d2b99a8-e396-4a5b-a414-cf41828f017b",
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    if (!form.validate().hasErrors) {
      values.id = "EMP#" + uuid();
      const payload: MecanicienPayLoad = {
        employee: form.values,
        mecanicien: {
          mecancien_id: "Mec#" + uuid(),
          employee_id: form.values.id,
        },
      };
      add_mc(payload)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Ajout Mecanicien",
            title: "Success",
            autoClose: 5000,
            message: `Mecanicien ${payload.employee.nom} ${payload.employee.prenom} a été ajouter avec success`,
            color: "green",
            icon: <TiTick />,
          })
        )
        .catch((error) => set_check_email(error.data.message));
      console.log(payload);
    }
  };
  const [check_email,set_check_email]=useState("");
  return (
    <Group position="center" mx="xl">
      <form>
        <InputWrapper label="N° Cin">
          <PinInput
            type="number"
            size="md"
            length={8}
            {...form.getInputProps("cin")}
          />
        </InputWrapper>
        <TextInput label="Nom" {...form.getInputProps("nom")} />
        <TextInput label="Prénom" {...form.getInputProps("prenom")} />
        <DatePicker
          label="Date Naissance"
          {...form.getInputProps("date_naissance")}
        />
        <InputWrapper label="N° Téléphone">
          <PinInput
            type="number"
            size="md"
            length={8}
            {...form.getInputProps("num_telephone")}
          />
        </InputWrapper>
        <TextInput label="Email" {...form.getInputProps("email")} />
        <span className="mantine-1ljcvvj">{check_email}</span>
        <PasswordInput
          label="Mot de Passe"
          {...form.getInputProps("password")}
        />
        <Group position="right" mt="md">
          <Button onClick={() => handleSubmit(form.values)}>Sauvegarder</Button>
        </Group>
      </form>
    </Group>
  );
};
