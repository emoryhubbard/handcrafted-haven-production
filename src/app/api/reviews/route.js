import dbConnection from '../../components/dbconnect.mjs'
import {NextResponse} from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
const dotenv = require('dotenv')
dotenv.config()

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('productId'))
  let query = null
  if (id)
    query = { productId: id};
  if (!id)
    return Response.json({ reviews: []})
  
  const reviews = await dbConnection.queryCollection('reviews', query);
  return Response.json({ reviews: reviews })
}

export async function POST(request) {
  const res = await request.json()
  console.log("Various res values: " + res.productId + res.name + res.email + res.rating + res.comment)
  const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })
  let result = false
console.log("Session info: " + session.name + session.email)
  try {
    if (res.email == session.email) {
      console.log("Both emails equal")
      result = await dbConnection.insertDocByIntId('reviews', {productId: parseInt(res.productId), rating: parseInt(res.rating), comment: res.comment, clientName: session.name}) 
    }
  }
  catch (e) {
    console.log("Reviews post error: ")
    console.log(e)
  }
  return NextResponse.json({result: result})
}

/*export default function GET(request) {
    return Response.json({ text: 'Hello' })
}*/
/*
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const product = await res.json()
 
  return Response.json({ product })
}*/