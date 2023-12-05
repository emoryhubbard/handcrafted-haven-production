import {NextResponse} from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import DBConnection from '../../components/dbconnect.mjs'
import { compare } from 'bcryptjs'
const dotenv = require('dotenv')
dotenv.config()

export async function GET(request) {
    const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })
    return NextResponse.json({
        session: {
            name: session.name,
            email: session.email
        }})
}
export async function DELETE(request) {
    const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })
    session.destroy()
    return NextResponse.json({
        success: true})
}
export async function POST(request) {
    const res = await request.json()

    let session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })
    session.destroy()

    session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })
    let dbConnection = new DBConnection()
    let query = { email: res.email }
    const clients = await dbConnection.queryCollection('clients', query)
    const client = clients[0]

    const result = compare(res.password, client.passwordHash)
    if (result) {
        session.name = client.name
        session.email = client.email
        await session.save()
    }

    return NextResponse.json({result: result})
}