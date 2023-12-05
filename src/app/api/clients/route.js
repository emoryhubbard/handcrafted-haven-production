import DBConnection from '../../components/dbconnect.mjs'
import {NextResponse} from 'next/server'
import { getIronSession } from 'iron-session'
import { hashSync } from 'bcryptjs'
import { cookies } from 'next/headers'
const dotenv = require('dotenv')
dotenv.config();

export async function POST(request) {
    const res = await request.json()

    let dbConnection = new DBConnection()
    let result = null

    const query = { email: res.email}
    const emailMatches =  await dbConnection.queryCollection('clients', query)
    if (!(emailMatches.length > 0)) {
      const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })
      session.name = res.name
      session.email = res.email
      await session.save()
      
      const hash = hashSync(res.password, 8)
      result = await dbConnection.insertDocByIntId('clients', {name: res.name, email: res.email, passwordHash: hash, isSeller: false, sellerName: ""})

    }
    
    return NextResponse.json({result: result})
}

/*export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('id')
  const id = parseInt(searchParams.get('id'))
  let query = null
  if (category)
    query = { category: category }
  if (id)
  query = { _id: id};
  const dbConnection = new DBConnection();
  const products = await dbConnection.queryCollection('products', query);
  return Response.json({ products })
}*/