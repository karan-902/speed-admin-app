import { useEffect, useRef, useState } from "react";
import { callAPIInterface } from "../utils";

interface UseDetailFetchOptions<T> {
    id: string | undefined;
    path: string;
    onClear: () => void;
    onSuccess: (data: T) => void;
}

export function useDetailFetch<T>({
    id,
    path,
    onClear,
    onSuccess,
}: UseDetailFetchOptions<T>) {
    const [loading, setLoading] = useState(true);
    const isFetching = useRef(false);
    const onClearRef = useRef(onClear);
    onClearRef.current = onClear;
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;

    useEffect(() => {
        if (!id || isFetching.current) return;
        isFetching.current = true;
        onClearRef.current();
        setLoading(true);
        callAPIInterface<void, T>("GET", path)
            .then((data) => onSuccessRef.current(data))
            .catch(console.error)
            .finally(() => {
                setLoading(false);
                isFetching.current = false;
            });
    }, [id, path]);

    return { loading };
}
