import prisma from "../config/db.js"

export const createChoice = async (req, res, next) => {
    const { menuId, extras } = req.body
    try {

        const newChoice = await prisma.choices.create({
            data: {
                userId: req.user.id,
                menuId: Number(menuId),
                extras: extras
            }
        })

        // const { date, createdAt, updatedAt, ...otherDetails } = newMenu;

        return res.status(201).json({ data: newChoice })
    } catch (err) {
        next(err)
    }
}

export const allChoices = async (req, res, next) => {
    const pageNo = req.query.page > 0 ? req.query.page : 1;
    const perPage = (req.query.limit > 0 && req.query.limit < 30) ? req.query.limit : 5;
    const skip = (pageNo - 1) * perPage;
    let choices, totalChoices

    try {
        choices = await prisma.choices.findMany({
            select: {
                id: true,
                extras: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    }
                },
                menu: {
                    select: {
                        title: true
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: Number(skip),
            take: Number(perPage)
        })

        // To get total choice
        totalChoices = await prisma.choices.count()

        return res.status(200).json({ data: choices, totalChoices })
    } catch (error) {
        next(error)
    }
}

export const myChoices = async (req, res, next) => {
    const pageNo = req.query.page > 0 ? req.query.page : 1;
    const perPage = (req.query.limit > 0 && req.query.limit < 30) ? req.query.limit : 5;
    const skip = (pageNo - 1) * perPage;
    let choices, totalChoices

    try {
        choices = await prisma.choices.findMany({
            where: {
                userId: req.user.id
            },
            select: {
                id: true,
                extras: true,
                createdAt: true,
                user: {
                    select: {
                        name: true
                    }
                },
                menu: {
                    select: {
                        title: true
                    }
                },
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: Number(skip),
            take: Number(perPage)
        })

        // To get total choice
        totalChoices = await prisma.choices.count({
            where: {
                userId: req.user.id
            }
        })
        return res.status(200).json({ data: choices, totalChoices })
    } catch (error) {
        next(error)
    }
}