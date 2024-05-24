import React, { useState } from 'react'
import SelectMenuModel from './models/SelectMenuModel'
import { MenuDetailsById } from '../apiRequest/menuRequest'

const MenuCard = ({ menu, setShowPopup }) => {
    const onSelectMenu = async (id) =>{
        await MenuDetailsById(id);
        setShowPopup(true);
    }
    return (
        <>
            <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg" src="https://as1.ftcdn.net/v2/jpg/02/51/39/42/1000_F_251394284_Tn8Z8opzrQylClF7Nu8cuA26lf398oCS.jpg" alt="menu-img" />
                </a>
                <div class="px-2 md:px-5 py-2">
                    <h5 class="mb-2 text-md md:text-lg font-bold tracking-tight text-gray-900 dark:text-white">{menu.title}</h5>
                    <p class="mb-3 text-sm font-light md:font-normal text-gray-700 dark:text-gray-400">{menu.desc}</p>
                    <button onClick={()=>onSelectMenu(menu.id)} class="w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Select now
                    </button>
                </div>
            </div>
        </>
    )
}

export default MenuCard
