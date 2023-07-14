import React, { useState } from "react";
import {
    Box,
    Grid,
    IconButton,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import { CaretLeft } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SHARED_DOCS, SHARED_LINKS } from "../data";
import { DocMsg, LinkMsg } from "./Conversation/MsgType";

const StarredMessage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: 320, height: "100vh " }}>
            <Stack sx={{ height: "100%" }}>
                <Box
                    sx={{
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                        width: "100%",
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background,
                    }}
                >
                    <Stack
                        sx={{ height: "100%", p: 2 }}
                        direction="row"
                        alignItems="center"
                        spacing={3}
                    >
                        <IconButton
                            onClick={() => {
                                dispatch(UpdateSidebarType("CONTACT"));
                            }}
                        >
                            x
                        </IconButton>
                        <Typography variant="subtitle2">Starred Messages</Typography>
                    </Stack>
                </Box>

                <Tabs
                    sx={{
                        px: 2,
                        pt: 2,
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background,
                    }}
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Media" />
                    <Tab label="Links" />
                    <Tab label="Docs" />
                </Tabs>
                <Stack
                    sx={{
                        position: "relative",
                        height: "100%",
                        flexGrow: "1",
                        overflow: "scroll",
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#F8FAFF"
                                : theme.palette.background,
                    }}
                    p={3}
                    spacing={1 === 1 ? 1 : 3}
                >
                    {(() => {
                        switch (value) {
                            case 0:
                                //Images
                                return (
                                    <Grid container spacing={2}>
                                        {[0, 1, 2, 3, 4, 5, 6].map((el) => (
                                            <Grid item xs={4} key={el}>
                                                <img
                                                    src={faker.image.avatar()}
                                                    alt={faker.name.fullName()}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                );
                            case 1:
                                return SHARED_LINKS.map((el) => {
                                    return <LinkMsg el={el} />;
                                });
                            case 2:
                                return SHARED_DOCS.map((el) => {
                                    return <DocMsg el={el} />;
                                });
                        }
                    })()}
                </Stack>
            </Stack>
        </Box>
    );
};

export default StarredMessage;
