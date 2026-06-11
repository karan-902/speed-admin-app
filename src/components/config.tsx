import { Package, ShoppingBag, Users } from "lucide-react";
import type { TDashboardStats } from "../utils/utils";
import type { CommonTab, TStats } from "../utils/components";

export const dashboardStats = (stats: TDashboardStats): TStats[] => {
    return [
        {
            label: "Total Orders",
            value: stats.total_orders,
            changePct: stats.orders_change_pct,
            icon: <ShoppingBag size={20} />,
            tone: "stat-icon-blue",
        },
        {
            label: "Total Products",
            value: stats.total_products,
            icon: <Package size={20} />,
            tone: "stat-icon-green",
        },
        {
            label: "Total Users",
            value: stats.total_users,
            icon: <Users size={20} />,
            tone: "stat-icon-violet",
        },
    ];
};

export const reveneueRangeTabs: CommonTab[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "2D", value: "2d" },
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "1Y", value: "1y" },
];
export const orderStatusTabs: CommonTab[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

export const deliveryStatusTabs: CommonTab[] = [
    { label: "All", value: "all" },
    { label: "Pickup Scheduled", value: "PICKUP_SCHEDULED" },
    { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Failed", value: "FAILED" },
    { label: "Returned", value: "RETURNED" },
];

export const DELIVERY_STATUS_OPTIONS = [
    { value: "PICKUP_SCHEDULED", label: "Pickup Scheduled" },
    { value: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
    { value: "DELIVERED", label: "Delivered" },
    { value: "FAILED", label: "Failed" },
    { value: "RETURNED", label: "Returned" },
];

export const USER_ROLE_OPTIONS = [
    { value: "SUPER_ADMIN", label: "Super Admin" },
    { value: "ADMIN", label: "Admin" },
    { value: "USER", label: "User" },
    { value: "DELIVERY_PARTNER", label: "Delivery Partner" },
];

export const productMenu = (onArchive: () => void, onEdit: () => void) => {
    return [
        { label: "Archive", onClick: onArchive },
        { label: "Edit", onClick: onEdit },
    ];
};

export const SORT_SELECTS: {
    name: "sortField" | "sortOrder";
    label: string;
    placeholder: string;
    options: { value: string; label: string }[];
}[] = [
    {
        name: "sortField",
        label: "Field",
        placeholder: "Select Field",
        options: [
            { value: "", label: "Select Field" },
            { value: "price", label: "Price" },
            { value: "stock", label: "Stock" },
            { value: "name", label: "Name" },
            { value: "created_at", label: "Created On" },
        ],
    },
    {
        name: "sortOrder",
        label: "Order",
        placeholder: "Select Order",
        options: [
            { value: "desc", label: "Descending" },
            { value: "asc", label: "Ascending" },
        ],
    },
];
