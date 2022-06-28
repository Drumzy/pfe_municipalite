import { Card, ColorSwatch, Progress, Text, Title, Tooltip } from "@mantine/core";
import { useState } from "react";

const StatusCard = () => {
  const [Vstatus,SetVStatus] = useState(true);
  
  const sections = [
    {value: 42, color: "pink", label:"En Panne (30%)"},
    {value: 40, color: "grape", label:"Active (30%)"},
    {value: 20, color: "blue", label: "Hors Service (25%)"}
  ]

  return (
    <Card>
        <Title order={3}>Status des Vehicules</Title>
        <Progress 
        mt="md"
        size="xl"
        radius="xl"
        sections={sections}
        aria-valuemin={0}
        aria-valuemax={200}
        />
    </Card>
  )
};

export default StatusCard;
