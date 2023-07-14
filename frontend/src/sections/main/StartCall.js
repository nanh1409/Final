import React from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Stack,
} from "@mui/material";
import Search from "../../components/Search/Search";
import SearchIconWrapper from "../../components/Search/SearchIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { CallElement } from '../../components/CallElement';
import { MembersList } from '../../data';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>

            <DialogContent>
                <Stack spacing={3}>
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
                </Stack>

                {MembersList.map((el) => <CallElement {...el} />)}
                <CallElement />
            </DialogContent>
        </Dialog>
    )
}

export default StartCall