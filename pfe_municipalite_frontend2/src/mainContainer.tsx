import { AppShell, Box, ScrollArea, useMantineTheme } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import TopHeader from "./components/Header";
import { LeftNavbar } from "./components/Navbar";
import { TopNav } from "./components/Navbar/topNavBar";
import { setCredentials } from "./redux/features/authSlice";
import { AuthVerify } from "./utils/tokenVerif";
function MainContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const viewport = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const token_check = AuthVerify();
      if (token_check === false) {
        navigate("/login");
      } else {
        dispatch(
          setCredentials({
            user: JSON.parse(localStorage.getItem("user") || "null"),
            token: localStorage.getItem("token"),
          })
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);
  return (
    <AppShell
      styles={{main:{background: theme.colorScheme==="dark" ? theme.colors.dark[8] : theme.colors.gray[0]}}}
      header={<TopNav opened={opened} setOpened={setOpened} />}
      navbar={<LeftNavbar opened={opened} />}
      navbarOffsetBreakpoint="sm"
      fixed>
        <ScrollArea
          id="scrollcontainer"
          style={{ height: "100%" }}
          viewportRef={viewport}
        >
            <Outlet />
        </ScrollArea>
    </AppShell>
  );
}

export default MainContainer;
