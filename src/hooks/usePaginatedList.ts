import { useCallback, useRef } from "react";
import { callAPIInterface } from "../utils";
import type { Method } from "axios";

export type PaginatedResponse<T> = {
    has_more: boolean;
    data: T[];
    page_id: number | null;
};

type Config<T, P> = {
    method: Method;
    buildBody?: () => P;
    buildPath: (cursor: string) => string;
    onFirstLoad: (data: T[]) => void;
    onAppend: (data: T[]) => void;
    setLoading: (v: boolean) => void;
};

export function usePaginatedList<T extends { id: string }, P = undefined>({
    method,
    buildBody,
    buildPath,
    onFirstLoad,
    onAppend,
    setLoading,
}: Config<T, P>) {
    const hasMoreRef = useRef(true);
    const endingBeforeRef = useRef<number | null>(null);
    const buildBodyRef = useRef(buildBody);
    buildBodyRef.current = buildBody;
    const isFetchingRef = useRef(false);
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
            const res = await callAPIInterface<P, PaginatedResponse<T>>(
                method,
                buildPathRef.current(cursor),
                buildBodyRef.current?.(),
            );
            isFirstLoad
                ? onFirstLoadRef.current(res.data)
                : onAppendRef.current(res.data);
            hasMoreRef.current = res.has_more;
            endingBeforeRef.current = res.page_id;
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
