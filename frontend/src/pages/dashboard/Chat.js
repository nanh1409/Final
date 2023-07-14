import React, { useEffect, useState } from "react";
import {
    Box,
    IconButton,
    Stack,
    Typography,
    Badge,
    Button,
    Divider,
} from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from "phosphor-react";
import { useTheme } from "@mui/material/styles"
import { ChatList } from "../../data";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friend";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";

// const StyleBadge = styled(Badge)(({ theme }) => ({
//     '& .MuiBadge-badge': {
//         backgroundColor: "#44b700",
//         color: "#44b700",
//         boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//         '&::after': {
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             borderRadius: '50%',
//             animation: 'ripple 1.2s infinite ease-in-out',
//             border: '1px solid currentColor',
//             content: '""',
//         }
//     },
//     '@keyframes ripple': {
//         '0%': {
//             transform: 'scale(.8)',
//             opacity: 1,
//         },
//         '100%': {
//             transform: 'scale(2.4)',
//             opacity: 0,
//         }
//     }
// }))
const user_id = window.localStorage.getItem("user_id")

const Chats = () => {
    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false)
    const theme = useTheme();
    const { conversations } = useSelector((state) => state.conversation.direct_chat)
    useEffect(() => {
        socket.emit("get_direct_conversations", { user_id }, (data) => {
            //data=>list of conversation
            dispatch(FetchDirectConversations({ conversations: data }));
        })
    }, [])

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    return (
        <>
            <Box sx={{
                position: "relative",
                width: 320,
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
            }}>
                <Stack p={3} spacing={3} sx={{ height: "100vh", }}>
                    <Stack
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between">
                        <Typography variant="h5">
                            Chats
                        </Typography>
                        <Stack direction={"row"} alignItems={"center"} spacing={1}>
                            <IconButton onClick={() => {
                                handleOpenDialog()
                            }}>
                                <Users />
                            </IconButton>
                            <IconButton>
                                <CircleDashed />
                            </IconButton>
                        </Stack>

                    </Stack>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="black" sx={{ width: "50%" }} />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                        </Search>
                    </Stack>
                    <Stack spacing={1}>
                        <Stack direction="row" alignItems={"center"} spacing={1.5}>
                            <ArchiveBox size={24} />
                            <Button> Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="column"
                        sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
                    >
                        <Stack spacing={2.4}>
                            {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                Pinned
                            </Typography>
                            {ChatList.filter((el) => el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })} */}
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                All Chats
                            </Typography>
                            {conversations.filter((el) => !el.pinned).map((el) => {
                                return <ChatElement {...el} />
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            </Box >
            {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Chats;