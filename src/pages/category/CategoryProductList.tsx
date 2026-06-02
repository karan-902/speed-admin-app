import { forwardRef } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import { CircularProgress } from "@mui/material";
import type { TCategoryProduct } from "../../utils/utils";
import ListCard from "../product/ListCard";
import Text from "../../components/common/Text/Text";
import { list } from "../../components/messages";

const GRID_HEIGHT = 600;

const GridList = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ style, children, ...props }, ref) => (
    <div
        ref={ref}
        style={{ display: "flex", flexWrap: "wrap", ...style }}
        {...props}
    >
        {children}
    </div>
));

const GridItem = ({
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        {...props}
        style={{ width: "50%", padding: "8px", boxSizing: "border-box" }}
    >
        {children}
    </div>
);

interface CategoryProductListProps {
    data: TCategoryProduct[];
    hasMore?: boolean;
    loadingMore?: boolean;
    onLoadMore?: () => void;
}

function CategoryProductList({
    data,
    hasMore,
    loadingMore,
    onLoadMore,
}: CategoryProductListProps) {
    if (data && data.length === 0) return null;

    return (
        <>
            <Text paddingBlock={2} customClass="font-SemiBold font20">
                {list}
            </Text>
            <VirtuosoGrid
                style={{ height: GRID_HEIGHT }}
                totalCount={data.length}
                itemContent={(index) => <ListCard product={data[index]} />}
                components={{
                    List: GridList,
                    Item: GridItem,
                    Footer: () =>
                        loadingMore ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "16px",
                                }}
                            >
                                <CircularProgress size={24} />
                            </div>
                        ) : null,
                }}
                endReached={() => {
                    if (hasMore && !loadingMore) onLoadMore?.();
                }}
            />
        </>
    );
}

export default CategoryProductList;
