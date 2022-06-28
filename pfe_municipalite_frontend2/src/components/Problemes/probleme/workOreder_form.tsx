import {
  Box,
  Card,
  Group,
  Title,
  Text,
  CloseButton,
  TextInput,
  MultiSelect,
  ActionIcon,
  Button,
  Select,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { useCreate_bon_travailMutation } from "../../../redux/services/endpoints/bn_travail.endpoint";
import { useLazyGet_mecaniciensQuery } from "../../../redux/services/endpoints/employee.endpoint";
import { CreateBonTravailDto } from "../../../redux/services/interfaces/bon_travail.interface";
import { interventionInitialState } from "../demandesList/initialState.consts";
import { employeeData, mecanicienInitialState } from "./data.const";

interface BNFormProps {
  formdisplay: boolean;
  demande: typeof interventionInitialState;
  employee: typeof employeeData;
  formProps: { equipement: string; description: string };
  setFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (e: any) => void;
  formRef: React.RefObject<HTMLDivElement>;
}
const BonTravailForm: React.FC<BNFormProps> = (props): JSX.Element => {
  const [get_mecaniciens] = useLazyGet_mecaniciensQuery({});
  const [create_bon_travail] = useCreate_bon_travailMutation({});
  const [available, toggle] = useToggle<true | false>(false, [true, false]);
  const [data, setData] = useState([mecanicienInitialState]);
  const [mecaniciens, setMecaniciens]= useState([{key:"",label:"",value:""}]);
  const [mec_value, setMecValue] = useState<string[]>([]);
  const handleData = () => {
    get_mecaniciens({}).unwrap().then((data) => setData(data));
    data.forEach((employee) => {
      if(mecaniciens.findIndex((object) => object.key === employee.employee.id) === -1){
        mecaniciens.push({
          key: employee.employee.id,
          label: employee.employee.nom + " " + employee.employee.prenom,
          value: employee.mecancien_id,
        })
      }
    })
  }
  const handleSubmit = () => {
    const payload: CreateBonTravailDto = {
      bt_id: "BN#" + props.demande.di_id.slice(3, 9) + props.demande.vehicule.vehicule_id.slice(3, 9),
      date: new Date(props.demande.date_declaration),
      equipement:props.demande.vehicule.vehicule_id,
      n_travail: "",
      demandeur: props.employee.id,
      selected_mecaniciens: [""],
      ouvriers: [mecanicienInitialState],
      usedEquipements: [""],
      demandes: [props.demande]
    };
    data.forEach((mecanicien) => {
      if(payload.ouvriers.findIndex((object) => object.mecancien_id === mecanicien.mecancien_id) === -1){
        payload.ouvriers.push(mecanicien);
      }
    })
     mecaniciens.forEach((mecanicien) =>{
       payload.selected_mecaniciens.push(mecanicien.value);
     });
    create_bon_travail(payload).unwrap().then((data) => showNotification({
            id: "Bon Travail",
            autoClose: 5000,
            title: "Success",
            message: `Bon de Travail : ${"BN#" +
                props.demande.di_id.slice(3, 9) +
                props.demande.vehicule.vehicule_id.slice(3, 9)} est déclaré`,
            color: "green",
            icon: <TiTick />,
          }))
          .catch((error) => showNotification({
            id: "Bon Travail Error",
            autoClose: 5000,
            title: "Erreur",
            message: `${error.data.message}`,
            color:"red",
            icon: <ImCross />
          }))
          ;
  }
  useEffect(() => {
    handleData();

    const intervale = setInterval(() => {
      handleData();
    }, 5000)

    return () => clearInterval(intervale) ;
  },[data, mec_value, mecaniciens])

  return (
    <Box
      id="bnform"
      mx="xs"
      my={25}
      ref={props.formRef}
      hidden={props.formdisplay}
    >
      <Card shadow="lg" sx={{ width: "100%" }}>
        <Group position="apart" mb={25}>
          <Group>
            <Title order={5}>Bon de Travail N°:</Title>
            <Text color="blue" weight={800} mt={2.5}>
              {"BN#" +
                props.demande.di_id.slice(3, 9) +
                props.demande.vehicule.vehicule_id.slice(3, 9)}
            </Text>
          </Group>
          <CloseButton
            onClick={() => props.setFormDisplay(!props.formdisplay)}
          />
        </Group>

        <form>
          <TextInput label="Etat" value={props.demande.status} readOnly />
          <TextInput
            label="Déclaré par"
            value={props.employee.nom + " " + props.employee.prenom}
            readOnly
          />
          <TextInput
            label="Vehicule"
            value={props.demande.vehicule.immatriculation}
            readOnly
          />
          <div>{mecaniciens[0].label}</div>
          <MultiSelect label="Assigné à"  data={Array.from(new Set(mecaniciens))} value={mec_value} onChange={setMecValue}/>
          <Group sx={{ alignItems: "flex-end" }}>
            <Select
              label="Equipement de remplacement"
              data={[]}
              name="equipement"
              value={props.formProps.equipement}
              onChange={props.onChange}
              disabled={available}
            />
            <ActionIcon size="xl" onClick={() => toggle()}>
              {available === true ? (
                <BiToggleLeft size={36} />
              ) : (
                <BiToggleRight size={36} />
              )}
            </ActionIcon>
          </Group>
        </form>
        <Group position="right" mt={25}>
          
          <Button onClick={() => handleSubmit()}>Sauvegarder</Button>
          {/*<ExportModal
            demande={props.demande}
            employee={props.employee}
            formProps={payload}
          />
              */}
        </Group>
      </Card>
    </Box>
  );
};
export default BonTravailForm;
