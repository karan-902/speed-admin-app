import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import Card from "../../components/common/Card/Card";
import RevenueChart from "./RevenueChart";
import ComponentLoader from "../../components/common/Loader/ComponentLoader";
import { callAPIInterface } from "../../utils";
import formatPrice from "../../utils/formatePrice";
import { loadingDashboardText } from "../../components/messages";
import { dashBoardRevenuEarth } from "../../components/images";
import type { RangeType, RevenueResponse } from "../../types";
import { DashboardIcon } from "../../components/constants";
import type { TDashboardStats } from "../../utils/utils";
import { dashboardConfig } from "./DashboardConfig";

const RANGES: { label: string; value: RangeType }[] = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "2D", value: "2d" },
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "1Y", value: "1y" },
];

function Delta({ pct }: { pct: number }) {
    const up = pct >= 0;
    return (
        <Box
            customClass={`stat-delta ${up ? "stat-delta-up" : "stat-delta-down"}`}
        >
            {up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {Math.abs(pct)}%
        </Box>
    );
}
function Dashboard() {
    const [range, setRange] = useState<RangeType>("7d");
    const [isLoading, setIsLoading] = useState(false);
    const [revenuChart, setRevenueChart] = useState<RevenueResponse | null>(
        null,
    );
    const [stats, setStats] = useState<TDashboardStats | null>(null);

    useEffect(() => {
        let ignore = false;
        callAPIInterface<void, RevenueResponse>(
            "GET",
            `/dashboard/revenue?range=${range}`,
        )
            .then((res) => {
                if (!ignore) setRevenueChart(res);
            })
            .catch((error) => {
                if (!ignore) {
                    console.error(error);
                    setRevenueChart(null);
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

    return (
        <Box customClass="section-wrapper dashboard-wrapper">
            {isLoading ? (
                <ComponentLoader
                    customClass="flex flex-col items-center justify-center dashboard-loader"
                    text={loadingDashboardText}
                />
            ) : (
                <>
                    <Box customClass="dashboard-title flex items-center">
                        <Text component={"span"} customClass="dashboard-icon">
                            {DashboardIcon()}
                        </Text>
                        <Text size={20} font="semiBold">
                            Dashboard
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
                                Total Revenue
                            </Text>
                            <Box customClass="flex items-center" gap={1}>
                                <Text customClass="stat-hero-value">
                                    {formatPrice(Number(stats?.total_revenue))}
                                </Text>
                                <Delta
                                    pct={Number(stats?.revenue_change_pct)}
                                />
                            </Box>
                        </Card>

                        <Card customClass="stat-group">
                            {stats &&
                                dashboardConfig(stats).map((card) => (
                                    <Box
                                        key={card.label}
                                        customClass="stat-item"
                                    >
                                        <Box
                                            customClass={`stat-icon ${card.tone}`}
                                        >
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
                                Revenue
                            </Text>

                            <Box customClass="range-toggle">
                                {RANGES.map((r) => (
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
                            {revenuChart && (
                                <RevenueChart points={revenuChart.points} />
                            )}
                        </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default Dashboard;
