import { createSlice } from "@reduxjs/toolkit";

const notifSlice = createSlice({
    name: 'notif',
    initialState: '',
    reducers: {
        setNotif(state, action) {
            return action.payload
        },
        removeNotif() {
            return ''
        }
    }
})

export const { setNotif, removeNotif } = notifSlice.actions
export default notifSlice.reducer
