import {
  Box,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Image,
  Divider,
  Select,
  Card,
  InputWrapper,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../redux/services/endpoints/auth.endpoint";
import {
  resetCredentials,
  setCredentials,
} from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../../../images/municipalite-grombalia1.png";
import { joiResolver, useForm } from "@mantine/form";
import Joi from "joi";
import { PinInput } from "@mantine/labs";
import { DatePicker } from "@mantine/dates";

const dataRole = [
  { label: "Gestionnaire Parc", value: "Adm#3074ed6d-3a5b-462d-aa7f-c4ca62e24583" },
  { label: "Admin", value: "Ges#93b8e0d5-9ab3-4d6b-8a09-f73ceddb942a" },
];

const schemaRegistre = Joi.object({
  id: Joi.string().allow(""),
  cin: Joi.number().required(),
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  date_naissance: Joi.date().required(),
  num_telephone: Joi.number().required(),
  num_permis_conduire: Joi.number().allow(),
  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().required(),
  role: Joi.string()
    .valid(...["Gestionnaire Parc", "Admin"])
    .required(),
  
});

export const Register = () => {
  const user_main = localStorage.getItem("user");
  const form = useForm({
    schema: joiResolver(schemaRegistre),
    initialValues: {
      id: "",
      cin: 0,
      nom: "",
      prenom: "",
      date_naissance: new Date(),
      num_telephone: 0,
      email: "",
      password: "",
      role:""
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState({
    status: "",
    data: { statusCode: 0, message: "", error: "" },
  });
  const [login] = useLoginMutation();
  const handleSubmit = async (values: typeof form.values) => {
    await login({
      email: values.email,
      password: values.password,
      role: values.role,
    })
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        navigate("/");
      })
      .catch((error) => {
        setError(error);
        dispatch(resetCredentials());
      });
  };
  useEffect(() => {
    if (user_main) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
      }}
    >
      <Card
        shadow="lg"
        sx={{
          display: "flex",
          width: "75%",
          height: "100vh",
          justifyContent: "space-evenly",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Card.Section>
          <Image
            width={250}
            height={250}
            mt="xl"
            src={Logo}
            alt="Random unsplash image"
          />
        </Card.Section>
        <Card.Section>
          <Divider
            size="sm"
            orientation="vertical"
            sx={{ height: 550 }}
            color={"violet"}
          />
        </Card.Section>
        <Card.Section>
          <Title order={2}>Inscription</Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <InputWrapper label="N° Cin">
              <PinInput type="number" size="md" length={8} />
            </InputWrapper>
            <TextInput
              required
              label="Nom"
              placeholder="Votre Nom"
              radius="xl"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              label="Prénom"
              placeholder="Votre Prénom"
              radius="xl"
              {...form.getInputProps("email")}
            />
            <InputWrapper label="Numero Telephone">
              <PinInput type="number" size="md" length={8} />
            </InputWrapper>
            <DatePicker
              label="Date naissance"
              placeholder="Selectionner une date"
            />
            <TextInput
              required
              label="Email"
              placeholder="votre@email.com"
              radius="xl"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              required
              label=" Mot de Passe"
              placeholder="Votre mot de passe"
              radius="xl"
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <BiShow size={size} /> : <BiHide size={size} />
              }
              {...form.getInputProps("password")}
            />
            <Select
              label="Role"
              {...form.getInputProps("role")}
              required
              placeholder="Choisir un role"
              data={dataRole}
            />
            {error ? <Text color="red">{error.data.message}</Text> : null}
            <Group position="right" mt="md">
              <Button type="submit" radius="xl" color={"violet"}>
                Inscrire
              </Button>
            </Group>
          </form>
        </Card.Section>
      </Card>
    </Box>
  );
};
