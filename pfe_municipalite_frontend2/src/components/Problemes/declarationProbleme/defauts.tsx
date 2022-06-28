import { ActionIcon, TextInput, Group, Button, Box, Text } from "@mantine/core";
import { FormList } from "@mantine/form/lib/form-list/form-list";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { randomId } from "@mantine/hooks";
import { Key } from "react";
import { BiTrash } from "react-icons/bi";

interface DefautProps {
    form: any;
}

const Defauts:React.FC<DefautProps> = (props) => {
    const defautsFields = props.form.values.defauts.map((item: { key: Key | null | undefined; }, index: any) =>(
        <Group key={item.key} mt="xs">
            <TextInput 
            placeholder={`Défault : ${index}`}
            required
            sx={{ flex :1}}
            {...props.form.getListInputProps('defauts', index, 'name')}/>
            <ActionIcon color="red" variant="hover" onClick={() => props.form.removeListItem("defauts", index)}>
                <BiTrash size={16}/>
            </ActionIcon>
        </Group>
    ))

    return(
        <Box mx="auto" mt="xs">
            {defautsFields.length > 0 ? (
                <Group mb="xs">
                    <Text weight={500} size="sm" sx={{ flex: 1}}>Défauts constatées: {"N° Total: " + `${props.form.values.defauts.length}`}</Text>
                </Group>
                    ): (
                        <Text color="dimmed">Aucune Défaut</Text>
                    )}
                {defautsFields}
            <Group position="left" mt="md">
                <Button onClick={() => props.form.addListItem('defauts',{name:"", active:false, key: randomId()})}>Ajouter défaut</Button>
            </Group>
        </Box>
    )
}
export default Defauts;