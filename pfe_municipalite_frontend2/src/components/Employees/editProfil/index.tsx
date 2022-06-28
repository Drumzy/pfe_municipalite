import {
  Button,
  Card,
  Group,
  InputWrapper,
  NumberInput,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useToggle } from "@mantine/hooks";
import { PinInput } from "@mantine/labs";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useParams } from "react-router-dom";
import {
  useLazyGet_employeeQuery,
  useUpdate_employeeMutation,
} from "../../../redux/services/endpoints/employee.endpoint";
import { employeeInitialState } from "../employeesList/initialState.consts";

const EditProfile = () => {
  const { id } = useParams();
  const [user, SetUser] = useState(employeeInitialState);
  const [get_employee] = useLazyGet_employeeQuery({});
  const [available, toggle] = useToggle(true, [true, false]);
  const handle_data = () => {
    get_employee(id!)
      .unwrap()
      .then((data) => SetUser(data));
  };
  const [update_employee] = useUpdate_employeeMutation({});
  const form = useForm({
    initialValues: {
      nom: user.nom,
      cin: user.cin,
      prenom: user.prenom,
      date_naissance: new Date(),
      email: user.email,
      password: user.password,
      role_id: user.employeeType.type_id,
      num_telephone: user.num_telephone,
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    if (available !== true) {
      const payload = {
        ...values,
        id: user.id,
        cin: user.cin.toString(),
        employeeType: {
          type_id: user.employeeType.type_id,
          role: user.employeeType.role,
        },
      };
      update_employee(payload)
        .unwrap()
        .then((data) =>
          showNotification({
            id: "Edit Profil",
            autoClose: 5000,
            title: "Success",
            message: data?.message,
            color: "green",
            icon: <TiTick />,
          })
        );
    }
  };
  useEffect(() => {
    handle_data();
    form.setValues({
      nom: user.nom,
      cin: user.cin,
      prenom: user.prenom,
      email: user.email,
      role_id: user.employeeType.type_id,
      date_naissance: new Date(user.date_naissance),
      password: user.password,
      num_telephone: user.num_telephone,
    });
    const interval = setInterval(() => {
      handle_data();
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <Card>
      <Title order={3}> Modifier Profil</Title>
      <form>
        <NumberInput label="N° CIN" hideControls value={user.cin} disabled />
        <TextInput
          label="Nom"
          {...form.getInputProps("nom")}
          disabled={available}
        />
        <TextInput
          label="Prénom"
          {...form.getInputProps("prenom")}
          disabled={available}
        />
        <DatePicker
          label="Date Naissance"
          {...form.getInputProps("date_naissance")}
          disabled={available}
        />
        <NumberInput
          label="N° Téléphone"
          hideControls
          value={user.num_telephone}
          disabled={available}
        />
        <TextInput
          label="Email"
          {...form.getInputProps("email")}
          disabled={available}
        />
        <PasswordInput
          label="Mot de passe"
          {...form.getInputProps("password")}
          disabled={available}
        />

        <Group position="right" mt={20}>
          <Button color="violet" onClick={() => toggle()}>
            Modifier
          </Button>
          <Button
            color="green"
            onClick={() => handleSubmit(form.values)}
            disabled={available}
          >
            Confirmer
          </Button>
        </Group>
      </form>
    </Card>
  );
};
export default EditProfile;
