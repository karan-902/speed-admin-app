import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import Chip from "../../components/common/Chip/Chip";
import CustomSkeleton from "../../components/common/Skeleton/Skeleton";
import RenderWithFallBack from "../../components/common/RenderWithFallBack";
import {
    ORDER_STATUS_TONE,
    PAYMENT_STATUS_TONE,
    DELIVERY_STATUS_TONE,
    toTitleCase,
} from "../../components/columns";
import { buttonIcons } from "../../components/images";
import type { TOrderDetail } from "../../utils/utils";
import formateTime from "../../utils/formateTime";
import formatPrice from "../../utils/formatePrice";
import DetailPage from "../../components/common/DetailPage";
import { useDetailFetch } from "../../hooks/useDetailFetch";
import CreateDeliveryForm from "./CreateDeliveryForm";

type FieldRow = { label: string; value: React.ReactNode };

const tv = (v: string | null | undefined): React.ReactNode =>
    v ? <Text customClass="font14">{v}</Text> : null;

function buildFields(order: TOrderDetail): FieldRow[] {
    return ([
        order.user && {
            label: "Customer",
            value: tv(`${order.user.first_name} ${order.user.last_name}`.trim()),
        },
        order.user && { label: "Email", value: tv(order.user.email) },
        { label: "Total", value: tv(formatPrice(order.total_amount)) },
        {
            label: "Payment",
            value: (
                <Chip
                    customClass={
                        PAYMENT_STATUS_TONE[order.payment_status] ??
                        "chip-neutral"
                    }
                    label={toTitleCase(order.payment_status)}
                />
            ),
        },
        order.payment_method && {
            label: "Payment Method",
            value: tv(order.payment_method),
        },
        { label: "Created On", value: tv(formateTime(order.created_at)) },
    ].filter(Boolean) as FieldRow[]);
}

function buildDeliveryFields(
    d: NonNullable<TOrderDetail["delivery_details"]>,
): FieldRow[] {
    return ([
        {
            label: "Status",
            value: (
                <Chip
                    customClass={
                        DELIVERY_STATUS_TONE[d.status] ?? "chip-neutral"
                    }
                    label={d.status.replace(/_/g, " ")}
                />
            ),
        },
        d.carrier && { label: "Carrier", value: tv(d.carrier) },
        d.tracking_number && {
            label: "Tracking No.",
            value: tv(d.tracking_number),
        },
        d.estimated_at && {
            label: "Est. Delivery",
            value: tv(formateTime(d.estimated_at)),
        },
    ].filter(Boolean) as FieldRow[]);
}

function FieldGrid({ fields }: { fields: FieldRow[] }) {
    return (
        <Box customClass="detail-fields-grid">
            {fields.map((f) => (
                <>
                    <Text key={`${f.label}-l`} customClass="font13 grey-text">
                        {f.label}
                    </Text>
                    <Box key={`${f.label}-v`}>{f.value}</Box>
                </>
            ))}
        </Box>
    );
}

function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<TOrderDetail | null>(null);
    const [isCreateDeliveryOpen, setIsCreateDeliveryOpen] = useState(false);

    const { loading } = useDetailFetch<TOrderDetail>({
        id,
        path: `/orders/${id}`,
        onClear: () => setOrder(null),
        onSuccess: (data) => setOrder(data),
    });

    return (
        <>
            <DetailPage
                loading={loading}
                breadcrumb={{ label: "Orders", onBack: () => navigate(-1) }}
                title={id}
                chip={
                    order && (
                        <Chip
                            customClass={
                                ORDER_STATUS_TONE[order.status] ?? "chip-neutral"
                            }
                            label={toTitleCase(order.status)}
                        />
                    )
                }
            >
                <Box customClass="details-content details-content-col">
                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton variant="rectangular" height={140} />
                        }
                    >
                        {order && (
                            <Box customClass="detail-section-block">
                                <Text customClass="font16 font-SemiBold">
                                    Order Info
                                </Text>
                                <FieldGrid fields={buildFields(order)} />
                            </Box>
                        )}
                    </RenderWithFallBack>

                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton variant="rectangular" height={120} />
                        }
                    >
                        {order && order.items.length > 0 && (
                            <Box customClass="detail-section-block">
                                <Text customClass="font16 font-SemiBold">
                                    Items
                                </Text>
                                <Box customClass="tracking-events-list">
                                    {order.items.map((item) => (
                                        <Box
                                            key={item.id}
                                            customClass="tracking-event-row"
                                        >
                                            <Box customClass="tracking-event-body">
                                                <Text customClass="font14 font-Medium">
                                                    {item.product_name}
                                                </Text>
                                                <Text customClass="font12 grey-text">
                                                    Qty: {item.quantity} ·{" "}
                                                    {formatPrice(item.price)}
                                                </Text>
                                            </Box>
                                            <Text customClass="font14 font-SemiBold">
                                                {formatPrice(
                                                    item.price * item.quantity,
                                                )}
                                            </Text>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </RenderWithFallBack>

                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton variant="rectangular" height={100} />
                        }
                    >
                        {order && (
                            <Box customClass="detail-section-block">
                                <Box customClass="flex justify-between items-center">
                                    <Text customClass="font16 font-SemiBold">
                                        Delivery
                                    </Text>
                                    {order.delivery_details ? (
                                        <Box
                                            customClass="flex items-center header-menu-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/deliveries/${order.delivery_details!.id}`,
                                                )
                                            }
                                        >
                                            {buttonIcons.next}
                                        </Box>
                                    ) : (
                                        <Box
                                            customClass="flex items-center header-menu-btn"
                                            onClick={() =>
                                                setIsCreateDeliveryOpen(true)
                                            }
                                        >
                                            {buttonIcons.add}
                                        </Box>
                                    )}
                                </Box>
                                {order.delivery_details ? (
                                    <FieldGrid
                                        fields={buildDeliveryFields(
                                            order.delivery_details,
                                        )}
                                    />
                                ) : (
                                    <Text customClass="font13 grey-text">
                                        No delivery created for this order yet.
                                    </Text>
                                )}
                            </Box>
                        )}
                    </RenderWithFallBack>
                </Box>
            </DetailPage>

            <CreateDeliveryForm
                open={isCreateDeliveryOpen}
                onClose={() => setIsCreateDeliveryOpen(false)}
                orderId={id}
            />
        </>
    );
}

export default OrderDetails;
