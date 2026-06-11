import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import dayjs, { type Dayjs } from "dayjs";
import { MenuItem } from "@mui/material";
import Modal from "../../components/common/Modal/Modal";
import Input from "../../components/common/Input/Input";
import Box from "../../components/common/Box/Box";
import Label from "../../components/common/Label/Label";
import SelectData from "../../components/common/Select/Select";
import DatePickerField from "../../components/common/DatePicker/DatePickerField";
import {
    updateDeliveryTitle,
    carrierLabel,
    carrierPlaceholder,
    trackingNumberLabel,
    trackingNumberPlaceholder,
    assignedToLabel,
    estimatedDeliveryLabel,
    eventStatusLabel,
} from "../../components/messages";
import { DELIVERY_STATUS_OPTIONS } from "../../components/config";
import { callAPIInterface } from "../../utils";
import type { TUser, TUsersResponse } from "../../utils/utils";
import type { TUpdateDeliveryPayload } from "../../types";

type UpdateDeliveryValues = {
    status: string;
    carrier: string;
    tracking_number: string;
    assigned_to: string;
    estimated_at: Dayjs | null;
};

const initialValues: UpdateDeliveryValues = {
    status: "",
    carrier: "",
    tracking_number: "",
    assigned_to: "",
    estimated_at: null,
};

const schema = object({
    status: string().optional(),
    carrier: string().optional(),
    tracking_number: string().optional(),
    assigned_to: string().optional(),
});

interface IUpdateDeliveryFormProps {
    open: boolean;
    onClose: () => void;
    deliveryId: string;
    initialData?: {
        status?: string;
        carrier?: string | null;
        tracking_number?: string | null;
        assigned_to?: string | null;
        estimated_at?: number | null;
    };
}

function UpdateDeliveryForm({
    open,
    onClose,
    deliveryId,
    initialData,
}: IUpdateDeliveryFormProps) {
    const [deliveryPartners, setDeliveryPartners] = useState<TUser[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        callAPIInterface<void, TUsersResponse>(
            "GET",
            "/users?role=DELIVERY_PARTNER&limit=100",
        )
            .then((res) => setDeliveryPartners(res.data))
            .catch(console.error);
    }, [open]);

    const formik = useFormik<UpdateDeliveryValues>({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            const payload: TUpdateDeliveryPayload = {};
            if (values.status) payload.status = values.status;
            if (values.carrier) payload.carrier = values.carrier;
            if (values.tracking_number)
                payload.tracking_number = values.tracking_number;
            if (values.assigned_to) payload.assigned_to = values.assigned_to;
            if (values.estimated_at)
                payload.estimated_at = Number(values.estimated_at.valueOf());

            try {
                setIsSubmitting(true);
                await callAPIInterface<TUpdateDeliveryPayload, unknown>(
                    "PATCH",
                    `/deliveries/${deliveryId}`,
                    payload,
                );
            } catch (error) {
                console.error(error);
            } finally {
                setIsSubmitting(false);
                handleClose();
            }
        },
    });

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        setValues,
        values,
        touched,
        errors,
        dirty,
        resetForm,
    } = formik;

    useEffect(() => {
        if (!open || !initialData) return;
        setValues({
            status: initialData.status ?? "",
            carrier: initialData.carrier ?? "",
            tracking_number: initialData.tracking_number ?? "",
            assigned_to: initialData.assigned_to ?? "",
            estimated_at: initialData.estimated_at
                ? dayjs(initialData.estimated_at)
                : null,
        });
    }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const buildProps = (
        field: "carrier" | "tracking_number",
        label: string,
        placeholder: string,
    ) => ({
        showLabel: true as const,
        id: field,
        name: field,
        label,
        placeholder,
        optional: true,
        onChange: handleChange,
        onBlur: handleBlur,
        value: values[field],
        isError: !!(touched[field] && errors[field]),
        helperText: touched[field] ? errors[field] : undefined,
        customClass: "login-input" as const,
    });

    return (
        <Modal
            open={open}
            title={updateDeliveryTitle}
            buttonLabel="Save"
            onClose={handleClose}
            onSubmit={handleSubmit}
            isForm
            disabled={!dirty || isSubmitting}
        >
            <Box customClass="flex flex-col update-delivery-form">
                <Box className="input-element">
                    <Label label={eventStatusLabel} optional />
                    <SelectData
                        customClass="login-input"
                        placeholder="Select status"
                        value={values.status}
                        onChange={(e) =>
                            setFieldValue("status", e.target.value)
                        }
                        onBlur={() => setFieldTouched("status", true)}
                    >
                        {DELIVERY_STATUS_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </SelectData>
                </Box>
                <Input
                    {...buildProps("carrier", carrierLabel, carrierPlaceholder)}
                />
                <Input
                    {...buildProps(
                        "tracking_number",
                        trackingNumberLabel,
                        trackingNumberPlaceholder,
                    )}
                />
                <Box className="input-element">
                    <Label label={assignedToLabel} optional />
                    <SelectData
                        customClass="login-input"
                        placeholder="Select delivery partner"
                        value={values.assigned_to}
                        onChange={(e) =>
                            setFieldValue("assigned_to", e.target.value)
                        }
                        onBlur={() => setFieldTouched("assigned_to", true)}
                    >
                        {deliveryPartners.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.first_name} {user.last_name}
                            </MenuItem>
                        ))}
                    </SelectData>
                </Box>
                <DatePickerField
                    showLabel
                    label={estimatedDeliveryLabel}
                    optional
                    value={values.estimated_at}
                    onChange={(val) => setFieldValue("estimated_at", val)}
                    onBlur={() => setFieldTouched("estimated_at", true)}
                    customClass="login-input"
                />
            </Box>
        </Modal>
    );
}

export default UpdateDeliveryForm;
