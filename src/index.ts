import express from 'express'

const server = express()

server.get('/', (request, response) => {
  return response.json({ ok: true })
})

server.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Server listing on port 3333!')
})
