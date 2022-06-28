import {
  Card,
  InputWrapper,
  Progress,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLazyGet_vehicules_missing_documentsQuery } from "../../../redux/services/endpoints/statistics.endpoint";
import { vehicules_missing_documents } from "./stats.const";

const MissingDocumentsStats = () => {
  const theme = useMantineTheme();
  const [get_vehicules_missing_documents] =
    useLazyGet_vehicules_missing_documentsQuery({});
  const [data, setData] = useState(vehicules_missing_documents);
  const handleData = () => {
    get_vehicules_missing_documents({})
      .unwrap()
      .then((data) => setData(data));
  };

  useEffect(() => {
    handleData();
    const interval = setInterval(() => {
      handleData();
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Card>
      <Title order={3}>Status des IA manquants des vehicules</Title>
      <InputWrapper label="Assurance">
        <Progress
          color={theme.colors.teal[6]}
          value={data.vehiculeStatusMissingDocuments.missing_assurance_ratio}
          label={
            data.vehiculeStatusMissingDocuments.missing_assurance_ratio.toFixed(1) + "%"
          }
          my={5}
          size="xl"
        />
      </InputWrapper>
      <InputWrapper label="Carte grise">
        <Progress
          color={theme.colors.pink[6]}
          value={data.vehiculeStatusMissingDocuments.missing_carte_grise_ratio}
          label={
            data.vehiculeStatusMissingDocuments.missing_carte_grise_ratio.toFixed(1) + "%"
          }
          my={5}
          size="xl"
        />
      </InputWrapper>
      <InputWrapper label="Informations technique">
        <Progress
          color={theme.colors.grape[6]}
          value={data.vehiculeStatusMissingDocuments.missing_vehicue_it_ratio}
          label={
            data.vehiculeStatusMissingDocuments.missing_vehicue_it_ratio.toFixed(1) + "%"
          }
          my={5}
          size="xl"
        />
      </InputWrapper>
      <InputWrapper label="Vignettes">
        <Progress
          color={theme.colors.orange[6]}
          value={data.vehiculeStatusMissingDocuments.missing_vignette_ratio}
          label={
            data.vehiculeStatusMissingDocuments.missing_vignette_ratio.toFixed(1) + "%"
          }
          my={5}
          size="xl"
        />
      </InputWrapper>
    </Card>
  );
};

export default MissingDocumentsStats;
