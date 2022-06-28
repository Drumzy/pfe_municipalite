import { Box, Group, Title, Image, Text, Table, Button, Checkbox } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React, { RefObject, useCallback, useEffect, useRef, useState } from "react";
import Logo from "../../../images/municipalite-grombalia1.png";
import {interventionInitialState} from "../../Problemes/demandesList/initialState.consts";
import { bnt_initialState, employeeData, mecanicienInitialState } from "../../Problemes/probleme/data.const";
import * as jspdf from "jspdf" ;
import html2canvas from "html2canvas";

interface ModalProps {
    vehicule_id: string,
    demande: typeof interventionInitialState,
    employee: typeof mecanicienInitialState,
}
const useCustom = (): [RefObject<HTMLElement>,(node: HTMLElement) => void] => {
    const ref = useRef<HTMLElement | null>(null)
    const setRef: React.RefCallback<HTMLElement> = useCallback(node => {
        ref.current = node
    },[])

    return [ref,setRef]
}
const ExportModal:React.FC<ModalProps> = (props): JSX.Element => {

    const modal = useModals();
    const [ref,pdfref] = useCustom();
    async function exportPdf (){
            const width = ref.current!.offsetWidth;
            const height = ref.current!.offsetHeight;
            html2canvas(ref.current!,{scale:3}).then((canvas)=>{
            const orientation = width >= height ? 'l': 'p' ;
            const pdf = new jspdf.jsPDF({orientation: orientation, unit: 'px',compress:true,format:"a4"});
            pdf.internal.pageSize.width = width;
            pdf.internal.pageSize.height = height;
            pdf.addImage(canvas.toDataURL(), 'JPEG', 0, 0, width, height);
            pdf.save("BN#"+props.demande.di_id.slice(3,9)+props.vehicule_id.slice(3,9));
        })
    }
    useEffect(()=>{
        pdfref(document.getElementById('topdf')!);
    },[])
    const openExportModal = () => modal.openConfirmModal({
        id: "exportmodal",
        title: 'Export to PDF',
        size: "100wh",
        children: (
            <Box ref={ref as React.RefObject<HTMLDivElement>} id="topdf">
                        <Group position="apart" mx={25}>
                            <Image ml={50} src={Logo} width={100}/>
                            <Title order={3}>Bon De Travail Maintenance</Title>
                        </Group>
                        <Group position="apart" ml={25}>
                        <Group  direction="column" spacing={0}>
                            <Title order={4}>Municipalite Grombalia</Title>
                            <Text>Avenue, de la Paix</Text>
                            <Text>Grombalia, Nabeul, 8030</Text>
                            <Group>
                            <Title order={6}>N° Telephone:</Title>
                            <Text>72 213 420</Text>
                            </Group>
                        </Group>
                        <Group direction="column" spacing={0} mx={25}>
                            <Group>
                            <Title order={4}>Réference Bon de travail:</Title>
                            <Text color="blue" weight={700}>{"BN#"+props.demande.di_id.slice(3,9)+props.vehicule_id.slice(3,9)}</Text>
                            </Group>
                            <Group>
                            <Title order={4}>Vehicule:</Title>
                            <Text color="blue" weight={700}>{props.vehicule_id}</Text>
                            </Group>
                        </Group>
                        </Group>
                        <Group sx={{width : "100%"}}>
                        <Table mt={50} width="fit-content">
                            <thead style={{border: "1px solid"}}>
                                <tr style={{border: "1px solid"}}>
                                    <td style={{border: "1px solid"}}><Text ml={5}>Date: {new Date().toISOString().slice(0,10)}</Text></td>
                                    <td style={{border: "1px solid"}}><Text ml={5}>Temps: {new Date().toUTCString().slice(16)}</Text></td>
                                    <td style={{border: "1px solid"}}><Text ml={5}>Assigné à: {props.employee.employee.nom + " " + props.employee.employee.prenom}</Text></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td colSpan={2} style={{border: "1px solid" }}><Text ml={5}>Déclaré Par: Rassaa Wael</Text></td>
                                    <td style={{border: "1px solid"}}><Text ml={5}>Departement: Adminstration</Text></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td colSpan={3} style={{border: "1px solid"}}><Group sx={{ width: "100%"}} position="center" my={5}><Checkbox label="Préventive" /><Checkbox label="Réparation" defaultChecked/></Group></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td style={{border: "1px solid"}}><Text ml={5}>Titre défaillance: {props.demande.resume}</Text></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td colSpan={3} style={{border: "1px solid",backgroundColor:"grey"}}><Group position="center">Description du defaillance</Group></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    {props.demande.defauts.map((defaut) => (
                                        <td style={{border: "1px solid"}} colSpan={3}><Text ml={5} align="center">{defaut.name}</Text></td>
                                    ))}
                                    
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td colSpan={3} style={{backgroundColor:"grey"}}><Group position="center">Equipements</Group></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td style={{border: "1px solid",backgroundColor:"grey"}}><Text ml={5}>Quantité</Text></td>
                                    <td style={{border: "1px solid",backgroundColor:"grey"}}><Text ml={5}>Materiels/ Equipement</Text></td>
                                    <td style={{border: "1px solid",backgroundColor:"grey"}}><Text ml={5}>Prix unitaire</Text></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td style={{border: "1px solid"}}><Text ml={5}>.</Text></td>
                                    <td style={{border: "1px solid"}}><Text ml={5}>.</Text></td>
                                    <td style={{border: "1px solid"}}><Text ml={5}>.</Text></td>
                                </tr>
                                <tr style={{border: "1px solid"}}>
                                    <td style={{border: "1px solid"}} colSpan={2}></td>
                                    <td style={{border: "1px solid"}}><Text ml={5}>.</Text></td>
                                </tr >
                                <tr style={{border: "1px solid"}}>
                                    <td style={{border: "1px solid"}} colSpan={2}></td>
                                    <td style={{border: "1px solid"}}><Text ml={5} my={15}>Signature: </Text></td>
                                </tr>
                            </thead>
                        </Table>
                        </Group>
            </Box>
        ),
        labels: {confirm: 'Exporter', cancel: "Annuler"},
        confirmProps: {color: "violet"},
        onCancel: () => console.log('Cancled'),
        onConfirm: () => exportPdf()
    });

    return(
        <Button onClick={openExportModal}>Exporter PDF</Button>
    )
}

export default ExportModal ;