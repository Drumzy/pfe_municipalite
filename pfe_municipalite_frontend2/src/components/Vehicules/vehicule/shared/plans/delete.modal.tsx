import { ActionIcon, Group, Text, Tooltip } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { AiFillDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { useLazyRemove_planQuery } from "../../../../../redux/services/endpoints/maintenance.enpoint";

const DeleteModal = (props: {plan_id: string}) => {
    const modals = useModals();
    const [delete_plan] = useLazyRemove_planQuery({});

    const handleDelete = () => {
        delete_plan(props.plan_id).unwrap().then((data) => showNotification({
            id: "Remove Plan",
            title:"Success",
            autoClose: 5000,
            message: `${data.message}`,
            color: "green",
            icon: <TiTick />
        })
        )
    }
    const openConfirmModal = () => modals.openConfirmModal({
        title: "Suppression de plan",
        children: (
            <Group>
            <Text >Cette action est si importante que vous devez la confirmer avec un modal. Cliquez s'il vous plait l'un de ces boutons pour continuer.</Text>
            <Text color="red">Plan de maintenance avec id : {props.plan_id} doit etre supprimer</Text>
            </Group>
        ),
        labels: {confirm: 'Confirmer', cancel: 'Annuler'},
        confirmProps:{color:"red"},
        onConfirm: () => handleDelete(),
    })
    return (
        <ActionIcon color="red" variant="filled" onClick={openConfirmModal}>
            <Tooltip label="Supprimer ce plan">
                <AiFillDelete  size={24}/>
            </Tooltip>
        </ActionIcon>
    )
}

export default DeleteModal;