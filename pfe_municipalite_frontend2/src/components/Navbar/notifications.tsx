import {
  ActionIcon,
  Indicator,
  Popover,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

const Notifications = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false);

    return (
       <Popover 
       opened={opened} 
       onClose={() => setOpened(false)}
       target={
            <Indicator position="top-start">
            <ActionIcon variant="outline" onClick={() => setOpened((o) => !o)}>
                    <IoIosNotificationsOutline size={18}/>  
            </ActionIcon>
            </Indicator>}
       position="bottom"
       width="fit-content"
       withArrow
       >
       </Popover>
    )
}

export default Notifications;
