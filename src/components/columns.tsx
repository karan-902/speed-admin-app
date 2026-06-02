import type {
    Field,
    TCategoryColumns,
    TCategorySections,
    TOrderColumns,
    TProductColumns,
    TProductSections,
    TUserColumns,
} from "../utils/components";
import formateTime from "../utils/formateTime";
import Box from "./common/Box/Box";
import Chip from "./common/Chip/Chip";
import Copy from "./common/Copy/Copy";
import Text from "./common/Text/Text";
import Input from "./common/Input/Input";
import formatPrice from "../utils/formatePrice";

export const productAllDetailColumns: TProductSections[] = [
    {
        details: {
            title: "Details",
            fields: [
                {
                    label: "Status",
                    key: "visiblity",
                    render: (row) => (row.visiblity ? "Available" : "Archived"),
                },
                {
                    label: "Date Created",
                    key: "created_at",
                    render: (row) => formateTime(row.created_at),
                },
                {
                    label: "Date Updated",
                    key: "updated_at",
                    render: (row) => formateTime(row.updated_at),
                },
                {
                    label: "Category Name",
                    key: "category_name",
                    render: (row) =>
                        row.category_name ? row.category_name : "Not found",
                },
            ],
        },
        thumbnail: {
            title: "Thumbnail",
            fields: [
                {
                    label: "Thumbnail",
                    key: "public_id",
                    render: (data) =>
                        data.url ? (
                            <img
                                src={data.url}
                                alt={`product_${data.public_id}`}
                                style={{ width: "150px", height: "150px" }}
                            />
                        ) : (
                            <>No Thumbnail found</>
                        ),
                },
            ],
        },

        images: {
            title: "Images",
            fields: [
                {
                    label: "Images",
                    render: (data) => (
                        <Box
                            width={600}
                            display={"flex"}
                            gap={"10px"}
                            flexDirection={"row"}
                        >
                            {data.map((img, index: number) => (
                                <img
                                    key={index}
                                    src={img.url}
                                    alt={`product_${img.public_id}`}
                                    style={{
                                        width: "250px",
                                        height: "250px",
                                    }}
                                />
                            ))}
                        </Box>
                    ),
                },
            ],
        },
    },
];
export const categoryAllSatsColumns: TCategorySections[] = [
    {
        summery: {
            title: "Summery",
            fields: [
                {
                    key: "total_products",
                    label: "Total Products",
                    render: (row: { total_products: number }) =>
                        row.total_products && row.total_products,
                },
                {
                    key: "total_stock",
                    label: "Total Stock",
                    render: (row: { total_stock: number }) =>
                        row.total_stock && row.total_stock,
                },
                {
                    key: "average_price",
                    label: "Average Price",
                    render: (row: { average_price: number }) =>
                        formatPrice(row.average_price),
                },
                {
                    key: "active_products",
                    label: "Active Products",
                    render: (row: { active_products: number }) =>
                        row.active_products && row.active_products,
                },
                {
                    key: "spotlighted_products",
                    label: "Spotlighted Products",
                    render: (row: { spotlighted_products: number }) =>
                        row.spotlighted_products && row.spotlighted_products,
                },
            ],
        },
    },
];

export const categoryColumns: Field<TCategoryColumns>[] = [
    {
        key: "id",
        label: "Category ID",
        render: (row) => (
            <Box customClass="id-cell" onClick={(e) => e.stopPropagation()}>
                <Input
                    elementClass="category-input-element"
                    customClass="table-input"
                    value={row.id}
                    readOnly
                />
                <Copy value={row.id} />
            </Box>
        ),
    },
    {
        key: "name",
        label: "Category Name",
        render: (row) => <Text>{row.name}</Text>,
    },
    {
        key: "visibility",
        label: "Status",
        render: (row) => (
            <Chip
                customClass={row.visibility ? "available-chip" : "archived-chip"}
                label={row.visibility ? "Available" : "Archived"}
            />
        ),
    },
    {
        key: "created_at",
        label: "Created On",
        render: (row) => formateTime(row.created_at),
    },
    {
        key: "updated_at",
        label: "Updated On",
        render: (row) => formateTime(row.updated_at),
    },
];

export const orderColumns: Field<TOrderColumns>[] = [
    {
        key: "id",
        label: "Order ID",
        render: (row) => (
            <Box customClass="id-cell" onClick={(e) => e.stopPropagation()}>
                <Input
                    elementClass="category-input-element"
                    customClass="table-input"
                    value={row.id}
                    readOnly
                />
                <Copy value={row.id} />
            </Box>
        ),
    },
    {
        label: "Customer",
        render: (row) => (
            <Text>{`${row.user.first_name} ${row.user.last_name}`}</Text>
        ),
    },
    {
        key: "total_amount",
        label: "Total",
        render: (row) => formatPrice(row.total_amount),
    },
    {
        key: "status",
        label: "Order Status",
        render: (row) => <Text>{row.status}</Text>,
    },
    {
        key: "payment_status",
        label: "Payment",
        render: (row) => <Text>{row.payment_status}</Text>,
    },
    {
        key: "created_at",
        label: "Created On",
        render: (row) => formateTime(row.created_at),
    },
];

export const userColumns: Field<TUserColumns>[] = [
    {
        key: "id",
        label: "User ID",
        render: (row) => (
            <Box customClass="id-cell" onClick={(e) => e.stopPropagation()}>
                <Input
                    elementClass="category-input-element"
                    customClass="table-input"
                    value={row.id}
                    readOnly
                />
                <Copy value={row.id} />
            </Box>
        ),
    },
    {
        key: "email",
        label: "Email",
        render: (row) => <Text>{row.email}</Text>,
    },
    {
        label: "Name",
        render: (row) => <Text>{`${row.first_name} ${row.last_name}`}</Text>,
    },
    {
        key: "role",
        label: "Role",
        render: (row) => <Text>{row.role}</Text>,
    },
    {
        key: "is_active",
        label: "Status",
        render: (row) => (row.is_active ? "Active" : "Inactive"),
    },
    {
        key: "created_at",
        label: "Joined",
        render: (row) => formateTime(row.created_at),
    },
];

export const productColumns: Field<TProductColumns>[] = [
    {
        key: "id",
        label: "Product ID",
        render: (row) => (
            <Box customClass="id-cell" onClick={(e) => e.stopPropagation()}>
                <Input
                    elementClass="category-input-element"
                    customClass="table-input"
                    value={row.id}
                    readOnly
                />
                <Copy value={row.id} />
            </Box>
        ),
    },
    {
        key: "name",
        label: "Product Name",
        render: (row) => <Text>{row.name}</Text>,
    },
    {
        key: "price",
        label: "Price",
        render: (row) => formatPrice(row.price),
    },
    {
        key: "visibility",
        label: "Status",
        render: (row) => (
            <Chip
                customClass={row.visibility ? "available-chip" : "archived-chip"}
                label={row.visibility ? "Available" : "Archived"}
            />
        ),
    },
    {
        key: "created_at",
        label: "Created On",
        render: (row) => formateTime(row.created_at),
    },
    {
        key: "updated_at",
        label: "Updated On",
        render: (row) => formateTime(row.updated_at),
    },
];
