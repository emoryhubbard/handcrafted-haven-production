import dbConnection from '../../components/dbconnect.mjs';
import {NextResponse} from 'next/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
const dotenv = require('dotenv')
dotenv.config();

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const id = parseInt(searchParams.get('id'))
  const sellerName = searchParams.get('sellerName')
  let query = null
  if (category)
    query = { category: category }
  if (id)
    query = { _id: id}
  if (sellerName)
    query = { seller: sellerName}
  ;
  const products = await dbConnection.queryCollection('products', query);
  return Response.json({ products })
}

export async function POST(request) {
  const res = await request.json()
  console.log(res.name + res.description + res.price + res.category + res.url + res.seller)
  let result = null
  const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })

  if (res.name && res.description && res.price && res.category && res.url && (res.seller == session.sellerName)) {
    console.log("About to Insert Product")
    result = await dbConnection.insertDocByIntId('products', {name: res.name, price: parseFloat(res.price), category: res.category, description: res.description, seller: res.seller, url: res.url})
  }
  return NextResponse.json({result: result})
}

export async function DELETE(request) {
  
  const res = await request.json()
  console.log(res.productId + res.sellerName)
  const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })

  let query = { _id: parseInt(res.productId)}
  const products = await dbConnection.queryCollection('products', query)
  const product = products[0]
  console.log(product._id+ product.name + product.seller + res.sellerName + session.sellerName)

  let result = null
  if ((product.seller == res.sellerName) && (product.seller == session.sellerName)) {
    console.log("About to Delete Product")
    result = await dbConnection.deleteDocument('products', { _id: product._id })
  }
  return NextResponse.json({result: result})
}

export async function PUT(request) {
  const res = await request.json()
  console.log(res.productId + res.seller)
  const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD, cookieName: "handcraftedhaven" })

  let query = { _id: parseInt(res.productId)}
  const products = await dbConnection.queryCollection('products', query)
  const product = products[0]
  console.log(product._id+ product.name + product.seller + res.seller + session.sellerName)

  let result = null
  if ((product.seller == res.seller) && (product.seller == session.sellerName)) {
    console.log("About to Update Product")
    result = await dbConnection.updateDocument('products', { _id: product._id }, {name: res.name, price: res.price, description: res.description, category: res.category, seller: res.seller, url: res.url})
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