import {
  Badge,
  Box,
  Button,
  Group,
  NativeSelect,
  Popover,
  Table,
} from "@mantine/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setVehicules } from "../../../redux/features/vehicules/vehicules";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { User } from "../../../redux/services/interfaces/user.interface";
import {
  employeeInitialState,
  filterInitialState,
} from "./initialState.consts";
import { useLazyGet_employeesQuery } from "../../../redux/services/endpoints/employee.endpoint";

const employees_response = {
  data: [employeeInitialState],
  meta: {
    page: 1,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};
const roles_data = [{ label: "Gestionnaire Parc", value: "" }];
const EmployeeDataTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const gotoEmployee = (employee: User) => {
    navigate(
      location.pathname + "/employee/" + encodeURIComponent(employee.id)
    );
  };
  const [get_employees] = useLazyGet_employeesQuery({});
  const [data, setData] = useState(employees_response);
  
  const [role, setRole] = useState<string>("");
  const [typePopover, setTypePopover] = useState(false);
  const headers = (
    <tr>
      <th>Reference</th>
      <th>Nom et Prenom</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  );



  const clearFilters = () => {
    setRole("");
  };

  const handleNextPagination = () => {
    if (data.meta.hasNextPage) {
      get_employees({
        order: "ASC",
        page: data.meta.page + 1,
        take: 10,
        role: role!,
      })
        .unwrap()
        .then((data) => setData(data));
      //dispatch(setVehicules({ vehicules: data.data }));
    }
  };
  const handlePreviousPagination = () => {
    if (data.meta.hasPreviousPage) {
      get_employees({
        order: "ASC",
        page: data.meta.page - 1,
        take: 10,
        role: role!,
      })
        .unwrap()
        .then((data) => setData(data));
      //dispatch(setVehicules({ vehicules: data.data }));
    }
  };
  function handledata() {
    get_employees({
      order: "ASC",
      page: data.meta.page,
      take: 10,
      role: role!,
    })
      .unwrap()
      .then((data) => setData(data));
    //dispatch(setVehicules({ vehicules: data.data }));
  }

  useEffect(() => {
    handledata();
    const interval = setInterval(() => {
      handledata();
    }, 5000);

    return () => clearInterval(interval);
  }, [data, role]);

  const rows = data.data.map((element) => (
    <tr key={element.id} onClick={() => gotoEmployee(element)}>
      <td>{element.id.slice(0, 9)}</td>
      <td>{element.nom + " " + element.prenom}</td>
      <td>{element.email}</td>
      <td>{element.employeeType.role}</td>
    </tr>
  ));
  return (
    <Box>
      <Group sx={{ justifyContent: "space-between" }}>
        <Group>
          <Popover
            opened={typePopover}
            target={
              <Button onClick={() => setTypePopover((o) => !o)}>Role</Button>
            }
            position="bottom"
            onClose={() => setTypePopover(false)}
          >
            <NativeSelect
              name="role"
              data={["Gestionnaire Parc", "Mecanicien"]}
              placeholder="Choisir un role"
              value={role}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setRole(e.currentTarget.value)
              }
            />
          </Popover>
          {/* <Popover
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
              data={["Nettoyage", "Chantier"]}
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
              data={["Active", "En Panne"]}
              placeholder="Choisir une status"
              value={status}
              onChange={onChange}
            />
          </Popover> */}

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
export default EmployeeDataTable;
