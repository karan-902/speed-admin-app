import { useCallback, useRef } from "react";
import { callAPIInterface } from "../utils";

export type PaginatedResponse<T> = {
    has_more: boolean;
    data: T[];
    ending_before: number | null;
};

type Config<T> = {
    buildPath: (cursor: string) => string;
    onFirstLoad: (data: T[]) => void;
    onAppend: (data: T[]) => void;
    setLoading: (v: boolean) => void;
};

export function usePaginatedList<T extends { id: string }>({
    buildPath,
    onFirstLoad,
    onAppend,
    setLoading,
}: Config<T>) {
    const hasMoreRef = useRef(true);
    const endingBeforeRef = useRef<number | null>(null);
    const isFetchingRef = useRef(false);

    // Stable refs so `load` never becomes stale
    const buildPathRef = useRef(buildPath);
    buildPathRef.current = buildPath;
    const onFirstLoadRef = useRef(onFirstLoad);
    onFirstLoadRef.current = onFirstLoad;
    const onAppendRef = useRef(onAppend);
    onAppendRef.current = onAppend;
    const setLoadingRef = useRef(setLoading);
    setLoadingRef.current = setLoading;

    const load = useCallback(async (isFirstLoad = false) => {
        if (!hasMoreRef.current || isFetchingRef.current) return;
        isFetchingRef.current = true;
        setLoadingRef.current(true);
        const cursor = endingBeforeRef.current
            ? `&ending_before=${endingBeforeRef.current}`
            : "";
        try {
            const res = await callAPIInterface<void, PaginatedResponse<T>>(
                "GET",
                buildPathRef.current(cursor),
            );
            isFirstLoad
                ? onFirstLoadRef.current(res.data)
                : onAppendRef.current(res.data);
            hasMoreRef.current = res.has_more;
            endingBeforeRef.current = res.ending_before;
        } finally {
            isFetchingRef.current = false;
            setLoadingRef.current(false);
        }
    }, []);

    const reset = useCallback(() => {
        hasMoreRef.current = true;
        endingBeforeRef.current = null;
        isFetchingRef.current = false;
    }, []);

    return { load, reset, hasMoreRef };
}
