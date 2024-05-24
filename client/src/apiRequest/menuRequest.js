import axios from "axios";
import { ErrorToast } from "../helpers/formHelper.js";
import store from "../store/store";
import { getToken } from "../helpers/sessionHelper.js";
import { setMenuDetails, setMenuTotal, setMenus } from "../store/state/menuSlice.js";
import { hideLoader, showLoader } from "../store/state/settingSlice.js";

 const BaseURL = "http://localhost:8082/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const menuListRequest = async (pageNo, perPage, searchKey) => {
    try {
        store.dispatch(showLoader())
        let url = BaseURL + `/menu?page=${pageNo}&limit=${perPage}&querys=${searchKey}`;
        const result = await axios.get(url);

        store.dispatch(hideLoader())
        if (result.status === 200) {
            store.dispatch(hideLoader())
            if (result.data.data.length > 0) {
                store.dispatch(setMenus(result.data.data))
                store.dispatch(setMenuTotal(result.data.totalMenus))
            } else {
                store.dispatch(setMenus([]))
                store.dispatch(setMenuTotal(0))
                ErrorToast("No data found.")
            }
        } else {
            ErrorToast("Something went wrong.")
        }
    } catch (error) {
        store.dispatch(hideLoader())
        ErrorToast("Something went wrong.")
    }
}

export const MenuDetailsById = async (id) => {
    try {
        let url = BaseURL + "/menu/" + id;
        const result = await axios.get(url, AxiosHeader);
        if (result.status === 200) {
                store.dispatch(setMenuDetails(result.data.data))
        } else {
            ErrorToast("Something went wrong.")
        }
    } catch (error) {
        ErrorToast("Something went wrong.")
    }
}