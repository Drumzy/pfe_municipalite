import { ActionIcon, TextInput, Group, Button, Box, Text } from "@mantine/core";
import { FormList } from "@mantine/form/lib/form-list/form-list";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { randomId } from "@mantine/hooks";
import { BiTrash } from "react-icons/bi";

interface CauseProps {
    form: UseFormReturnType<{
    ri_id: string;
    bt_id: string;
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
const Causes:React.FC<CauseProps> = (props) => {
    const causesFields = props.form.values.causes.map((item, index) =>(
        <Group key={item.key} mt="xs">
            <TextInput 
            placeholder={`Cause : ${index}`}
            required
            sx={{ flex :1}}
            {...props.form.getListInputProps('causes', index, 'name')}/>
            <ActionIcon color="red" variant="hover" onClick={() => props.form.removeListItem("causes", index)}>
                <BiTrash size={16}/>
            </ActionIcon>
        </Group>
    ))

    return(
        <Box mx="auto" mt="xs">
            {causesFields.length > 0 ? (
                <Group mb="xs">
                    <Text weight={500} size="sm" sx={{ flex: 1}}>Causes: {"N° Total: " + `${props.form.values.causes.length}`}</Text>
                </Group>
                ): (
                    <Text color="dimmed">Aucune cause</Text>
                )}
                    {causesFields}
            <Group position="left" mt="md">
                <Button onClick={() => props.form.addListItem('causes',{name:"", active:false,key: randomId()})}>Ajouter cause</Button>
            </Group>
        </Box>
    )
}
export default Causes;