import {useState, useEffect, useCallback, useRef} from "react";
import {AxiosError} from "axios";

interface UseFetchReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  refetch: () => Promise<void>;
}

const useFetch = <T>(
  service: (signal?: AbortSignal) => Promise<T>,
  prevent?: boolean,
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const result = await service(abortController.signal);
      setData(result);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.code !== "ERR_CANCELED") {
        setError(axiosError);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [service]);

  useEffect(() => {
    if (prevent) return;

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, prevent]);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetch;
