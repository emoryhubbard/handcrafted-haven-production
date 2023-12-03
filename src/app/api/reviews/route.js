import DBConnection from '../../components/dbconnect.mjs';

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('productId'))
  console.log(id)
  let query = null
  if (id)
    query = { productId: id};
  if (!id)
    return Response.json({ reviews: []})
  const dbConnection = new DBConnection();
  const reviews = await dbConnection.queryCollection('reviews', query);
  return Response.json({ reviews })
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