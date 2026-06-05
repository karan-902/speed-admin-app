import { useCallback, useEffect, useRef } from "react";
import EntityListPage from "../../components/common/EntityListPage";
import {
    categoriesActionButtonLabel,
    categoriesPageDescription,
    categoriesPageTitle,
} from "../../components/messages";
import EntityList from "../../components/common/EntityList";
import { categoryColumns } from "../../components/columns";
import { TableCell, TableRow } from "@mui/material";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { callAPIInterface } from "../../utils";
import { setCategories } from "../../redux/category/category.slice";
import type { TCategoriesResponse } from "../../utils/utils";
import { useEntityList } from "../../hooks/useEntityList";
import CategoryForm from "./CategoryForm";

const categoriesHeader = () => {
    return (
        <TableRow>
            {categoryColumns.map((category) => (
                <TableCell
                    key={category.key}
                    component="th"
                    style={
                        category.width ? { width: category.width } : undefined
                    }
                >
                    {category.label}
                </TableCell>
            ))}
        </TableRow>
    );
};
function Categories() {
    const categories = useReduxSelector((state) => state.category.categories);
    const isFetching = useRef<boolean>(false);
    const dispatch = useReduxDispatch();
    const { tabValue, onTabChange, loading, setLoading, isCreateOpen, openCreate, closeCreate } = useEntityList();
    const getCategories = useCallback(async () => {
        if (isFetching.current) return;
        isFetching.current = true;
        setLoading(true);
        try {
            let path: undefined | string = "";
            if (tabValue !== "all") {
                path = `/categories?status=${tabValue}`;
            } else {
                path = `/categories`;
            }
            const response = await callAPIInterface<void, TCategoriesResponse>(
                "GET",
                path,
            );
            dispatch(setCategories(response.data));
        } catch (error) {
            dispatch(setCategories([]));
        } finally {
            isFetching.current = false;
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        dispatch(setCategories([]));
        isFetching.current = false;
        getCategories();
    }, [tabValue]);
    return (
        <>
            <EntityListPage
                entity={categoriesPageTitle}
                onSubmit={openCreate}
                description={categoriesPageDescription}
                buttonLabel={categoriesActionButtonLabel}
            >
                <EntityList
                    loading={loading}
                    tabValue={tabValue}
                    onChange={onTabChange}
                    columns={categoryColumns}
                    header={categoriesHeader}
                    list={categories}
                />
            </EntityListPage>

            <CategoryForm open={isCreateOpen} onClose={closeCreate} />
        </>
    );
}

export default Categories;
