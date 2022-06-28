import { Card, Group, RingProgress, Title, useMantineTheme } from "@mantine/core";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useLazyGet_vehicules_typesQuery } from "../../../redux/services/endpoints/statistics.endpoint";
import { chartDataType, vehicluesTypes } from "./stats.const";

ChartJS.register(ArcElement, Tooltip, Legend);

const TypeStatus = () => {
  const theme = useMantineTheme();
  const [get_vehicules_types] = useLazyGet_vehicules_typesQuery({});
  const [loaded_data, setData] = useState(vehicluesTypes);
  const [chartData, setChartData] = useState(chartDataType);
  const handleData = () => {
    get_vehicules_types({})
      .unwrap()
      .then((data) => setData(data));
    setChartData({
      labels: ["Camions", "Tracteurs", "Voitures", "Pick-up"],
      datasets: [
        {
          label: "",
          data: [
            loaded_data.vehicuelsStatusType.camion,
            loaded_data.vehicuelsStatusType.tracteur,
            loaded_data.vehicuelsStatusType.voiture,
            loaded_data.vehicuelsStatusType.pick_up,
          ],
          backgroundColor: [`#165185`, `#FF9F1C`, `#75D157`, `#ff0000`],
          borderColor: [`#165185`, `#FF9F1C`, `#75D157`, `#ff0000`],
          borderWidth: 1,
        },
      ],
    });
  };
  useEffect(() => {
    handleData();
    const interval = setInterval(() => {
      handleData();
    }, 5000);

    return () => clearInterval(interval);
  }, [loaded_data, chartData.datasets[0].data[0]]);

  return (
    <Card>
      <Group position="center">
      <Title order={3}>Chart des vehicules par type</Title>
      </Group>
      <Doughnut data={chartData} />
    </Card>
  );
};
export default TypeStatus;
