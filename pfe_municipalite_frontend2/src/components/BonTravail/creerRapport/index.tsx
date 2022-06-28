import { Button, Card, CloseButton, Group } from "@mantine/core";
import { formList, useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { useCreate_rapportMutation } from "../../../redux/services/endpoints/bn_travail.endpoint";
import Causes from "./causes";
import Notes from "./notes";
import Reparations from "./reparations";
import {v4 as uuid} from "uuid";
interface RapportProps  {
    bt_id: string;
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}
const RapportInterventionForm:React.FC<RapportProps> = (props) => {

    const [create_rapport] = useCreate_rapportMutation({});
    const form = useForm({
        initialValues:{
            ri_id: "",
            bt_id: "",
            causes: formList([{name:"", active: false, key: randomId()}]),
            reparations: formList([{name:"", active: false, key: randomId()}]),
            notes: formList([{name:"", active: false, key: randomId()}]),
        },
        validate :{
            causes: {
                name: (value) => (value.length < 2 ? 'Ce champ doit etre rempli' : null)
            },
            reparations: {
                name: (value) => (value.length < 2 ? 'Ce champ doit etre rempli' : null)
            },
            notes: {
                name: (value) => (value.length < 2 ? 'Ce champ doit etre rempli' : null)
            }
        }
    })
    const handleSubmit = (values: typeof form.values) => {
        if(!form.validate().hasErrors){
            const payload = values;
            payload.ri_id = "RI#"+uuid();
            payload.bt_id = props.bt_id;
            create_rapport(payload).unwrap().then((data) =>
            showNotification({
                id: "Rapport Intervention",
                autoClose: 5000,
                title: "Success",
                message: `Rapport d'intervention pour le bon de travail avec l'id: ${props.bt_id} est créer`,
                color: "green",
                icon: <TiTick />
            })
            ).catch((error) => showNotification({
                id:"Rapport Intervention Error",
                autoClose: 5000,
                title: "Erreur",
                message: `${error.data.message}`,
                color: "red",
                icon: <ImCross />
            }))
        }
    }
    return (
        <Card mx="md" hidden={props.showForm}>
            <Group position="right">
                <CloseButton onClick={() => props.setShowForm(!props.showForm)}></CloseButton>
            </Group>
            <form>
                <Causes form={form} />
                <Reparations form={form} />
                <Notes form={form}/>
            </form>
            <Group position="right" mt="md">
                <Button onClick={() => handleSubmit(form.values)}>Sauvegarder</Button>
            </Group>
        </Card>
    )
}
export default RapportInterventionForm;