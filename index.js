const db = require('./db')

// CommonJs
const fastify = require('fastify')({
  logger: true
})

//get all buku
fastify.get('/buku/all', async (request, reply) => {
  const buku = await db.query(`select * from buku`);
  if (buku.length === 0) {
    throw new Error('No Data found')
  }
  return buku;
});

//get spesifik buku
fastify.get('/buku/:judul', async (request, reply) => {
 const {judul} = request.params;

 const query = `select * from buku where judul ilike $1`;
 const values = [`%${judul}%`];

 const result = await db.query(query, values);
 return result;
  
});

//update buku
fastify.put('/buku/:id', async (request, reply) => {
  const {sku,judul,harga,stock} = request.body;
  const {id} = request.params;
  
  const query = `update buku set sku = $1, judul= $2, harga= $3, stock= $4 where id = $5;`;
  const values = [sku,judul,harga,stock,id];

  const result = await db.query(query,values);
  return result;
});

//insert buku
fastify.post('/buku', async (request, reply) => {
  const {sku,judul,harga,stock} = request.body;
  
  const query = `insert into buku (sku,judul,harga,stock) values ($1,$2,$3,$4);`;
  const values = [sku,judul,harga,stock];

  const result = await db.query(query,values);
});

//hapus spesifik buku
fastify.delete('/buku/:id', async (request, reply) => {
  const {id} = request.params;

  const query = `delete from buku where id = $1;`;
  const values = [id];

  const result = await db.query(query, values);
  return result;
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3002 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()