import { ActionIcon, TextInput, Group, Button, Box, Text } from "@mantine/core";
import { FormList } from "@mantine/form/lib/form-list/form-list";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { randomId } from "@mantine/hooks";
import { BiTrash } from "react-icons/bi";

interface NoteProps {
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
const Notes:React.FC<NoteProps> = (props) => {
    const notesFields = props.form.values.notes.map((item, index) =>(
        <Group key={item.key} mt="xs">
            <TextInput 
            placeholder={`Note : ${index}`}
            required
            sx={{ flex :1}}
            {...props.form.getListInputProps('notes', index, 'name')}/>
            <ActionIcon color="red" variant="hover" onClick={() => props.form.removeListItem("notes", index)}>
                <BiTrash size={16}/>
            </ActionIcon>
        </Group>
    ))

    return(
        <Box mx="auto" mt="xs">
            {notesFields.length > 0 ? (
                <Group mb="xs">
                    <Text weight={500} size="sm" sx={{ flex: 1}}>Notes: {"N° Total: " + `${props.form.values.notes.length}`}</Text>
                </Group>
                    ): (
                        <Text color="dimmed">Aucune note</Text>
                    )}
                    {notesFields}
            <Group position="left" mt="md">
                <Button onClick={() => props.form.addListItem('notes',{name:"", active:false,key: randomId()})}>Ajouter défaut</Button>
            </Group>
        </Box>
    )
}
export default Notes;