import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "./state/settingSlice";
import menuSlice from "./state/menuSlice";

export default configureStore({
    reducer:{
        setting: settingSlice,
        menu: menuSlice,
    }
})