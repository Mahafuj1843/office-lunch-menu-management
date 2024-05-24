import React, { useState } from 'react'
import AppWrapper from '../../components/AppWrapper'
import { useNavigate, useParams } from 'react-router-dom';
import { CreateMenuRequest } from '../../apiRequest/menuRequest';
import { ErrorToast, IsEmpty } from '../../helpers/formHelper';

const CreateUpdateMenuPage = () => {
    let navigate = useNavigate();
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);
    const [menu, setMenu] = useState({
        title: "",
        desc: "",
        mDate: "",
    })

    const param = useParams();

    const handleChange = (e) => {
        setMenu({ ...menu, [e.target.name]: e.target.value });
    };

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e) => {
        e.preventDefault()
        setExtraOptions((prev) => [...prev, extra.extra]);
        setExtra({ ...extra, extra: "" });
    };

    const handleDelete = (f) => {
        const temp = extraOptions.filter(e => e !== f)
        setExtraOptions(temp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (IsEmpty(menu.title)) {
            ErrorToast("Title required !")
        }else if(IsEmpty(menu.desc)){
            ErrorToast("Description required !")
        }else if(IsEmpty(menu.mDate)){
            ErrorToast("Date required !")
        }else{
            const result = await CreateMenuRequest({...menu, extras:extraOptions});

            if (result) navigate('/menuList')
        }
    }

    const handleUpdate = () =>{

    }

    return (
        <AppWrapper>
            <div className='w-[100vw] px-[1rem] md:px-[2rem] lg:px-[5rem] py-6 mt-16'>
                <form onSubmit={param?.id ? handleUpdate : handleSubmit} className='w-full space-y-2 md:w-[40%] mx-auto py-4'>
                    <h3 className='text-2xl font-semibold'>{param.id ? "Update menu" : "Create new menu" }</h3>
                    <hr />
                    <div className='space-y-1'>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="title">Title *</label>
                            <input onChange={handleChange} name="title" type="text" id='title' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" />
                        </div>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="desc">Description *</label>
                            <input onChange={handleChange} name="desc" type="text" id='desc' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" />
                        </div>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="date">Date *</label>
                            <input onChange={handleChange} value={menu.mDate.split(" ")[0]} name="mDate" type="date" id='date' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" />
                        </div>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="date">Add Features *</label>
                            <div className="flex items-center gap-x-2">
                                <input onChange={handleExtraInput} name='extra' value={extra?.extra} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" placeholder="e.g. Cold drink" />
                                <button onClick={handleExtra} className='py-1 px-3 text-sm font-medium float-right text-white bg-[#1c6823] rounded-lg border border-[#1c6823] hover:opacity-85 focus:ring-4 focus:outline-none'>Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {extraOptions?.map((f) => (
                                    <div className="item" key={f}>
                                        <button onClick={()=>handleDelete(f)} className='p-2 text-green-700 ring-1 ring-inset ring-green-600/20'>
                                            {f}
                                            <span className='text-red-700 text-sm ms-3 font-bold'>X</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    {
                        param.id ? 
                        <button type="submit" className='px-3 py-2 text-sm font-medium float-right text-white bg-[#1c6823] rounded-lg border border-[#1c6823] hover:opacity-85 focus:ring-4 focus:outline-none'>Update</button>
                        :
                        <button type="submit" className='px-3 py-2 text-sm font-medium float-right text-white bg-[#1c6823] rounded-lg border border-[#1c6823] hover:opacity-85 focus:ring-4 focus:outline-none'>Create</button>
                    }
                </form>
            </div>
        </AppWrapper>
    )
}

export default CreateUpdateMenuPage
