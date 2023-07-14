import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    FetchFriendRequests,
    FetchFriends,
    FetchUsers,
} from "../../redux/slices/app";
import { FriendComponent, FriendRequestComponent, UserComponent } from "../../components/Friends";

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const UsersList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);
    // dispatch(FetchUsers())

    const { users } = useSelector((state) => state.app)
    return (
        <>
            {users?.map((el, idx) => {
                // return <UserElement key={idx} {...el} />;
                return <UserComponent key={el._id} {...el} />
            })}
        </>
    );
};

const FriendsList = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(FetchFriends());
    }, []);

    const { friends } = useSelector((state) => state.app);


    return (
        <>
            {friends?.map((el, idx) => {
                return <FriendComponent key={el._id} {...el} />;
            })}
        </>
    );
};

const FriendRequestsList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchFriendRequests());
    }, []);

    const { friendRequests } = useSelector((state) => state.app);

    return (
        <>
            {friendRequests?.map((el, idx) => {
                return <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />;
            })}
        </>
    );
};

const Friends = ({ open, handleClose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            // TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            // aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
        >
            {/* <DialogTitle>{"Friends"}</DialogTitle> */}
            <Stack p={2} sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            <DialogContent>
                <Stack sx={{ height: "100%" }}>
                    <Stack spacing={2.5}>
                        {(() => {
                            switch (value) {
                                case 0: // display all users in this list
                                    return <UsersList />;

                                case 1: // display friends in this list
                                    return <FriendsList />;

                                case 2: // display request in this list
                                    return <FriendRequestsList />;

                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default Friends;
