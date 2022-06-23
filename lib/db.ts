import { validate, v4 } from "uuid";
import Redis from "ioredis";

const _10kb = 10000;
const _1week = 604800;

const redis = new Redis(process.env.REDIS_URL as string);

export type Id = string & { [$Id]: true };
declare const $Id: unique symbol;

export const newId = (value: string = ""): Id => {
  return validate(value) ? (value as Id) : (v4() as Id);
};

// Creates an entry in the database for the given id/value pair.
// The entry is created with a TTL of 1 week and is only written if it does not already exist.
export const create = (id: Id, value: string): Promise<"OK" | null> => {
  if (Buffer.byteLength(value, "utf8") > _10kb) {
    throw new Error("Exceeds 10kb limit");
  }

  return redis.set(id, value, "EX", _1week, "NX");
};

// Destroys an entry in the database for the given key if it exists.
export const destroy = (id: Id): Promise<number> => {
  return redis.del(id);
};

// Reads an entry in the database for the given key if it exists - sort of ignore the errors that might come up.
export const read = async (id: Id): Promise<string | null> => {
  const results = await redis.multi().get(id).del(id).exec();
  if (!results) return null;
  const [[_err1, value], _2] = results;
  if (!value) return null;
  return value as string;
};
