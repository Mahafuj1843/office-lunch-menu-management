import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "./state/settingSlice";

export default configureStore({
    reducer:{
        setting: settingSlice,
    }
})