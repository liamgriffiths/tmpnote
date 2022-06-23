import type { NextApiRequest, NextApiResponse } from "next";
import { newId, destroy } from "../../../lib/db";

type Success = {
  status: "success";
};

type Failure = {
  status: "failure";
  message: string;
};

export type DestroyResponse = Success | Failure;

const success: Success = { status: "success" };
const failure = (message: string): Failure => ({ status: "failure", message });

const getId = (query: unknown) => {
  const { id } = query as { id?: string | null };
  if (!id) return null;
  return newId(id);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DestroyResponse>
) {
  if (req.method !== "DELETE") {
    res.status(405).json(failure("Method not allowed"));
    return;
  }

  const id = getId(req.query);

  if (!id) {
    res.status(400).json(failure("Bad request"));
    return;
  }

  try {
    await destroy(id);
    res.status(200).json(success);
  } catch (err) {
    console.error(err);
    res.status(500).json(failure("Internal Server Error"));
  }
}
