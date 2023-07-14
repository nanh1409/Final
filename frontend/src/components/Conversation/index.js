import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import Contact from "../Contact";

const Conversation = () => {
    const theme = useTheme();

    return (
        <>
            <Stack height={"100%"} maxHeight={"100vh"} width={"200%"} position={"relative"}>
                <Header />
                <Box
                    width={"100%"}
                    sx={{
                        flexGrow: 1,
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background.paper,
                        overflowY: "scroll",
                    }}
                >
                    <Message menu={true} />
                </Box>
                <Footer />
            </Stack>

        </>

    );
};

export default Conversation;
