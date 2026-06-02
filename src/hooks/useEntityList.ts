import { useState } from "react";
import type { Ttabs } from "../utils/components";

export function useEntityList() {
    const [tabValue, setTabValue] = useState<Ttabs>("all");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onTabChange = (_: React.SyntheticEvent, value: Ttabs) =>
        setTabValue(value);
    const openCreate = () => setIsCreateOpen(true);
    const closeCreate = () => setIsCreateOpen(false);

    return {
        tabValue,
        isCreateOpen,
        loading,
        setLoading,
        onTabChange,
        openCreate,
        closeCreate,
    };
}
