// todo: add flow

const { REDIS_PORT, REDIS_HOST, REDIS_AUTH } = process.env

const uuid = require('uuid/v4')
const Redis = require('ioredis')
const redis = new Redis(REDIS_PORT, REDIS_HOST, {
  password: REDIS_AUTH,
  lazyConnect: true,
})

const ONE_WEEK = 604800

const key = (uuid) => (
  `note:${uuid}`
)

const create = async ({ note }) => {
  if (Buffer.byteLength(note, 'utf8') > 10000) {
    throw new Error('10kb limit');
  }

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
    await redis.connect()
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
  } finally {
    redis.disconnect()
  }
}

export const handler = (event, context, callback) => {
  if (event.httpMethod === 'POST') {
    handlePost(event)
      .then((res) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res),
        })
      })
      .catch((err) => {
        callback(null, {
          statusCode: 500,
          body: err.message,
        })
      })
  } else {
    callback(null, {
      statusCode: 400,
      body: 'Not allowed.',
    })
  }
}
