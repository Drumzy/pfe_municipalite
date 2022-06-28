import { Button, Card, Drawer, Group, Indicator, Tooltip } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGet_reminderQuery } from "../../../redux/services/endpoints/reminder.endpoint";
import { dataInitial } from "./data.const";

const ReminderCalendar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handelSubmit = () => {navigate(location.pathname +"/set_reminder")};
    const [value, setValue] = useState<Date | null>(new Date());
    const [get_reminders] = useLazyGet_reminderQuery({});
    const [data, SetData] = useState([dataInitial]);
    const [pm_id, setPM_id] = useState("");
    const remidner_dates = [new Date()];
    const [parsedDates,SetParsedDates] = useState(remidner_dates.map((date) => dayjs(date)));
    const handleData = () => {
        get_reminders({}).unwrap().then((data) => SetData(data));
        data.forEach((reminder) =>{
            if(remidner_dates.findIndex((object) => dayjs(object).isSame(dayjs(reminder.finish_date),"date"))===-1){
                remidner_dates.push(new Date(reminder.finish_date));
            }
        })
        remidner_dates.forEach((date) =>{
            if(parsedDates.findIndex((object) => object.isSame(dayjs(date),"date")) === -1){
                parsedDates.push(dayjs(date));
            }
        });
        
        data.forEach((reminder) => {
            if(dayjs(reminder.finish_date).isSame(dayjs(value), "date")){
                setPM_id(reminder.maintenance.pm_id)
            }
        })
    }

    const handleNavigate = () => {
        if(pm_id !== ""){
            navigate(`/plans/plan/${encodeURIComponent(pm_id)}`)
        }
    }

    useEffect(() => {
        handleData();
        const interval = setInterval(() =>{
            handleData();
        },5000)

        return () => clearInterval(interval);
    },[data,parsedDates,remidner_dates,pm_id])

    return(
        <>
        <Card my={20}>
        <Group position="apart">
            <Button onClick={()=>handleNavigate()}>{pm_id === "" ? "aucune date est choisi" : "Plan de maintenance trouvé"}</Button>
            <Button color="violet" onClick={()=>handelSubmit()}>Ajouter Rappel</Button>
        </Group>
        </Card>
        <Card>
                <Calendar
                fullWidth
                size="xl"
                value={value}
                onChange={setValue}
                styles={(theme) => ({
                    cell: {
                    border: `1px solid ${
                        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                    }`,
                    },
                    day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
                    weekday: { fontSize: theme.fontSizes.lg },
                    weekdayCell: {
                    fontSize: theme.fontSizes.xl,
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
                    border: `1px solid ${
                        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                    }`,
                    height: 70,
                    },
                })}
                renderDay={(renderdate) =>{
                    const day = renderdate.getDate();
                    const match = parsedDates.findIndex((date) => date.isSame(dayjs(renderdate), 'day'));
                    const detail = data.find((reminder) => dayjs(reminder.finish_date).isSame(renderdate, 'day'));
                    if(match > -1){
                        return(
                            <Indicator size={6} color="red" offset={8} >
                            <Tooltip label={detail?.maintenance.pm_id}>
                            <div>{day}</div>
                            </Tooltip>
                            </Indicator>
                        )
                    }
                    return(
                        <div>{day}</div>
                    )
                }}
                />
        </Card>
        </>
    )
}

export default ReminderCalendar;