import { Card, Group, NumberInput, Text, TextInput, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGet_plan_by_idQuery } from "../../../../../redux/services/endpoints/maintenance.enpoint";
import { plansCMInitialState } from "../../../../Reminders/setReminder/data.const";

const Plan = () => {
    const {pm_id} = useParams();
    const [get_plan] = useLazyGet_plan_by_idQuery({});
    const [plan_loaded, setPlan] = useState(plansCMInitialState);
    const handleData = () => {
        get_plan(pm_id!).unwrap().then((data) => setPlan(data));


        console.log(plan_loaded)
    }

    useEffect(() => {
        handleData();
        const interval = setInterval(() => {
            handleData();
        },2000)

        return () => clearInterval(interval);

    },[plan_loaded])

    return(
        <Group position="center">
            <Card sx={{ width : "75%"}}>
                <Group position="center">
                <Text weight={700} size="xl">Plan de maintenance : </Text>
                <Text weight={700} size="xl" color="blue">{plan_loaded.pm_id}</Text>
                </Group>
                <TextInput label="Type :" value={plan_loaded.type} readOnly/>
                <NumberInput label="N° répetition:" value={plan_loaded.nbr_repetition} hideControls readOnly/>
                <TextInput label="Périodicité :" value={plan_loaded.periodicite} readOnly/>
                <TextInput label="Mots clé :" value={plan_loaded.mots_cle} readOnly/>
                <Group position="right" my={15}>
                    <Button disabled>Modifier</Button>
                </Group>
            </Card>
        </Group>
    )
}

export default Plan;