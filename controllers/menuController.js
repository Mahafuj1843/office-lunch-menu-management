import prisma from "../config/db.js"

export const createMenu = async (req, res, next) => {
    const { title, desc, mDate, extras } = req.body
    try {
        if (!title || !desc || !mDate)
            return next(createError(400, "Please fill the all requried fields."));

        const newMenu = await prisma.menus.create({
            data: {
                title: title,
                desc: desc,
                date: new Date(mDate),
                extras: extras
            }
        })

        const { date, createdAt, updatedAt, ...otherDetails } = newMenu;

        return res.status(201).json({ data: { ...otherDetails } })
    } catch (err) {
        next(err)
    }
}

export const allMenus = async (req, res, next) => {
    const pageNo = req.query.page > 0 ? req.query.page : 1;
    const perPage = (req.query.limit > 0 && req.query.limit < 30) ? req.query.limit : 5;
    const skip = (pageNo - 1) * perPage;
    let menus, totalMenus

    // Get today's date at the start of the day (00:00:00)
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Get today's date at the end of the day (23:59:59.999)
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    try {
        if (req.query.querys.length) {
            menus = await prisma.menus.findMany({
                where: {
                    AND: [
                        {
                            title: {
                                search: req.query.querys
                            }
                        },
                        {
                            date: {
                                gte: startOfDay,
                                lte: endOfDay
                            },
                        },
                    ]
                },
                select: {
                    id: true,
                    title: true,
                    date: true,
                    desc: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count({
                where: {
                    AND: [
                        {
                            title: {
                                search: req.query.querys
                            }
                        },
                        {
                            date: {
                                gte: startOfDay,
                                lte: endOfDay
                            }
                        },
                    ]
                },
            })
        } else {
            menus = await prisma.menus.findMany({
                where: {
                    date: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                },
                select: {
                    id: true,
                    title: true,
                    desc: true,
                    date: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count({
                where: {
                    date: {
                        gte: startOfDay,
                        lte: endOfDay
                    }
                },
            })
        }

        return res.status(200).json({ data: menus, totalMenus })
    } catch (error) {
        next(error)
    }
}

export const singleMenus = async (req, res, next) => {
    try {
        const menu = await prisma.menus.findFirst({
            where: {
                id: Number(req.params.id)
            },
            select: {
                id: true,
                title: true,
                desc: true,
                extras: true,
            }
        })
        return res.status(200).json({ data: menu })
    } catch (error) {
        next(error)
    }
}

export const menuList = async (req, res, next) => {
    const pageNo = req.query.page > 0 ? req.query.page : 1;
    const perPage = (req.query.limit > 0 && req.query.limit < 30) ? req.query.limit : 5;
    const skip = (pageNo - 1) * perPage;
    let menus, totalMenus

    try {
        if (req.query.querys.length) {
            menus = await prisma.menus.findMany({
                where: {
                    title: {
                        search: req.query.querys
                    }
                },
                select: {
                    id: true,
                    title: true,
                    date: true,
                    desc: true,
                },
                orderBy: {
                    date: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count({
                where: {
                    title: {
                        search: req.query.querys
                    }
                },
            })
        } else {
            menus = await prisma.menus.findMany({
                select: {
                    id: true,
                    title: true,
                    desc: true,
                    date: true,
                },
                orderBy: {
                    date: "desc"
                },
                skip: Number(skip),
                take: Number(perPage)
            })

            // To get total menu
            totalMenus = await prisma.menus.count()
        }

        return res.status(200).json({ data: menus, totalMenus })
    } catch (error) {
        next(error)
    }
}

export const updateMenu = async (req, res, next) => {
    const { title, desc, mDate, extras } = req.body

    try {
        const menu = await prisma.menus.update({
            where: {
                id: Number(req.params.id)
            },
            data: { title, desc, date: new Date(mDate), extras }
        })
        return res.status(200).json({ data: menu, msg: "Menu updated successfully." })

    } catch (error) {
        next(error)
    }
}

export const deleteMenu = async (req, res, next) => {
    try {
        const menu = await prisma.menus.delete({
            where: {
                id: Number(req.params.id)
            }
        })
        return res.status(200).json({ msg: "Menu delete successfully." })
    } catch (error) {
        next(error)
    }
}

