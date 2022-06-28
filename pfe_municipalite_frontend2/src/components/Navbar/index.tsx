import {
  Group,
  Navbar, Skeleton,
} from "@mantine/core";
import { MainLinks } from "./mainLinks";
import { UserInfo } from "./userInfo";
import { store } from "../../redux/store";
import React, { useEffect, useState } from "react";
import { User } from "../../redux/services/interfaces/user.interface";

interface LeftNavbarProps {
  opened: boolean;
}


export const LeftNavbar:React.FC<LeftNavbarProps> = (props) => {
  const [user,SetUser] = useState<User | null>();

  useEffect(() =>{
    const interval = setInterval(()=>{
      SetUser(store.getState().auth.user);
    },100)
    
    return () => clearInterval(interval)
  },[user])

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{sm:200,lg:300}}>
      <Navbar.Section grow mt="md">
        {user === null ?
        <Group>
        <Skeleton height={45} />
        <Skeleton height={45} />
        <Skeleton height={45} />
        <Skeleton height={45} />
        </Group> : 
        <MainLinks role={user?.employeeType.role} />}
      </Navbar.Section>
      <Navbar.Section>
        <UserInfo />
      </Navbar.Section>
    </Navbar>
  );
};
