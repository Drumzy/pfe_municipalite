import { Box, Stepper, Title, Button, Group } from "@mantine/core";
import { useState } from "react";
import { Identification } from "./Identification";
import { VehiculeIT } from "./VehiculeIT";
import { Assurance } from "./Assurance";
import { CarteGrise } from "./CarteGrise";
import { Vignette } from "./Vignette";

function AddVehicule() {
  const [disabled, setDisabled] = useState(true);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const forms_order = [
    <Identification toggleButton={setDisabled} current={disabled} />,
    <VehiculeIT toggleButton={setDisabled} current={disabled} />,
    <Assurance toggleButton={setDisabled} current={disabled} />,
    <CarteGrise toggleButton={setDisabled} current={disabled} />,
    <Vignette toggleButton={setDisabled} current={disabled} />,
  ];
  return (
    <Group position="center">
    <Box sx={{ maxWidth: 600, display: "flex", flexDirection: "column" }}>
      <Stepper active={active} breakpoint="sm" mx="sm">
        <Stepper.Step>
          <Title
            order={3}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            Identification
          </Title>
        </Stepper.Step>
        <Stepper.Step>
          <Title
            order={3}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            Inforamtion Technique{" "}
          </Title>
        </Stepper.Step>
        <Stepper.Step>
          <Title
            order={3}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            {" "}
            Assurance
          </Title>
        </Stepper.Step>
        <Stepper.Step>
          <Title
            order={3}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            Carte Grise
          </Title>
        </Stepper.Step>
        <Stepper.Step>
          <Title
            order={3}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            {" "}
            Vignette
          </Title>
        </Stepper.Step>
      </Stepper>
      {forms_order[active]}
      <Group position="right" mt="md">
        <Button
          onClick={prevStep}
          disabled={active === 0 ? true : false}
          color={"violet"}
        >
          {" "}
          Ètape Précédent
        </Button>
        <Button
          onClick={() => {
            nextStep();
            setDisabled(!disabled);
          }}
          disabled={disabled}
          color="green"
        >
          {active <= 3 ? <>Etape Suivante</> : <>Sauvgarder</>}
        </Button>
      </Group>
    </Box>
    </Group>
  );
}
export default AddVehicule;
