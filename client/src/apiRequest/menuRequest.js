import axios from "axios";
import { ErrorToast, SuccessToast } from "../helpers/formHelper.js";
import store from "../store/store";
import { getToken } from "../helpers/sessionHelper.js";
import { setMenuDetails, setMenuTotal, setMenus } from "../store/state/menuSlice.js";
import { hideLoader, showLoader } from "../store/state/settingSlice.js";

const BaseURL = "http://localhost:8082/api"
const AxiosHeader = { headers: { "token": getToken() } }

export const CreateMenuRequest = async (menu) => {
    try {
        store.dispatch(showLoader())
        let url = BaseURL + "/menu/create";
        const result = await axios.post(url, menu, AxiosHeader);
        store.dispatch(hideLoader())

        if (result.status === 201) {
            SuccessToast("Menu created.")
            return true;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    } catch (error) {
        store.dispatch(hideLoader())
        if (error.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        } else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
}

// Today lunch menu list
export const todayMenuListRequest = async (pageNo, perPage, searchKey) => {
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

// All menu list for Admin
export const menuListRequest = async (pageNo, perPage, searchKey) => {
    try {
        store.dispatch(showLoader())
        let url = BaseURL + `/menu/all/list?page=${pageNo}&limit=${perPage}&querys=${searchKey}`;
        const result = await axios.get(url, AxiosHeader);

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

export const menuDetailsRequest = async (id) => {
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

export const updateMenuRequest = async (menu, id) => {
    try {
        store.dispatch(showLoader())
        let url = BaseURL + "/menu/" + id;
        const result = await axios.put(url, menu, AxiosHeader);
        store.dispatch(hideLoader())

        if (result.status === 200) {
            SuccessToast("Menu has been updated.")
            return true;
        }
        ErrorToast("Something went wrong.")
        return false;
    } catch (error) {
        store.dispatch(hideLoader())
        if (error.response.data.status === 400) {
            ErrorToast(err.response.data.message)
            return false;
        }
        ErrorToast("Something went wrong.")
        return false;
    }
}

export const menuDeleteRequest = async (id) => {
    try {
        let url = BaseURL + "/menu/" + id;
        const result = await axios.delete(url, AxiosHeader);
        if (result.status === 200) {
            SuccessToast("Menu has been deleted.")
            return true;
        } else {
            ErrorToast("Something went wrong.")
            return false;
        }
    } catch (error) {
        ErrorToast("Something went wrong.")
        return false;
    }
}