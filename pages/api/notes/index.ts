import type { NextApiRequest, NextApiResponse } from "next";
import { create, newId } from "../../../lib/db";

type Success = {
  status: "success";
  id: string;
};

type Failure = {
  status: "failure";
  message: string;
};

export type CreateResponse = Success | Failure;

const success = (id: string): Success => ({ id, status: "success" });
const failure = (message: string): Failure => ({
  message,
  status: "failure",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateResponse>
) {
  if (req.method !== "POST") {
    res.status(405).json(failure("Method not allowed"));
    return;
  }

  if (!req.body.cipher) {
    res.status(400).json(failure("Bad request"));
    return;
  }

  try {
    const id = newId();
    await create(id, req.body.cipher);

    res.status(200).json(success(id));
  } catch (err) {
    console.error(err);
    res.status(500).json(failure("Internal server error"));
  }
}
