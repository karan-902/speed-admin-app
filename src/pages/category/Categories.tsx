import { useEffect } from "react";
import EntityListPage from "../../components/common/EntityListPage";
import {
    categoriesActionButtonLabel,
    categoriesPageDescription,
    categoriesPageTitle,
} from "../../components/messages";
import EntityList from "../../components/common/EntityList";
import { categoryColumns } from "../../components/columns";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { setCategories } from "../../redux/category/category.slice";
import type { TCategory } from "../../utils/utils";
import { useEntityList } from "../../hooks/useEntityList";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import CategoryForm from "./CategoryForm";
import ColumnsTableHeader from "../../components/common/ColumnsTableHeader";

function Categories() {
    const categories = useReduxSelector((state) => state.category.categories);
    const dispatch = useReduxDispatch();
    const { loading, setLoading, isCreateOpen, openCreate, closeCreate } =
        useEntityList();

    const { load } = usePaginatedList<TCategory>({
        method: "GET",
        buildPath: () => "/categories",
        onFirstLoad: (data) => dispatch(setCategories(data)),
        onAppend: (data) => dispatch(setCategories(data)),
        setLoading,
    });

    useEffect(() => {
        load(true);
    }, []);

    return (
        <>
            <EntityListPage
                entity={categoriesPageTitle}
                onSubmit={openCreate}
                description={categoriesPageDescription}
                buttonLabel={categoriesActionButtonLabel}
            >
                <EntityList
                    showTabs={false}
                    loading={loading}
                    columns={categoryColumns}
                    header={() => (
                        <ColumnsTableHeader columns={categoryColumns} />
                    )}
                    list={categories}
                />
            </EntityListPage>
            <CategoryForm open={isCreateOpen} onClose={closeCreate} />
        </>
    );
}

export default Categories;
