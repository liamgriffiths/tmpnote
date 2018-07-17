// todo: add flow
const uuid = require('uuid/v4')
const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)

const ONE_WEEK = 604800

const key = (uuid) => (
  `note:${uuid}`
)

const create = async ({ note }) => {
  const id = uuid()
  await redis.set(key(id), note, 'NX', 'EX', ONE_WEEK)
  return { id }
}

const destroy = async ({ id }) => {
  await redis.del(key(id))
  return { status: 'ok' }
}

const read = async ({ id }) => {
  const [[_1, note], _2] = await redis.multi().get(key(id)).del(key(id)).exec()
  return { note }
}

const handlePost = async (event) => {
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
  if (event.httpMethod === 'POST') {
    handlePost(event)
      .then((res) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res)
        })
      })
      .catch((err) => {
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
