import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "./state/settingSlice";
import menuSlice from "./state/menuSlice";
import choiceSlice from "./state/choiceSlice";

export default configureStore({
    reducer:{
        setting: settingSlice,
        menu: menuSlice,
        choice: choiceSlice
    }
})