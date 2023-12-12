export const getSql = async (generationId: string) => {
  return `CREATE TABLE users (
  user_id uuid PRIMARY KEY,
  first_name text,
  last_name text,
  address text,
  email text
);


CREATE TABLE products (
  product_id uuid PRIMARY KEY,
  product_name text,
  description text,
  price int
);


CREATE TABLE orders (
  order_id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(user_id),
  product_ordered uuid REFERENCES products(product_id),
  total_paid int
);`
  // const request = await fetch(
  //   'https://alzlkfdazartjjavpgfi.supabase.co/functions/v1/get-data-generation',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({ generationId }),
  //     headers: {
  //       'Content-type': 'application/json'
  //     }
  //   }
  // )
  // const response = await request.json()
  // const { data } = response
  // return data
}
