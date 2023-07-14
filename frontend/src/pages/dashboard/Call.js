import React from 'react'
import { Stack, Box, Typography, Link, IconButton, Divider } from "@mui/material";
import Search from "../../components/Search/Search";
import SearchIconWrapper from "../../components/Search/SearchIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { CallLogElement } from '../../components/CallElement';
import { CallLogs } from '../../data';
import StartCall from '../../sections/main/StartCall';
import { useState } from 'react';

const Call = () => {
    const theme = useTheme();
    const [openDialog, setopenDialog] = useState(false)

    const handleCloseDialog = () => {
        setopenDialog(false)
    }

    return (
        <>
            <Stack direction={"row"} sx={{ width: "100%" }}>
                <Box sx={{
                    height: "100vh",
                    backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                    width: 320,
                    boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"
                }}>
                    <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
                        <Stack>
                            <Typography variant="h5">Call Logs</Typography>
                        </Stack>
                        <Stack sx={{ width: "100%" }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color="#709CE6" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search..."
                                    inputProps={{ "aria-label": "search" }}
                                />
                            </Search>
                        </Stack>
                        <Stack direction={"row"} justifyContent="space-between" alignItems={"center"}>
                            <Typography variant="subtitle2" component={Link}>
                                Start Conversation
                            </Typography>
                            <IconButton onClick={() => {
                                setopenDialog(true)
                            }}>
                                <Plus style={{ color: theme.palette.primary.main }} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack sx={{ flexGrow: 1, height: "100%" }}>
                            <SimpleBarStyle timeout={500} clickOnTrack={false}>
                                <Stack spacing={2.4}>


                                    {CallLogs.map((el) => <CallLogElement {...el} />)}
                                    <CallLogElement />

                                </Stack>
                            </SimpleBarStyle>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Call