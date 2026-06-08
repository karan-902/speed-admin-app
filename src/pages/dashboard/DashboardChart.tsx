import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    type ChartOptions,
    type ScriptableContext,
} from "chart.js";
import formatPrice from "../../utils/formatePrice";
import type { RevenuePoint } from "../../types";
import formateTime from "../../utils/formateTime";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
);

const PRIMARY = "#2a67ff";
const GREY = "#848b9e";
const GRID = "#f2f5f7";
const DARK = "#0a193e";

interface RevenueChartProps {
    points: RevenuePoint[];
}

function RevenueChart({ points }: RevenueChartProps) {
    const data = useMemo(
        () => ({
            labels: points.map((p) => formateTime(Number(p.date))),
            datasets: [
                {
                    data: points.map((p) => p.revenue),
                    borderColor: PRIMARY,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: PRIMARY,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    backgroundColor: (ctx: ScriptableContext<"line">) => {
                        const { chart } = ctx;
                        const { ctx: canvas, chartArea } = chart;
                        if (!chartArea) return "transparent";
                        const gradient = canvas.createLinearGradient(
                            0,
                            chartArea.top,
                            0,
                            chartArea.bottom,
                        );
                        gradient.addColorStop(0, "rgba(42,103,255,0.25)");
                        gradient.addColorStop(1, "rgba(42,103,255,0)");
                        return gradient;
                    },
                },
            ],
        }),
        [points],
    );

    const options: ChartOptions<"line"> = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: DARK,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: (item) => {
                            const point = points[item.dataIndex];
                            return [
                                formatPrice(item.parsed.y ?? 0),
                                `${point?.orders ?? 0} orders`,
                            ];
                        },
                    },
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: {
                        color: GREY,
                        font: { size: 11 },
                        autoSkip: true,
                        maxTicksLimit: 8,
                        maxRotation: 0,
                    },
                },
                y: {
                    grid: { color: GRID },
                    border: { display: false },
                    ticks: {
                        color: GREY,
                        font: { size: 11 },
                        callback: (v) => formatPrice(Number(v)),
                    },
                },
            },
        }),
        [points],
    );

    return <Line data={data} options={options} />;
}

export default RevenueChart;
