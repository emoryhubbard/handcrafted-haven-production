import DBConnection from '../../components/dbconnect.mjs';

export async function GET(request) {
  /*const { searchParams } = new URL(request.url)
  const category = searchParams.get('id')
  const id = parseInt(searchParams.get('id'))
  let query = null
  if (category)
    query = { category: category }
  if (id)
  query = { _id: id};
  const dbConnection = new DBConnection();
  const products = await dbConnection.queryCollection('products', query);
  return Response.json({ products })*/
  return Response.json( {Hello: "World"} )
}