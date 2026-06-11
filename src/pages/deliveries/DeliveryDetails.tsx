import React, { useState, type MouseEvent } from "react";
import Stepper from "../../components/common/Stepper/Stepper";
import { useParams } from "react-router-dom";
import {
    Package,
    User,
    Truck,
    Hash,
    Calendar,
    CalendarCheck,
    Clock,
    Pencil,
    MapPin,
    RefreshCw,
    X,
} from "lucide-react";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import Chip from "../../components/common/Chip/Chip";
import CustomSkeleton from "../../components/common/Skeleton/Skeleton";
import RenderWithFallBack from "../../components/common/RenderWithFallBack";
import Copy from "../../components/common/Copy/Copy";
import Input from "../../components/common/Input/Input";
import { DELIVERY_STATUS_TONE } from "../../components/columns";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import {
    setDeliveryDetail,
    clearDeliveryDetail,
} from "../../redux/delivery/delivery.slice";
import type { TDeliveryDetail } from "../../utils/utils";
import formateTime from "../../utils/formateTime";
import UpdateDeliveryForm from "../orders/UpdateDeliveryForm";
import AddTrackingEventForm from "../orders/AddTrackingEventForm";
import DetailPage from "../../components/common/DetailPage";
import { useDetailFetch } from "../../hooks/useDetailFetch";
import { callAPIInterface } from "../../utils";

function DeliveryDetails() {
    const { deliveryId } = useParams<{ deliveryId: string }>();
    const dispatch = useReduxDispatch();
    const detail = useReduxSelector((state) => state.delivery.detail);

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);

    const { loading } = useDetailFetch<TDeliveryDetail>({
        id: deliveryId,
        path: `/deliveries/${deliveryId}`,
        onClear: () => dispatch(clearDeliveryDetail()),
        onSuccess: (data) => dispatch(setDeliveryDetail(data)),
    });

    const isTerminal =
        detail?.status === "DELIVERED" || detail?.status === "RETURNED";
    const isTrackEvent =
        detail && detail.tracking_events && detail.tracking_events.length > 0;

    const handleMarkFailed = async () => {
        if (!detail || !window.confirm("Mark this delivery as failed?")) return;
        try {
            await callAPIInterface("PATCH", `/deliveries/${detail.id}`, {
                status: "FAILED",
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DetailPage
            loading={loading}
            breadcrumb={{ label: "Deliveries", to: "/deliveries" }}
            title={deliveryId}
            chip={
                detail && (
                    <Chip
                        customClass={
                            DELIVERY_STATUS_TONE[detail.status] ??
                            "chip-neutral"
                        }
                        label={detail.status.replace(/_/g, " ")}
                    />
                )
            }
        >
            <Box customClass="details-content details-content-col">
                <RenderWithFallBack
                    loading={loading}
                    skeleton={
                        <CustomSkeleton variant="rectangular" height={320} />
                    }
                >
                    {detail && (
                        <Box customClass="detail-section-block">
                            <Text customClass="font16 font-SemiBold">
                                Delivery
                            </Text>

                            <Box customClass="delivery-info-rows">
                                <Box customClass="delivery-info-row">
                                    <Box customClass="delivery-row-icon">
                                        <Package size={16} />
                                    </Box>
                                    <Text customClass="font14 grey-text delivery-row-label">
                                        Delivery ID
                                    </Text>
                                    <Box customClass="id-cell">
                                        <Input
                                            elementClass="category-input-element"
                                            customClass="table-input"
                                            value={detail.id}
                                            readOnly
                                        />
                                        <Copy value={detail.id} />
                                    </Box>
                                </Box>

                                {detail.assigned_to && (
                                    <Box customClass="delivery-info-row">
                                        <Box customClass="delivery-row-icon">
                                            <User size={16} />
                                        </Box>
                                        <Text customClass="font14 grey-text delivery-row-label">
                                            Assigned to
                                        </Text>
                                        <Box customClass="delivery-row-value-group">
                                            <Text customClass="font14">
                                                {detail.assigned_to}
                                            </Text>
                                            {!isTerminal && (
                                                <button
                                                    className="field-edit-btn"
                                                    onClick={() =>
                                                        setIsUpdateOpen(true)
                                                    }
                                                >
                                                    <Pencil size={13} />
                                                    Reassign
                                                </button>
                                            )}
                                        </Box>
                                    </Box>
                                )}

                                {detail.carrier && (
                                    <Box customClass="delivery-info-row">
                                        <Box customClass="delivery-row-icon">
                                            <Truck size={16} />
                                        </Box>
                                        <Text customClass="font14 grey-text delivery-row-label">
                                            Carrier
                                        </Text>
                                        <Box customClass="delivery-row-value-group">
                                            <Text customClass="font14">
                                                {detail.carrier}
                                            </Text>
                                            {!isTerminal && (
                                                <button
                                                    className="field-edit-btn"
                                                    onClick={() =>
                                                        setIsUpdateOpen(true)
                                                    }
                                                >
                                                    <Pencil size={13} />
                                                    Edit
                                                </button>
                                            )}
                                        </Box>
                                    </Box>
                                )}

                                {detail.tracking_number && (
                                    <Box customClass="delivery-info-row">
                                        <Box customClass="delivery-row-icon">
                                            <Hash size={16} />
                                        </Box>
                                        <Text customClass="font14 grey-text delivery-row-label">
                                            Tracking number
                                        </Text>
                                        <Box customClass="delivery-row-value-group">
                                            <Text customClass="font14">
                                                {detail.tracking_number}
                                            </Text>
                                            {!isTerminal && (
                                                <button
                                                    className="field-edit-btn"
                                                    onClick={() =>
                                                        setIsUpdateOpen(true)
                                                    }
                                                >
                                                    <Pencil size={13} />
                                                    Edit
                                                </button>
                                            )}
                                        </Box>
                                    </Box>
                                )}

                                {detail.estimated_at && (
                                    <Box customClass="delivery-info-row">
                                        <Box customClass="delivery-row-icon">
                                            <Calendar size={16} />
                                        </Box>
                                        <Text customClass="font14 grey-text delivery-row-label">
                                            Estimated delivery
                                        </Text>
                                        <Box customClass="delivery-row-value-group">
                                            <Text customClass="font14">
                                                {formateTime(
                                                    detail.estimated_at,
                                                )}
                                            </Text>
                                            {!isTerminal && (
                                                <button
                                                    className="field-edit-btn"
                                                    onClick={() =>
                                                        setIsUpdateOpen(true)
                                                    }
                                                >
                                                    <Pencil size={13} />
                                                    Edit
                                                </button>
                                            )}
                                        </Box>
                                    </Box>
                                )}

                                <Box customClass="delivery-info-row">
                                    <Box customClass="delivery-row-icon">
                                        <CalendarCheck size={16} />
                                    </Box>
                                    <Text customClass="font14 grey-text delivery-row-label">
                                        Delivered at
                                    </Text>
                                    <Text customClass="font14">
                                        {detail.delivered_at
                                            ? formateTime(detail.delivered_at)
                                            : "—"}
                                    </Text>
                                </Box>

                                <Box customClass="delivery-info-row">
                                    <Box customClass="delivery-row-icon">
                                        <Clock size={16} />
                                    </Box>
                                    <Text customClass="font14 grey-text delivery-row-label">
                                        Created
                                    </Text>
                                    <Text customClass="font14">
                                        {formateTime(detail.created_at)}
                                    </Text>
                                </Box>
                            </Box>

                            {!isTerminal && (
                                <Box customClass="delivery-action-footer">
                                    <button
                                        className="delivery-action-btn"
                                        onClick={() => setIsEventOpen(true)}
                                    >
                                        <MapPin size={16} />
                                        Add tracking event
                                    </button>
                                    <button
                                        className="delivery-action-btn"
                                        onClick={() => setIsUpdateOpen(true)}
                                    >
                                        <RefreshCw size={16} />
                                        Update status
                                    </button>
                                    <button
                                        className="delivery-action-btn danger"
                                        onClick={handleMarkFailed}
                                    >
                                        <X size={16} />
                                        Mark failed
                                    </button>
                                </Box>
                            )}
                        </Box>
                    )}
                </RenderWithFallBack>

                <RenderWithFallBack
                    loading={loading}
                    skeleton={
                        <CustomSkeleton variant="rectangular" height={120} />
                    }
                >
                    {detail && (
                        <Box customClass="detail-section-block">
                            <Text customClass="font16 font-SemiBold">
                                Tracking History
                            </Text>
                            {!isTrackEvent ? (
                                <Box customClass="tracking-no-events">
                                    <Text customClass="font13 grey-text">
                                        No tracking events yet.
                                    </Text>
                                </Box>
                            ) : (
                                <Box customClass="tracking-no-events">
                                    <Stepper
                                        orientation="vertical"
                                        activeStep={
                                            detail.tracking_events.length
                                        }
                                        error={detail.status === "FAILED"}
                                        latestStepIndex={0}
                                        steps={[...detail.tracking_events]
                                            .sort(
                                                (a, b) =>
                                                    b.timestamp - a.timestamp,
                                            )
                                            .map((event) => ({
                                                label: event.status
                                                    .split("_")
                                                    .map(
                                                        (w) =>
                                                            w
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            w
                                                                .slice(1)
                                                                .toLowerCase(),
                                                    )
                                                    .join(" "),
                                                description: [
                                                    event.message,
                                                    event.location,
                                                    formateTime(
                                                        event.timestamp,
                                                    ),
                                                ]
                                                    .filter(Boolean)
                                                    .join(" · "),
                                            }))}
                                    />
                                </Box>
                            )}
                        </Box>
                    )}
                </RenderWithFallBack>
            </Box>

            {detail && (
                <>
                    <UpdateDeliveryForm
                        open={isUpdateOpen}
                        onClose={() => setIsUpdateOpen(false)}
                        deliveryId={detail.id}
                        initialData={{
                            status: detail.status,
                            carrier: detail.carrier,
                            tracking_number: detail.tracking_number,
                            assigned_to: detail.assigned_to,
                            estimated_at: detail.estimated_at,
                        }}
                    />
                    <AddTrackingEventForm
                        open={isEventOpen}
                        onClose={() => setIsEventOpen(false)}
                        deliveryId={detail.id}
                        initialData={
                            detail.tracking_events.length > 0
                                ? (() => {
                                      const last = [...detail.tracking_events].sort(
                                          (a, b) => b.timestamp - a.timestamp,
                                      )[0];
                                      return {
                                          status: last.status,
                                          message: last.message,
                                          location: last.location,
                                      };
                                  })()
                                : undefined
                        }
                    />
                </>
            )}
        </DetailPage>
    );
}

export default DeliveryDetails;
