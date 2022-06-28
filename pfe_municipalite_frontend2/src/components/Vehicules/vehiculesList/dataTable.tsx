import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Chips,
  Group,
  Menu,
  NativeSelect,
  Popover,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Vehicule } from "../../../redux/services/interfaces/vehicule.interface";
import { useLazyGet_vehiculesQuery } from "../../../redux/services/endpoints/vehicule.endpoint";
import { setVehicules } from "../../../redux/features/vehicules/vehicules";
import { AiFillDelete } from "react-icons/ai";
import { MdTipsAndUpdates } from "react-icons/md";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { AiOutlineFolderView } from "react-icons/ai";
import {
  filterInitialState,
  vehiculeInitialState,
} from "./initialState.consts";

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

const DataTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gotoVehicule = (vehicule: Vehicule) => {
    navigate(
      location.pathname +
        "/vehicule/" +
        encodeURIComponent(vehicule.vehicule_id)
    );
  };
  const [get_vehicules] = useLazyGet_vehiculesQuery({});
  const [data, setData] = useState(vehicule_response);
  const [{ type, service, status }, setState] = useState(filterInitialState);
  const [typePopover, setTypePopover] = useState(false);
  const [servicePopover, setServicePopover] = useState(false);
  const [statusPopover, setStatusPopover] = useState(false);

  const headers = (
    <tr>
      <th></th>
      <th>Reference</th>
      <th>Immatriculation</th>
      <th>Type</th>
      <th>Status</th>
      <th>Service</th>
    </tr>
  );

  const onChange = (e: any) => {
    const { name, value } = e.target;
    console.log(value)
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearFilters = () => {
    setState({ ...filterInitialState });
  };

  const handleNextPagination = () => {
    if (data.meta.hasNextPage) {
      get_vehicules({
        order: "ASC",
        page: data.meta.page + 1,
        take: 10,
        status: status,
        type: type,
        service: service,
      })
        .unwrap()
        .then((data) => setData(data));
      dispatch(setVehicules({ vehicules: data.data }));
    }
  };
  const handlePreviousPagination = () => {
    if (data.meta.hasPreviousPage) {
      get_vehicules({
        order: "ASC",
        page: data.meta.page - 1,
        take: 10,
        status: status,
        type: type,
        service: service,
      })
        .unwrap()
        .then((data) => setData(data));
      dispatch(setVehicules({ vehicules: data.data }));
    }
  };
  function handledata() {
    get_vehicules({
      order: "ASC",
      page: data.meta.page,
      take: 10,
      status: status,
      type: type,
      service: service,
    })
      .unwrap()
      .then((data) => setData(data));
    dispatch(setVehicules({ vehicules: data.data }));
  }

  useEffect(() => {
    handledata();
    const interval = setInterval(() => {
      handledata();
    }, 5000);

    return () => clearInterval(interval);
  }, [data, service, status, type]);

  const rows = data.data.map((element) => (
    <tr key={element.vehicule_id} onClick={() => gotoVehicule(element)}>
      <td>
        <Avatar
          size="lg"
          src={
            `http://localhost:5000/files_api/v1/vehicule/attachements/` +
            element.attachements.at(0)?.file_name
          }
        />
      </td>
      <td>{element.vehicule_id.slice(0, 9)}</td>
      <td>{element.immatriculation}</td>
      <td>{element.type}</td>
      <td>
        <Badge color={element.status === "Active" ? "green" : "red"}>
          {element.status}
        </Badge>
      </td>
      <td>{element.service}</td>
    </tr>
  ));
  return (
    <Box>
      <Group sx={{ justifyContent: "space-between" }}>
        <Group>
          <Popover
            opened={typePopover}
            target={
              <Button onClick={() => setTypePopover((o) => !o)}>Type</Button>
            }
            position="bottom"
            onClose={() => setTypePopover(false)}
          >
            <NativeSelect
              name="type"
              data={["Camion", "Tracteur","Voiture","Pick-up" ]}
              placeholder="Choisir un type"
              value={type}
              onChange={onChange}
            />
          </Popover>
          <Popover
            opened={servicePopover}
            target={
              <Button onClick={() => setServicePopover((o) => !o)}>
                Service
              </Button>
            }
            position="bottom"
            onClose={() => setServicePopover(false)}
          >
            <NativeSelect
              name="service"
              data={["Nettoyage", "Chantier","Transport"]}
              placeholder="Choisir une service"
              value={service}
              onChange={onChange}
            />
          </Popover>
          <Popover
            opened={statusPopover}
            target={
              <Button onClick={() => setStatusPopover((o) => !o)}>
                Status
              </Button>
            }
            position="bottom"
            onClose={() => setStatusPopover(false)}
          >
            <NativeSelect
              name="status"
              data={["Active", "En Panne","Hors Service"]}
              placeholder="Choisir une status"
              value={status}
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
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};
export default DataTable;
