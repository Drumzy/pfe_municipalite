import { Box, Button, Group, NativeSelect, Popover, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGet_bons_travailQuery } from "../../../redux/services/endpoints/bn_travail.endpoint";
import { BonTravail } from "../../../redux/services/interfaces/bon_travail.interface";
import { headers } from "./data";
import { BonTravailInitialState, btFilterInitialState } from "./initialState.const";

const bt_response = {
    data: [BonTravailInitialState],
    meta: {
    page: 1,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  }
}

const BonTravailDataTable = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const gotoBonTravail = (bt_id: string) => {
        navigate(location.pathname + "/bon_travail/" + encodeURIComponent(bt_id));
    }
    const [get_bons_travail] = useLazyGet_bons_travailQuery({});
    const [data, setData] = useState(bt_response);
    const[{status, vehicule_id}, setState] = useState(btFilterInitialState);
    const [statusPopover, setStatusPopover] = useState(false);
    const [vehiculePopover, setVehiculePopover] = useState(false);

    const onChange = (e:any) => {
        const {name, value} = e.target;
        setState((prevState) => ({...prevState, [name]: value}));
    }

    const clearFilters = () => {
        setState({ ...btFilterInitialState});
    }

    const handleNextPagination = () => {

    }
    const handlePreviousPagination = () => {

    }
    const handleData = () => {
        get_bons_travail({
            order: "ASC",
            page:data.meta.page,
            take: 10,
            status: status,
            vehicule_id: vehicule_id,
        })
        .unwrap()
        .then((data) => setData(data));
        console.log(data);
    }

    useEffect(() => {
        handleData();
        const interval = setInterval(() => {
            handleData();
        },5000);

        return () => clearInterval(interval);
    },[data, status, vehicule_id]);

    const rows = data.data.map((element) => (
        <tr key={element.bt_id} onClick={() =>gotoBonTravail(element.bt_id)}>
            <td>{element.bt_id}</td>
            <td>{element.date}</td>
            <td>{element.demandes[0].status}</td>
            <td>{element.demandeur}</td>
            <td>{element.demandes[0].resume}</td>
        </tr>
    ));
    return(
        <Box>
            <Group sx={{ justifyContent: "space-between"}} align="center">
                <Group>
                <Popover
                    opened={statusPopover}
                    target={
                        <Button onClick={() => setStatusPopover((o) => !o)}>Status</Button>
                    }
                    position="bottom"
                    onClose={() => setStatusPopover((o) => !o)}
                >
                    <NativeSelect name="status" data={[]} placeholder="Choisir une status" value={status} onChange={onChange}/>
                </Popover>
                <Popover
                    opened={vehiculePopover}
                    target={
                        <Button onClick={() => setVehiculePopover((o) => !o)}>Vehicule</Button>
                    }
                    position="bottom"
                    onClose={() => setVehiculePopover((o) => !o)}
                >
                    <NativeSelect name="vehicule_id" data={[]} placeholder="Choisir une vehicule" value={vehicule_id} onChange={onChange}/>
                </Popover>
                <Button onClick={clearFilters}>Annuler filtres</Button>
                </Group>
                <Group position="right" mt="md">
                <Button radius="lg"><FiChevronLeft /></Button>
                <Button radius="lg"><FiChevronRight /></Button>
                </Group>
            </Group>
            <Table highlightOnHover width={"100%"} verticalSpacing="sm">
                <thead>{headers}</thead>
                <tbody>
                    {
                        rows.length === 0 ? (
                            <tr>
                                <td colSpan={4}> Aucun Bon de Travail trouvée</td>
                            </tr>
                        )
                        :
                        rows
                    }
                </tbody>
            </Table>
        </Box>
    )
}
export default BonTravailDataTable;