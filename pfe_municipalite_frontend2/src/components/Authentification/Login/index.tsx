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

const dataRole = [
  { label: "Gestionnaire Parc", value: "Gestionnaire Parc" },
  { label: "Admin", value: "Admin" },
  { label: "Conducteur", value: "Conducteur" },
  { label: "Mecanicien", value: "Mecanicien" },
];

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(7).max(31).required(),
  role: Joi.string()
    .valid(...["Gestionnaire Parc", "Admin", "Conducteur", "Mecanicien"])
    .required(),
});

export const Login = () => {
  const user_main = localStorage.getItem("user");
  const form = useForm({
    schema: joiResolver(schemaLogin),
    initialValues: {
      email: "",
      password: "",
      role: "",
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
     login({
      email: values.email,
      password: values.password,
      role: values.role,
    })
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
        navigate("/dashboard");
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
          height: "75vh",
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
            sx={{ height: 250 }}
            color={"violet"}
          />
        </Card.Section>
        <Card.Section>
          <Title order={2}>Login</Title>
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
              data={dataRole}
            />
            {error ? <Text color="red">{error.data.message}</Text> : null}
            <Group position="right" mt="md">
              <Button type="submit" radius="xl" color={"violet"}>
                Login
              </Button>
            </Group>
          </form>
        </Card.Section>
      </Card>
    </Box>
  );
};
