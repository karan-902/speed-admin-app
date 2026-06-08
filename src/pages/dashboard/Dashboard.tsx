import {
    dashboardTitle,
    loadingDashboardText,
    revenue,
    totalRevenue,
} from "../../components/messages";
import { useEffect, useState } from "react";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import Card from "../../components/common/Card/Card";
import RevenueChart from "./DashboardChart";
import ComponentLoader from "../../components/common/Loader/ComponentLoader";
import { callAPIInterface } from "../../utils";
import formatPrice from "../../utils/formatePrice";
import { DashboardIcon, dashBoardRevenuEarth } from "../../components/images";
import type { RevenueResponse } from "../../types";
import type { TDashboardStats } from "../../utils/utils";
import { Delta } from "../../components/constants";
import { dashboardStats, reveneueRangeTabs } from "../../components/config";

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [range, setRange] = useState<string>("7d");
    const [chart, setChart] = useState<RevenueResponse | null>(null);
    const [stats, setStats] = useState<TDashboardStats | null>(null);
    useEffect(() => {
        let ignore = false;
        callAPIInterface<void, RevenueResponse>(
            "GET",
            `/dashboard/revenue?range=${range}`,
        )
            .then((res) => {
                if (!ignore) setChart(res);
            })
            .catch((error) => {
                if (!ignore) {
                    console.error(error);
                    null;
                }
            });
        return () => {
            ignore = true;
        };
    }, [range]);
    useEffect(() => {
        setIsLoading(true);
        callAPIInterface<void, TDashboardStats>("GET", "/dashboard/stats")
            .then(setStats)
            .catch((err) => {
                console.error(err);
                setStats(null);
            })
            .finally(() => setIsLoading(false));
    }, []);
    const renderDashboard = () => {
        if (isLoading)
            return (
                <ComponentLoader
                    customClass="flex flex-col items-center justify-center dashboard-loader"
                    text={loadingDashboardText}
                />
            );
        return (
            <>
                <Box customClass="dashboard-title flex items-center">
                    <Text component={"span"} customClass="dashboard-icon">
                        <DashboardIcon />
                    </Text>
                    <Text size={20} font="semiBold">
                        {dashboardTitle}
                    </Text>
                </Box>
                <Box customClass="dashboard-stats">
                    <Card customClass="stat-hero">
                        <img
                            src={dashBoardRevenuEarth}
                            alt="revenue"
                            className="stat-hero-earth"
                        />
                        <Text customClass="stat-hero-label">
                            {totalRevenue}
                        </Text>
                        <Box customClass="flex items-center" gap={1}>
                            <Text customClass="stat-hero-value">
                                {formatPrice(Number(stats?.total_revenue))}
                            </Text>
                            <Delta pct={Number(stats?.revenue_change_pct)} />
                        </Box>
                    </Card>

                    <Card customClass="stat-group">
                        {stats &&
                            dashboardStats(stats).map((card) => (
                                <Box key={card.label} customClass="stat-item">
                                    <Box customClass={`stat-icon ${card.tone}`}>
                                        {card.icon}
                                    </Box>
                                    <Text customClass="stat-label">
                                        {card.label}
                                    </Text>
                                    <Box
                                        customClass="flex items-center"
                                        gap={1}
                                    >
                                        <Text customClass="stat-value">
                                            {card.value}
                                        </Text>
                                        {card.changePct !== undefined && (
                                            <Delta pct={card.changePct} />
                                        )}
                                    </Box>
                                </Box>
                            ))}
                    </Card>
                </Box>

                <Box customClass="dashboard-card">
                    <Box customClass="dashboard-card-head">
                        <Text size={16} font="semiBold">
                            {revenue}
                        </Text>

                        <Box customClass="range-toggle">
                            {reveneueRangeTabs.map((r) => (
                                <button
                                    key={r.value}
                                    className={`range-btn${range === r.value ? " active" : ""}`}
                                    onClick={() => setRange(r.value)}
                                >
                                    {r.label}
                                </button>
                            ))}
                        </Box>
                    </Box>

                    <Box customClass="dashboard-chart">
                        {chart && <RevenueChart points={chart.points} />}
                    </Box>
                </Box>
            </>
        );
    };
    return (
        <Box customClass="section-wrapper dashboard-wrapper">
            {renderDashboard()}
        </Box>
    );
}

export default Dashboard;
