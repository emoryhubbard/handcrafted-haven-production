import DBConnection from '../../components/dbconnect.mjs';

export async function GET(request) {
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