import { Box, Card, Container, Grid, Group, Stack } from "@mantine/core";
import MissingDocumentsStats from "./shared/MissingDocuments";
import StatusCard from "./shared/Status";
import TypeStatus from "./shared/TypeStatus";

const Dashboard = () => {

  return(
      <Grid gutter="lg">
        <MissingDocumentsStats />
        <TypeStatus />
      </Grid>
  )
}
export default Dashboard;
