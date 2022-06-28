import { Box, Button, Group, Title } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import EmployeeDataTable from "./dataTable";

function EmployeesList() {
    const location = useLocation();

    return(
        <Box p={5}>
            <Group sx={{justifyContent: "space-between"}} mt="md">
                <Title order={4} sx={(theme) =>({
                    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
                })}>Filtres: </Title>
                <Group>
                <Button component={Link} to={`${location.pathname}` + "/add_employee"} color="green">Ajouter Employee</Button>
                <Button component={Link} to={`${location.pathname}` + "/add_role"}>Ajouter Role</Button>
                </Group>
            </Group>
           <EmployeeDataTable />
        </Box>
    )
}
export default EmployeesList;