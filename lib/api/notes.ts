import type { CreateResponse } from "../../pages/api/notes/index";
import type { DestroyResponse } from "../../pages/api/notes/[id]";

export const create = async (cipher: string): Promise<CreateResponse> => {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cipher,
    }),
  });

  return await res.json();
};

export const destroy = async (id: string): Promise<DestroyResponse> => {
  const res = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};
