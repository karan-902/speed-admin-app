import { Package, ShoppingBag, Users } from "lucide-react";
import type { TDashboardStats } from "../../utils/utils";

export const dashboardConfig = (stats: TDashboardStats) => {
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
