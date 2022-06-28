import { ActionIcon, TextInput, Group, Button, Box, Text } from "@mantine/core";
import { FormList } from "@mantine/form/lib/form-list/form-list";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { randomId } from "@mantine/hooks";
import { BiTrash } from "react-icons/bi";

interface ReparationProps {
    form: UseFormReturnType<{
    ri_id: string;
    bt_id:string;
    causes: FormList<{
        name: string;
        active: boolean;
        key: string;
    }>;
    reparations: FormList<{
        name: string;
        active: boolean;
        key: string;
    }>;
    notes: FormList<{
        name: string;
        active: boolean;
        key: string;
    }>;
    }>
}
const Reparations:React.FC<ReparationProps> = (props) => {
    const reparationsFields = props.form.values.reparations.map((item, index) =>(
        <Group key={item.key} mt="xs">
            <TextInput 
            placeholder={`Réparation : ${index}`}
            required
            sx={{ flex :1}}
            {...props.form.getListInputProps('reparations', index, 'name')}/>
            <ActionIcon color="red" variant="hover" onClick={() => props.form.removeListItem("reparations", index)}>
                <BiTrash size={16}/>
            </ActionIcon>
        </Group>
    ))

    return(
        <Box mx="auto" mt="xs">
            {reparationsFields.length > 0 ? (
                <Group mb="xs">
                    <Text weight={500} size="sm" sx={{ flex: 1}}>Réparations: {"N° Total: " + `${props.form.values.reparations.length}`}</Text>
                </Group>
                ): (
                    <Text color="dimmed">Aucune répration</Text>
                )}
                    {reparationsFields}
            <Group position="left" mt="md">
                <Button onClick={() => props.form.addListItem('reparations',{name:"", active:false,key: randomId()})}>Ajouter réparation</Button>
            </Group>
        </Box>
    )
}
export default Reparations;