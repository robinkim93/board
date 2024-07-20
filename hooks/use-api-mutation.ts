import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutationFunction: any) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const apiMutation = useMutation(mutationFunction);

  const mutation = (payload: any) => {
    setIsPending(true);

    return apiMutation(payload)
      .then((result) => result)
      .catch((error) => {
        throw error;
      })
      .finally(() => setIsPending(false));
  };

  return {
    mutation,
    isPending,
  };
};
