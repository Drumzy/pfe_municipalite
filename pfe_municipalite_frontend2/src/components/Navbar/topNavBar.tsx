import * as React from "react";
import Logo from "../../images/municipalite-grombalia1.png";
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  Box,
  Title,
  Image,
  Center,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Notifications from "./notifications";

interface TopNavProps {
  opened:boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}
export const TopNav:React.FC<TopNavProps> = (props) => {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Header height={70} p="md">
      <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", height: "100%"}}>
        <MediaQuery largerThan="sm" styles={{ display : "none"}}>
          <Burger opened={props.opened} onClick={() => props.setOpened((o) => !o)} size="sm" color={theme.colors.gray[6]} mr="xl"/>
        </MediaQuery>
        <Group  >
        <Image
            width={40}
            height={40}
            src={Logo}
            alt="Random unsplash image"
          />
        <Title order={5}
          sx={(theme) => ({
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          })}
        >
          Municipalite Grombalia
        </Title>
        </Group>
        <Group>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "violet"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <BsFillSunFill size={18} /> : <BsFillMoonFill size={18} />}
          </ActionIcon>
          <Notifications />
        </Group>
      </div>
    </Header>
  );
}
