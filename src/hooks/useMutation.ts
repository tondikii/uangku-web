import {useState, useCallback} from "react";
import {AxiosError} from "axios";

interface UseMutationReturn<T, P> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  mutate: (params: P) => Promise<T | undefined>;
  reset: () => void;
}

const useMutation = <T, P>(
  service: (params: P) => Promise<T>,
): UseMutationReturn<T, P> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const mutate = useCallback(
    async (params: P): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const result = await service(params);
        setData(result);
        return result;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError);
        throw axiosError;
      } finally {
        setLoading(false);
      }
    },
    [service],
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
};

export default useMutation;
