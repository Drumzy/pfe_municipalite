import {
  Box,
  Group,
  Text,
  UnstyledButton,
  ActionIcon,
} from "@mantine/core";
import { RiDashboard2Line } from "react-icons/ri";
import { AiFillCar, AiOutlineUser } from "react-icons/ai";
import { BsExclamationCircle, BsGear } from "react-icons/bs";
import { BiAlarmExclamation } from "react-icons/bi";
import { GiFuelTank } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import {MdOutlineAssignment} from "react-icons/md";
import {MdMiscellaneousServices} from "react-icons/md"
import { store } from "../../redux/store";
import React from "react";
interface MainLinkProps {
  icon: React.ReactNode;
  label: string;
  destination: string;
}

function MainLink({ icon, label, destination }: MainLinkProps) {
  
  return (
    <UnstyledButton
      component={NavLink}
      to={destination}
      sx={(theme: {
        spacing: { xs: any };
        radius: { sm: any };
        colorScheme: string;
        colors: { dark: any[]; gray: any[] };
        black: any;
      }) => ({
        display: "block",
        width: "90%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        "&:hover,&.active": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[2],
        },
      })}
    >
      <Group>
        <ActionIcon variant="transparent" color="violet">
          {icon}
        </ActionIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const linksData = [
  {
    identifier:"Ges",
    icon: <RiDashboard2Line size={16} />,
    label: "Dashboard",
    destination: "dashboard",
  },
  {
    identifier:"Ges",
    icon: <AiFillCar size={16} />,
    label: "Vehicules",
    destination: "vehicules",
  },
  {
    identifier:"Adm",
    icon: <AiOutlineUser size={16} />,
    label: "Employees",
    destination: "employees",
  },
  {
    identifier:"Ges",
    icon: <BsExclamationCircle size={16} />,
    label: "Problemes",
    destination: "problemes",
  },
  
  {
    identifier:"Con",
    icon: <BsExclamationCircle size={16} />,
    label: "Problemes",
    destination: "problemes",
  },

  {
    identifier:"Ges",
    icon: <BiAlarmExclamation size={16} />,
    label: "Rappels",
    destination: "rappels",
  },
  {
    identifier:"Ges",
    icon: <GiFuelTank size={16} />,
    label: "Historique Consommation",
    destination: "historique_consommation",
  },
  {
    identifier:"Mec",
    icon: <MdOutlineAssignment size={16} />,
    label: "Comptes Rendus",
    destination: "comptes_rendus",
  },
  {
    identifier: "Ges",
    icon: <MdMiscellaneousServices size={16}/>,
    label: "Interventions",
    destination: "interventions"
  }
];
interface LinksProps {
  role?: string ;
}
export const MainLinks:React.FC<LinksProps> = (props) => {
  const user = store.getState().auth.user;
  const filtered_links:JSX.Element[] = [];
   linksData.map((link) =>{
    if(user?.employeeType.role === props.role){
      if(filtered_links.findIndex((object) => object.key === user?.employeeType.type_id) === -1){
        if(user?.employeeType.type_id.includes(link.identifier)){
          filtered_links.push(<MainLink {...link} key={link.label} />)
        }
      }
    }
  })

  return <Box>{filtered_links}</Box>;
}
