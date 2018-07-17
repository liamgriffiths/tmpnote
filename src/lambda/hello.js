export const handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(process.env.HELLO)
  })
}

