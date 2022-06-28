import { Button, Group, Mark, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
import { useLazyDelete_vehiculeQuery } from "../../../redux/services/endpoints/vehicule.endpoint";

export const DeleteModal = (vehicule_id: any) => {
  const navigate = useNavigate();
  const [delete_vehicule] = useLazyDelete_vehiculeQuery({});
  const modal = useModals();
  const handle_delete = (vehicule_id: string) => {
    delete_vehicule(vehicule_id)
      .unwrap()
      .then((data) => navigate("/vehicules"))
      .catch((error) => console.log(error));
  };
  const openDeleteModal = () =>
    modal.openConfirmModal({
      title: "",
      children: (
        <Group>
          <Text size="sm">
            Cette action est si importante que vous devez la confirmer avec un
            modal. Cliquez s'il vous plait l'un de ces boutons pour continuer.
          </Text>
          <Text>
            Voulez-vous supprimer la vehicule avec l'id :{" "}
            <Mark color="red">{vehicule_id.props}</Mark> ?
          </Text>
        </Group>
      ),
      labels: { confirm: "Supprimer", cancel: "Annuler" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancled"),
      onConfirm: () => handle_delete(vehicule_id.props),
    });

  return (
    <Group position="right">
      <Button color="red" onClick={openDeleteModal}>
        Supprimer cette vehicule
      </Button>
    </Group>
  );
};
