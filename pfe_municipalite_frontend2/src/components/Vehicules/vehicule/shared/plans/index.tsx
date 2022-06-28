import { ActionIcon, Box, Button, Group, Table, Tooltip } from "@mantine/core"
import { RiFileListLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom"
import { headers } from "./data.const";
import DeleteModal from "./delete.modal";

interface PlansProps {
    maintenances: {
        pm_id: string;
        nbr_repetition: number;
        periodicite: string;
        type: string;
        mots_cle: string;
    }[]
}
const Plans:React.FC<PlansProps> = ({maintenances}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const to_newPlan = () =>{
        navigate(location.pathname +'/new_plan')
    }
    const visitPlan = (pm_id: string) => {
        navigate(`/plans/plan/${encodeURIComponent(pm_id)}`)
    }
    const rows = maintenances.map((plan) => (
        <tr key={plan.pm_id}>
            <td>{plan.pm_id.slice(0,9)}</td>
            <td>{plan.type}</td>
            <td>{plan.nbr_repetition}</td>
            <td>
                <Group>
                    <ActionIcon color="blue" variant="filled" onClick={() => visitPlan(plan.pm_id)}>
                        <Tooltip label="Afficher ce plan">
                        <RiFileListLine size={24}/>
                        </Tooltip>
                    </ActionIcon>
                    <DeleteModal plan_id={plan.pm_id} />
                </Group>
            </td>
        </tr>
    ))

    return (
        <Box sx={{width: "100%"}}>
            <Group position="right">
                <Button onClick={() => to_newPlan()}>Créer nouveau plan</Button>
                <Table horizontalSpacing="xl" highlightOnHover>
                    <thead>{headers}</thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={4} align="center">
                                    Aucun plan trouvée
                                </td>
                            </tr>
                        ) : (
                            rows
                        )
                        }
                    </tbody>
                </Table>
            </Group>
        </Box>
    )
}

export default Plans