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
import { useAdd_gpMutation } from "../../../redux/services/endpoints/employee.endpoint";
import { GestionnaireParcPayload } from "../../../redux/services/interfaces/user.interface";



const GP_schema = Joi.object({
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

export const GestionnaireParcForm = () => {
  const [add_gp] = useAdd_gpMutation({});
  const form = useForm({
    schema: joiResolver(GP_schema),
    initialValues: {
      id: "",
      cin: 0,
      nom: "",
      prenom: "",
      date_naissance: new Date(),
      num_telephone: 0,
      email: "",
      password: "",
      role: "Ges#7b26641d-a4b2-4c24-a17b-3c189023f26e",
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    let errors = {}
    if (!form.validate().hasErrors) {
      values.id = "EMP#" + uuid();
      const payload: GestionnaireParcPayload = {
        employee: form.values,
        gestionnaire: {
          gestionnaire_id: "Ges#" + uuid(),
          employee_id: form.values.id,
        },
        
      };
      add_gp(payload)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Ajout Mecanicien",
            title: "Success",
            autoClose: 5000,
            message: `Gestionaire de parc ${payload.employee.nom} ${payload.employee.prenom} a été ajouter avec success`,
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
