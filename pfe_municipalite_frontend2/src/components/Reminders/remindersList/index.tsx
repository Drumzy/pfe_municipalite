import { Button, Card, Drawer, Group } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { useLocation, useNavigate } from "react-router-dom";
import ReminderCalendar from "./ReminderCalendar";

const RemindersList = () => {
  
  return (
    <>
      
      <ReminderCalendar />
    </>
  );
};
export default RemindersList;
