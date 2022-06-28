import { Box } from "@mantine/core";
import React from "react";

interface ADMFormProps {
    hidden: boolean;
}

export const AdminForm:React.FC<ADMFormProps> = (props) => {
    return (
    <Box hidden={props.hidden}>hello5</Box>
    )
}