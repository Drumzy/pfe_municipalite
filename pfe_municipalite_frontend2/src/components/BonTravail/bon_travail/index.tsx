import { Box, Button, Card, Group, InputWrapper, List, Text, TextInput, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { MdReportProblem } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useLazyGet_bonTravailByIdQuery } from "../../../redux/services/endpoints/bn_travail.endpoint";
import { store } from "../../../redux/store";
import { BonTravailInitialState } from "../bt_list/initialState.const";
import RapportInterventionForm from "../creerRapport";
import ExportModal from "./exportModal";

const BonTravail = () => {
    const role = store.getState().auth.user?.employeeType.role;
    const {bt_id} = useParams();
    const [getBonTravail] = useLazyGet_bonTravailByIdQuery({});
    const [bon_travail, setBonTravail] = useState(BonTravailInitialState);
    const [showForm,SetShowForm] = useState(true)
    const handleData = () => {
        getBonTravail(bt_id!).unwrap().then((data) => {setBonTravail(data)});
        console.log(bon_travail);
    }

    useEffect(() => {
        handleData();
        const interval = setInterval(() => {
            handleData();
        },3000);
        return () => clearInterval(interval);
    },[bon_travail])
    
    return(
        <Box sx={{ width: "100%"}}>
            <Card  mx="md" mb="md">
                <Group align="flex-end" mb="sm">
                <Title order={4}>Bon de Travail: </Title>
                <Text color="blue" weight={700}>{bon_travail.bt_id}</Text>
                </Group>
                <TextInput label="Demande Associée" value={bon_travail.demandes[0].di_id.slice(0,11)} readOnly/>
                <TextInput label="Date Déclaration" value={new Date(bon_travail.date).toUTCString()} readOnly/>
                <TextInput label="Vehicule" value={bon_travail.equipement} readOnly/>
                <TextInput label="Résume" value={bon_travail.demandes[0].resume} readOnly/>
                <TextInput label="Résume" value={bon_travail.demandes[0].status} readOnly/>
                <InputWrapper label="Defauts Constatée">
                    <List withPadding>
                        {
                            bon_travail.demandes[0].defauts.map((defaut) => (
                                <List.Item icon={<MdReportProblem />}>{defaut.name}</List.Item>
                            ))
                        }
                    </List>
                </InputWrapper>
                {bon_travail.rapport_intervention !== null ?
                <Group position="right" mt="md">
                    <ExportModal demande={bon_travail.demandes[0]} employee={bon_travail.ouvries[0]} vehicule_id={bon_travail.equipement} />
                </Group>
                :
                <Group position="right" mt="md">
                    {role === "Gestionnaire Parc" ?
                        <Button disabled>Rapport en cours </Button> :
                        <Button onClick={() => SetShowForm(false)}>Créer un rapport d'intervention</Button>     
                    } 
                </Group>
                }
            </Card>
            <RapportInterventionForm showForm={showForm} setShowForm={SetShowForm} bt_id={bt_id!}  />
        </Box>
    )
}

export default BonTravail;