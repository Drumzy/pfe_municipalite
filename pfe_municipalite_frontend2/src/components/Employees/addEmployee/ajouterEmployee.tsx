import { Box, Card, Group, SegmentedControl, Tabs, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { RoleInterface } from "../../../redux/services/interfaces/user.interface";
import { AdminForm } from "./adminForm";
import { ConducteurForm } from "./conducteurForm";
import { GestionnaireParcForm } from "./gpForm";
import { MecanicienForm } from "./mecanicienForm";

interface role {
  label: string;
  value: string;
}

const dataInitialState = [{ type_id: "", role: "" }];
const rolesInitialState = {
  roles: [{ label: "", value: "", disabled: true }],
};
const rolesActiviationInitialState = {
  gp_form: true,
  cd_form: true,
  mc_form: true,
  adm_form: true,
};
export const AjouterEmployee = () => {
  const [view, setView] = useState("");
  const [{ gp_form, cd_form, mc_form, adm_form }, setActiviationState] =
    useState(rolesActiviationInitialState);
  const [data, setData] = useState<Array<RoleInterface>>(dataInitialState);
  const [{ roles }, setState] = useState(rolesInitialState);


  const handleActiveView = (value_from: string) => {
    if (value_from.includes("Con")) {
      setActiviationState((prevState) => ({
        ...prevState,
        ["cd_form"]: false,
      }));
    } else {
      setActiviationState((prevState) => ({ ...prevState, ["cd_form"]: true }));
    }
    if (value_from.includes("Mec")) {
      setActiviationState((prevState) => ({
        ...prevState,
        ["mc_form"]: false,
      }));
    } else {
      setActiviationState((prevState) => ({ ...prevState, ["mc_form"]: true }));
    }
  };

  const handle_data = () => {
    data.forEach((element) => {
      if (
        roles.findIndex((object) => object.value === element.type_id) === -1
      ) {
        setState((prevState) => ({
          ...prevState,
          roles: [
            ...roles,
            { label: element.role, value: element.type_id, disabled: false },
          ],
        }));
      }
    });
  };

  useEffect(() => {
    handle_data();
    const interval = setInterval(() => {
      handle_data();
    }, 5000);

    return () => clearInterval(interval);
  }, [data, roles]);

  return (
    <Group position="center">
      <Card>
        <Group position="center" mt="md">
          <Tabs color="violet" grow position="center">
          <Tabs.Tab label="Gestionnaire Parc" >
            <GestionnaireParcForm/>
            </Tabs.Tab>
            <Tabs.Tab label="Mecanicien" >
            <MecanicienForm  />
            </Tabs.Tab>
            <Tabs.Tab label="Conducteur" >
            <ConducteurForm/>
            </Tabs.Tab>
          </Tabs>
        </Group>
      </Card>
    </Group>
  );
};
