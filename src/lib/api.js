// @flow

const LAMBDA_PATH = '/.netlify/functions/note'

type Params =
  | { action: 'create', payload: { note: string }}
  | { action: 'destroy', payload: { id: string }}
  | { action: 'read', payload: { id: string }}

const request: (Params) => Promise<*>
= async (data) => {
  const options = {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    referrer: "no-referrer",
    body: JSON.stringify(data),
  }

  const res = await fetch(LAMBDA_PATH, options)
  const json = await res.json()
  return json
}

export const create: (string) => Promise<{ id: string }>
= (note) => request({ action: 'create', payload: { note }})

export const destroy: (string) => Promise<{ status: string }>
= (id) => request({ action: 'destroy', payload: { id }})

export const read: (string) => Promise<{ note: string }>
= (id) => request({ action: 'read', payload: { id }})
