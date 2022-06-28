import {
  Badge,
  Box,
  Button,
  Group,
  NativeSelect,
  Popover,
  Table,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGet_demandesQuery } from "../../../redux/services/endpoints/intervention.endpoint";
import { useLazyGet_vehiculesQuery } from "../../../redux/services/endpoints/vehicule.endpoint";
import { DemandeInterventionPersonnele } from "../../../redux/services/interfaces/intervention.interface";
import { vehiculeInitialState } from "../../Vehicules/vehiculesList/initialState.consts";
import { vehiculeData } from "../declarationProbleme/data.const";
import { headers } from "./data";
import {
  interventionFilterInitialState,
  interventionInitialState,
} from "./initialState.consts";

const demande_response = {
  data: [interventionInitialState],
  meta: {
    page: 1,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

const vehicule_response = {
  data: [vehiculeInitialState],
  meta: {
    page: 1,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

const InterventionDataTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gotoDemandeIntervention = (demande: DemandeInterventionPersonnele) => {
    navigate(
      location.pathname +
        "/demande_intervention/" +
        encodeURIComponent(demande.di_id)
    );
  };
  const [get_demandes] = useLazyGet_demandesQuery({});
  const [data, setData] = useState(demande_response);
  const vehicules: typeof vehiculeData = [];
  const [{ status, vehicule_id }, setState] = useState(interventionFilterInitialState);
  const [typePopover, setTypePopover] = useState(false);
  const [etatPopover, setEtatPopover] = useState(false);
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearFilters = () => {
    setState({ ...interventionFilterInitialState });
  };

  const handleNextPagination = () => {
    if (data.meta.hasNextPage) {
      get_demandes({
        order: "ASC",
        page: data.meta.page + 1,
        take: 10,
        status: status,
        vehicule_id: vehicule_id,
      })
        .unwrap()
        .then((data) => setData(data));
    }
  };
  const handlePreviousPagination = () => {
    if (data.meta.hasPreviousPage) {
      get_demandes({
        order: "ASC",
        page: data.meta.page - 1,
        take: 10,
        status: status,
        vehicule_id: vehicule_id,
      })
        .unwrap()
        .then((data) => setData(data));
    }
  };

  const handleData = () => {
    get_demandes({
      order: "ASC",
      page: data.meta.page,
      take: 10,
      status: status,
      vehicule_id: vehicule_id,
    })
      .unwrap()
      .then((data) => setData(data));

    data.data.forEach((demande) =>{
        if(vehicules.findIndex((object) => object.key === demande.vehicule.vehicule_id) === -1){
          vehicules.push({
            key: demande.vehicule.vehicule_id,
            label: demande.vehicule.immatriculation,
            value:demande.vehicule.vehicule_id,
            vehicule: demande.vehicule,
          })
        }
    })
  };

  useEffect(() => {
    handleData();
    const interval = setInterval(() => {
      handleData();
    }, 5000);

    return () => clearInterval(interval);
  }, [data, status, vehicule_id]);

  const rows = data.data.map((element) => (
    <tr key={element.di_id} onClick={() => gotoDemandeIntervention(element)}>
      <td>{element.di_id.slice(0, 9)}</td>
      <td>{element.vehicule.immatriculation}</td>
      <td>{element.date_declaration.slice(0, 10)}</td>
      <td>{element.resume}</td>
      <td>
        <Badge
          color={
            element.status === "En Attente"
              ? "orange"
              : element.status === "Hors Service"
              ? "red"
              : "green"
          }
        >
          {element.status}
        </Badge>
      </td>
      <td>{element.declare_par}</td>
    </tr>
  ));

  return (
    <Box>
      <Group sx={{ justifyContent: "space-between" }}>
        <Group>
          <Popover
            opened={typePopover}
            target={
              <Button onClick={() => setTypePopover((o) => !o)}>Status</Button>
            }
            position="bottom"
            onClose={() => setTypePopover(false)}
          >
            <NativeSelect
              name="status"
              data={["Ouvert", "En attente", "Fermé"]}
              placeholder="Choisir une status"
              value={status}
              onChange={onChange}
            />
          </Popover>
          <Popover
            opened={etatPopover}
            target={
              <Button onClick={() => setEtatPopover((o) => !o)}>Vechiule</Button>
            }
            position="bottom"
            onClose={() => setEtatPopover(false)}
          >
            <NativeSelect
              name="vehicule_id"
              data={Array.from(new Set(vehicules))}
              placeholder="Choisir une vehicule"
              value={vehicule_id}
              onChange={onChange}
            />
          </Popover>

          <Button onClick={clearFilters}>Annuler filters</Button>
        </Group>
        <Group position="right" mt="md">
          <Button
            radius="lg"
            onClick={() => handlePreviousPagination()}
            disabled={!data.meta.hasPreviousPage}
          >
            <FiChevronLeft />
          </Button>
          <Button
            radius="lg"
            onClick={() => handleNextPagination()}
            disabled={!data.meta.hasNextPage}
          >
            <FiChevronRight />
          </Button>
        </Group>
      </Group>
      <Table highlightOnHover width={"100%"} verticalSpacing="sm">
        <thead>{headers}</thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={7} align="center">
                Aucune probleme trouvée
              </td>
            </tr>
          ) : (
            rows
          )}
        </tbody>
      </Table>
    </Box>
  );
};
export default InterventionDataTable;
