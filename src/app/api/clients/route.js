import dbConnection from '../../components/dbconnect.mjs'
import {NextResponse} from 'next/server'
import { getIronSession } from 'iron-session'
import { hashSync } from 'bcryptjs'
import { cookies } from 'next/headers'
const dotenv = require('dotenv')
dotenv.config();

export async function POST(request) {
    const res = await request.json()

    let result = null

    const query = { email: res.email}
    const emailMatches =  await dbConnection.queryCollection('clients', query)
    if (!(emailMatches.length > 0) && res.name && res.email && res.password) {
      const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })
      session.name = res.name
      session.email = res.email
      session.sellerName = res.sellerName
      await session.save()
      
      const hash = hashSync(res.password, 8)
      const isSeller = (res.isSeller === 'true')
      const sellerName = res.sellerName ? res.sellerName: ""
      const story = res.story ? res.story: ""
      result = await dbConnection.insertDocByIntId('clients', {name: res.name, email: res.email, passwordHash: hash, isSeller: isSeller, sellerName: sellerName, story: story})

    }
    
    return NextResponse.json({result: result})
}
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const sellerName = searchParams.get('sellerName')
  let query = null
  if (sellerName)
    query = { sellerName: sellerName }

  let result
  
  const clients = await dbConnection.queryCollection('clients', query);
  if (clients) {
    result = clients[0]
    result.passwordHash = null
    result.email = null
    result.name = null
    result._id = null
  }
  return Response.json({ seller: result  })
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
  ;
  const products = await dbConnection.queryCollection('products', query);
  return Response.json({ products })
}*/