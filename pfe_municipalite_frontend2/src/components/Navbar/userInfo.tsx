import { Avatar, Box, Group, Menu, Text, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useState } from "react";
import {BiChevronRight, BiChevronLeft} from "react-icons/bi";
import { FaUsersCog } from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import {HiOutlineSupport} from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCredentials } from "../../redux/features/authSlice";
import Notifications from "./notifications";


export const UserInfo = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isOpened, setOpened] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const theme = useMantineTheme();

    function submitLogout(){
        dispatch(resetCredentials());
        navigate('/login');
    }

    return(
        <Box sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${
                theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
        }}>
            <Menu sx={{ width: "100%"}} opened={isOpened} position="right" placement="end" withArrow control={
            <UnstyledButton
                sx={{
                    display: 'block',
                    width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                    '&:hover':{
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6]: theme.colors.gray[0],
                    },
                }}
                onClick={() => setOpened(!isOpened)}
                mr={40}
            >
                <Group>
                    <Avatar  src="/hello" />
                    <Box sx={{flex:1}}>
                        <Text size="sm" weight={500}>{user?.nom + " " +user?.prenom}</Text>
                    </Box>
                    {isOpened === false ? <BiChevronRight size={16}/> : <BiChevronLeft size={16}/>}
                </Group>
            </UnstyledButton>}>
                <Menu.Item icon={<FaUsersCog size={16}/>} onClick={() => navigate(`/profil/`+encodeURIComponent(user?.id))}>Profil</Menu.Item>
                <Menu.Item icon={<HiOutlineSupport size={16}/>}>Support</Menu.Item>
                <Menu.Item color={"red"} icon={<FiLogOut size={16}/>} onClick={submitLogout}>Logout</Menu.Item>
            </Menu>
        </Box>
    )
}