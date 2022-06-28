import { Box, Button, Group, Title } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import DataTable from "./dataTable";

function VehiculesList(){
    const location = useLocation();
    return(
    <Box p={5}>
        <Group sx={{justifyContent: "space-between"}} mt="md">
            <Title order={4} sx={(theme) => ({
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          })}>Filtres: </Title>
        <Button component={Link} to={`${location.pathname}`+ "/add_vehicule"} color="green">Ajouter Vehicule</Button>
        </Group>
        <DataTable/>
    </Box>
    )
}
export default VehiculesList;
