import { Group, Text , ColorSwatch, useMantineTheme } from "@mantine/core";
import React, { forwardRef } from "react";
import { AiFillCar } from "react-icons/ai";
import {FaTractor, FaTruckPickup} from "react-icons/fa";
import {GiMineTruck} from "react-icons/gi"
import { ImCheckmark, ImCross } from "react-icons/im";

export const data = [
    {icon: <FaTractor />, label:"Tracteur", value:"Tracteur"},
    {icon: <GiMineTruck />, label:"Camion", value:"Camion"},
    {icon: <AiFillCar/>, label:"Voiture", value:"Voiture"},
    {icon: <FaTruckPickup/>, label:"Pick-up", value:"Pick-up"},
]

export const dataStatut = [
    
    {icon: <ImCheckmark />, label:"Active", value: "Active"},
    {icon: <ImCross />, label: "En Panne", value: "En Panne"},
    {icon: <ImCheckmark />, label:"Hors Service", value: "Hors Service"},
]

export const dataService =[
    {label:"Nettoyage", value:"Nettoyage"},
    {label:"Chantier", value:"Chantier"},
    {label:"Transport", value:"Transport"}
]
export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    icon: JSX.Element;
    label: string;
}

export const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({icon, label, ...others}: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                {icon}
                <div>
                    <Text size="sm">{label}</Text>
                </div>
            </Group>
        </div>
    )
);

