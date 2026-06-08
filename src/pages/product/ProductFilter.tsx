import { useEffect, useState } from "react";
import { useReduxSelector } from "../../redux/hooks";
import FilterDrawer from "../../components/common/FilterDrawer";
import Input from "../../components/common/Input/Input";
import SelectData from "../../components/common/Select/Select";
import MenuItem from "../../components/common/MenuItem/MenuItem";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import { SORT_SELECTS } from "../../components/config";

export type SortOrder = "asc" | "desc";

export type ProductFilters = {
    categoryIds?: string[];
    minPrice?: string;
    maxPrice?: string;
    minStock?: string;
    maxStock?: string;
};

export const INITIAL_FILTERS: ProductFilters = {
    categoryIds: [],
    minPrice: "",
    maxPrice: "",
    maxStock: "",
    minStock: "",
};

const FILTER_FIELDS: {
    name: "minPrice" | "maxPrice" | "minStock" | "maxStock";
    label: string;
    placeholder: string;
}[] = [
    { name: "minPrice", label: "Min Price", placeholder: "Enter min price" },
    { name: "maxPrice", label: "Max Price", placeholder: "Enter max price" },
    { name: "minStock", label: "Min Stock", placeholder: "Enter min stock" },
    { name: "maxStock", label: "Max Stock", placeholder: "Enter max stock" },
];

interface ProductFilterProps {
    open: boolean;
    onClose: () => void;
    onApply: (filters: ProductFilters) => void;
}

function ProductFilter({ open, onClose, onApply }: ProductFilterProps) {
    const categories = useReduxSelector((state) => state.category.categories);
    const { categoryIds, maxPrice, maxStock, minPrice, minStock } =
        useReduxSelector((state) => state.common.filters);
    const hasCategories = categories.length > 0;

    const [draft, setDraft] = useState<ProductFilters>({
        categoryIds: categoryIds,
        maxPrice: maxPrice ? String(maxPrice) : "",
        maxStock: maxStock ? String(maxStock) : "",
        minPrice: minPrice ? String(minPrice) : "",
        minStock: minStock ? String(minStock) : "",
    });
    useEffect(() => {
        if (open) {
            setDraft({});
        }
    }, [open]);

    const setNumber = (name: keyof ProductFilters, value: string) =>
        setDraft((prev) => ({ ...prev, [name]: value.replace(/[^0-9]/g, "") }));

    return (
        <FilterDrawer
            open={open}
            onClose={onClose}
            onClear={() => setDraft(INITIAL_FILTERS)}
            onApply={() => {
                console.log(draft, "DRAFT");
                onApply(draft);
            }}
        >
            <SelectData
                multiple
                name="category"
                customClass="filter-select"
                placeholder="Select Category"
                value={draft.categoryIds}
                disabled={!hasCategories}
                onChange={(e) =>
                    setDraft((prev) => ({
                        ...prev,
                        categoryIds: e.target.value as string[],
                    }))
                }
            >
                {categories.map((category) => (
                    <MenuItem
                        key={category.id}
                        customClass="select-item"
                        value={category.id}
                    >
                        {category.name}
                    </MenuItem>
                ))}
            </SelectData>

            {FILTER_FIELDS.map((field) => (
                <Input
                    key={field.name}
                    showLabel
                    type="text"
                    name={field.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    value={draft[field.name]}
                    onChange={(e) => setNumber(field.name, e.target.value)}
                />
            ))}
        </FilterDrawer>
    );
}

export default ProductFilter;
