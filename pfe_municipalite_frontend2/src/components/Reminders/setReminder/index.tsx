import { Button, Card, Group, InputWrapper, Radio, RadioGroup, Select, Slider, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useLazyGet_plansQuery } from "../../../redux/services/endpoints/maintenance.enpoint";
import { useSet_reminderMutation } from "../../../redux/services/endpoints/reminder.endpoint";
import { importancefield, marks, plansData, plansInitialState } from "./data.const";
import {v4 as uuid} from "uuid";

const SetReminder = () => {
    const form = useForm({
        initialValues:{
            re_id:'',
            pm_id: '',
            start_date: new Date(),
            finish_date: new Date(),
            importance: 'Negligeable',
            declarable: false,
        },
        validate: (values) =>({
            pm_id: values.pm_id === "" ? "Vous devez choisir un plan de maintenance" : null,
            start_date: values.start_date.getTime() < new Date().getTime() ? "Date début doit etre supperieure au date courante" : null,
            finish_date: values.finish_date.getTime() < values.start_date.getTime() ? "Date fin du rappel doit etre supperieure au date de debut" : null,
            importance: values.importance === "" ? "Ce champ doit etre rempli" : null,
        })
    })
    const [get_plans] = useLazyGet_plansQuery({});
    const [set_reminder] = useSet_reminderMutation({});
    const [data, SetData] = useState([plansInitialState]);
    const handleData = () => {
        get_plans({}).unwrap().then((data) => SetData(data));
        data.forEach((plan) => {
            if(plansData.findIndex((object) => object.key === plan.pm_id) === -1){
                plansData.push({
                    key: plan.pm_id,
                    label:plan.pm_id.slice(0,9),
                    value:plan.pm_id,
                    disabled: false,
                })
            }
        })
    }

    const handleImportanceChange = (value: number) => {
        importancefield.forEach((level) => {
            if(level.label === value){
                form.setFieldValue("importance", level.value)
            }
        })
    }

    const handleSubmit = () => {
        
        if(!form.validate().hasErrors){
            form.values.re_id = "RE#" + uuid();
            set_reminder(form.values).unwrap().then((data) => showNotification({
                id: "Rappel Add",
                autoClose: 5000,
                title: "Success",
                message: `${data.message}`,
                color: "green",
                icon: <TiTick />,
            }))
        }
    }
    useEffect(() =>{
        handleData();
        const interval = setInterval(() =>{
            handleData();
        },2000)

        return () => clearInterval(interval);
    },[data])
    return(
        <Group position="center" >
            <Card sx={{ width: "90%"}}>
                <Title order={3} mb={15}>Ajouter un rappel</Title>
                <form>
                    <Select label="Plan maintenance" clearable data={Array.from(new Set(plansData))} {...form.getInputProps('pm_id')}/>
                    <DatePicker label="Date début" {...form.getInputProps("start_date")}/>
                    <DatePicker label="Date fin" {...form.getInputProps("finish_date")}/>
                    <InputWrapper  label="Importance" my={15}>
                    <Group position="center">
                    <Slider 
                    sx={{ width: "90%"}}
                    defaultValue={0} 
                    step={25}
                    marks={marks} 
                    label={(val) => marks.find((mark) => mark.value === val)?.label}
                    styles={{markLabel: {display: 'none'}}}
                    onChange={(value) => handleImportanceChange(value)}
                    />
                    </Group>
                    </InputWrapper>
                    <RadioGroup label="Déclarable" {...form.getInputProps("declarable")} >
                        <Radio value={"true"} label="Oui"/>
                        <Radio value={"false"} label="Non"/>
                    </RadioGroup>
                </form>
                <Group position="right" my={15} onClick={() => handleSubmit()}>
                    <Button color="green" onClick={()=> handleSubmit()}>Sauvegarder</Button>
                </Group>
            </Card>
        </Group>
    )
}

export default SetReminder;