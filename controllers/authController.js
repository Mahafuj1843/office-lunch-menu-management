import jwt  from "jsonwebtoken";
import prisma from "../config/db.js"
import { checkHash, makeHash } from "../utils/hash.js";
import { createError } from './../utils/error.js';

let EmailRegx =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const registration = async (req, res, next) =>{
    const { name, email, password } = req.body

    try {
        if (!name || !email || !password)
            return next(createError(400, "Please fill the all requried fields."));

        if(!EmailRegx.test(email))
            return next(createError(400, "Please give a valid email."));

        if (req.body.password.length < 6 || req.body.password.length > 12)
            return next(createError(400, "Password must be 6 to 12 characters."));

        const user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        // Checking user already register or not.
        if(user) return next(createError(400, "Email already registred."));

        await prisma.users.create({
            data:{
                name: name,
                email: email,
                password: makeHash(password)
            }
        })
        return res.status(201).send("Registration successfull.")
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) =>{
    const { email, pass } = req.body

    try {
        if (!email || !pass)
            return next(createError(401, "Please fill the all requried fields."));

        if(!EmailRegx.test(email))
            return next(createError(401, "Please give a valid email."));

        const user = await prisma.users.findUnique({
            where:{
                email: email
            }
        })

        // Checking user password match or not.
        if(!await checkHash(pass, user.password)) 
            return next(createError(400, "Email or Password does not match."));

        // Create JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT)

        //Destructring user object for excluding password.
        const { password, updatedAt, ...otherDetails } = user;

        res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 86400) }).status(200).json({ token: token, data: {...otherDetails} })
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) =>{
    try {
        res.cookie("access_token", "", { httpOnly: true, expires: new Date(Date.now()) }).status(200).send("Logout successfully.")
    } catch (err) {
        next(err)
    }
}