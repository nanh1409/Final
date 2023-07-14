import React from "react";
import Chats from "./Chat";
import { Box, Stack, Typography } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessage from "../../components/SharedMessages";
import StarredMessage from "../../components/StarredMessages";
import NoChatSVG from "../../assets/Illustration/NoChat"

const GeneralApp = () => {
  const theme = useTheme();
  const { sideBar, chat_type, room_id } = useSelector((store) => store.app)

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sideBar.open ? "497px" : "658px",
          backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.paper,
        }}>
        {room_id !== null && chat_type === "individual" ? <Conversation /> :
          <Stack spacing={2} sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
            <NoChatSVG />
            <Typography variant="subtitle2">
              Select a Conversation or start new one
            </Typography>
          </Stack>
        }
      </Box>
      <Box
        sx={{
          width: sideBar.open ? "200px" : "0px",
          position: "relative",
          left: 500
        }}
      >
        {sideBar.open && (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />
            case "STARRED":
              return <StarredMessage />
            case "SHARED":
              return <SharedMessage />
            default:
              break;
          }
        })()}
      </Box>
    </Stack>
  );
};

export default GeneralApp;
