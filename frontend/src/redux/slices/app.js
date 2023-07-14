import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
// import { dispatch } from "../store";
// import axios from "axios";

const initialState = {
    sideBar: {
        open: false,
        type: "CONTACT",
    },
    users: [],
    friends: [],
    friendRequests: [],
    chat_type: null,
    room_id: null,
};

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        // Toggle Sidebar
        toggleSideBar(state, action) {
            state.sideBar.open = !state.sideBar.open;
        },
        updateSideBarType(state, action) {
            state.sideBar.type = action.payload.type;
        },
        updateUsers(state, action) {
            state.users = action.payload.users;
        },

        updateFriends(state, action) {
            state.friends = action.payload.friends;
        },

        updateFriendRequests(state, action) {
            state.friendRequests = action.payload.requests;
        },
        selectConversation(state, action) {
            state.chat_type = "individual";
            state.room_id = action.payload.room_id;

        }
    },
});

export const FetchUsers = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }).then((response) => {
            dispatch(slice.actions.updateUsers({ users: response.data.data }))
        }).catch((error) => {
            console.log(error);
        });
    };
};

export const FetchFriends = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friends", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }).then((response) => {
            dispatch(slice.actions.updateFriends({ friends: response.data.data }))
        }).catch((error) => {
            console.log(error);
        });
    };
};

export const FetchFriendRequests = () => {
    return async (dispatch, getState) => {
        await axios.get("/user/get-friend-requests", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().auth.token}`,
            },
        }).then((response) => {

            dispatch(slice.actions.updateFriendRequests({ requests: response.data.data }))
        }).catch((error) => {
            console.log(error);
        });
    };
};

// Reducer
// export const {
//     toggleSideBar,
//     updateSideBarType,
//     selectConversation
// } = slice.actions

export default slice.reducer;

export function ToggleSidebar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSideBar());
    };
}
export function UpdateSidebarType(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSideBarType({ type }));
    };
}

export const SelectConversation = ({ room_id }) => {
    return (dispatch, getState) => {
        dispatch(slice.actions.selectConversation({ room_id }))
    }
}