import DBConnection from '../../components/dbconnect.mjs'
import {NextResponse} from 'next/server'
import { getIronSession } from 'iron-session'
import { hashSync } from 'bcryptjs'
import { cookies } from 'next/headers';
const dotenv = require('dotenv')
dotenv.config();

export async function POST(request) {
    const res = await request.json()
    console.log(res)

    const session = getIronSession(cookies(), { password: process.env.CONNECTION_STRING, cookieName: "handcraftedhaven" })
    session.name = res.name
    session.email = res.email
    await session.save();

    let cursor;
    let dbConnection = new DBConnection()
    const hash = hashSync(res.password, 8)
    cursor = await dbConnection.createDocument('clients', {name: res.name, email: res.email, passwordHash: hash, isSeller: false, sellerName: ""});
    return NextResponse.json({hello: 'world'})
}


    /*console.log(request.body)
    const res = await request.json()
    console.log(res.body)
    return Response.json({ body: "basic response" })*/
    
    /*try {
        
    const res = await request.json()
    console.log(res.body)
    return Response.json({ body: res.body })
    }
    catch (e) {
        console.log(e)
    }
    
    return Response.json({body: "basic response"})*/


  /*
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const id = parseInt(searchParams.get('id'))
  let query = null
  if (category)
    query = { category: category }
  if (id)
  query = { _id: id};
  const dbConnection = new DBConnection();
  const products = await dbConnection.queryCollection('products', query);
  return Response.json({ products })
  */