import { Box, Button, Group, Title } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import InterventionDataTable from "./interventionDataTable";

function DemandesList() {
  const location = useLocation();

  return (
    <Box p={5}>
      <Group sx={{ justifyContent: "space-between" }} mt="md">
        <Title
          order={4}
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          })}
        >
          Filtres:
        </Title>
        <Button
          component={Link}
          to={`${location.pathname}` + "/declare_probleme"}
          color="green"
        >
          Déclarer une probleme
        </Button>
      </Group>
      <InterventionDataTable />
    </Box>
  );
}

export default DemandesList;
