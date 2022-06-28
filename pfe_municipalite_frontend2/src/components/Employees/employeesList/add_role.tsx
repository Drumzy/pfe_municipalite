import { Box, Button, Card, Group, Select, Title } from "@mantine/core";
import { joiResolver, useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Joi from "joi";
import { TiTick } from "react-icons/ti";
import { useCreate_roleMutation } from "../../../redux/services/endpoints/employee.endpoint"

const roles = [
    {label: "Conducteur", value: "Conducteur"},
    {label: "Admin", value: "Admin"},
    {label: "Mecanicien", value: "Mecanicien"},
    {label: "Gestionnaire Parc", value: "Gestionnaire Parc"}
]
const schema_role = Joi.object({
    role: Joi.string().valid(...["Conducteur", "Admin", "Mecanicien", "Gestionnaire Parc"]).required(),
})
export const AddRole = () => {
    const [create_role] = useCreate_roleMutation({});
    const form = useForm({
        schema: joiResolver(schema_role),
        initialValues:{
            role: "",
        }
    })
    function handleSubmit(values: typeof form.values){
        if(!form.validate().hasErrors){
            create_role(values).unwrap().then((data) =>
            showNotification({
                id: "Role Creation",
                autoClose: 5000,
                title: "Succees",
                message: `Role : ${values.role} est créer`,
                color: "green",
                icon: <TiTick />
            }))
            .catch((error) => console.log(error))
        }
    }
    return (
        <Box sx={{ width: "600px"}} mx="sm">
            <Card>
            <Title order={4}>Creation de role</Title>
            <form>
                <Select label="Role" data={roles} {...form.getInputProps("role")}/>
            </form>
            
            <Group position="right" mt="md">
                <Button type="button" onClick={() => handleSubmit(form.values)} color="violet">Créer</Button>
            </Group>
            </Card>
        </Box>
    )
}