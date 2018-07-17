// todo: add flow
const uuid = require('uuid/v4')
const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)

const ONE_WEEK = 604800

const key = (uuid) => (
  `note:${uuid}`
)

const create = async ({ note }) => {
  console.log('create', Date.now())
  const id = uuid()
  await redis.set(key(id), note, 'NX', 'EX', ONE_WEEK)
  return `{ "id": "${id}" }`
}

const destroy = async ({ id }) => {
  console.log('destroy', Date.now())
  await redis.del(key(id))
  return { status: 'ok' }
}

const read = async ({ id }) => {
  console.log('read', Date.now())
  const [[_1, note], _2] = await redis.multi().get(key(id)).del(key(id)).exec()
  return { note }
}

const handlePost = async (event) => {
  console.log('handlePost', Date.now())
  try {
    const { action, payload } = JSON.parse(event.body)
    switch (action) {
      case 'read':
        return await read(payload)
      case 'destroy':
        return await destroy(payload)
      case 'create':
        return await create(payload)
      default:
        throw new Error(`Unsupported ${action}`)
    }
  } catch (err) {
    throw err
  }
}

export const handler = (event, context, callback) => {
  console.log('handler', Date.now())
  if (event.httpMethod === 'POST') {
    handlePost(event)
      .then((res) => {
        console.log('success', Date.now())
        callback(null, {
          statusCode: 200,
          body: res,
        })
      })
      .catch((err) => {
        console.log('error', Date.now())
        callback(null, {
          statusCode: 500,
          body: 'Something went wrong.',
        })
      })
  } else {
    callback(null, {
      statusCode: 400,
      body: 'Not allowed.',
    })
  }
}
