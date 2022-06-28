import { Box, Button, Group, Title, useMantineTheme } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import BonTravailDataTable from "./btDataTable";

const BonTravailList = () =>{
    return (
    <Box p={5}>
        <Group sx={{ justifyContent: "space-between"}} mt="md"> 
            <Title order={4} sx={(theme) => ({
                color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black
            })}>
                Filtres:
            </Title>
        </Group>
        <BonTravailDataTable />
    </Box>
    )
}

export default BonTravailList;