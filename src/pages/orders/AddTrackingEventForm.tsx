import { useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { MenuItem } from "@mui/material";
import Modal from "../../components/common/Modal/Modal";
import Input from "../../components/common/Input/Input";
import Box from "../../components/common/Box/Box";
import Label from "../../components/common/Label/Label";
import SelectData from "../../components/common/Select/Select";
import {
    addTrackingEventTitle,
    eventLocationLabel,
    eventLocationPlaceholder,
    eventMessageLabel,
    eventMessagePlaceholder,
    eventStatusLabel,
    LOCATION_REQUIRED,
    STATUS_REQUIRED,
} from "../../components/messages";
import { DELIVERY_STATUS_OPTIONS } from "../../components/config";
import { callAPIInterface } from "../../utils";

type AddTrackingEventValues = {
    status: string;
    message: string;
    location: string;
};

const initialValues: AddTrackingEventValues = {
    status: "",
    message: "",
    location: "",
};

const schema = object({
    status: string().required(STATUS_REQUIRED),
    message: string().optional(),
    location: string().required(LOCATION_REQUIRED),
});

interface IAddTrackingEventFormProps {
    open: boolean;
    onClose: () => void;
    deliveryId: string;
    initialData?: {
        status?: string;
        message?: string | null;
        location?: string;
    };
}

function AddTrackingEventForm({
    open,
    onClose,
    deliveryId,
    initialData,
}: IAddTrackingEventFormProps) {
    const formik = useFormik<AddTrackingEventValues>({
        initialValues,
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const payload: Record<string, string> = {
                    status: values.status,
                    location: values.location,
                };
                if (values.message) payload.message = values.message;
                await callAPIInterface(
                    "POST",
                    `/deliveries/${deliveryId}/event`,
                    payload,
                );
            } catch (error) {
                console.error(error);
            } finally {
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
        isValid,
        resetForm,
    } = formik;

    useEffect(() => {
        if (!open || !initialData) return;
        setValues({
            status: initialData.status ?? "",
            message: initialData.message ?? "",
            location: initialData.location ?? "",
        });
    }, [open]);

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const buildProps = (
        field: "message" | "location",
        label: string,
        placeholder: string,
    ) => ({
        showLabel: true as const,
        id: field,
        name: field,
        label,
        placeholder,
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
            title={addTrackingEventTitle}
            buttonLabel="Add"
            onClose={handleClose}
            onSubmit={handleSubmit}
            isForm
            disabled={!dirty || !isValid}
        >
            <Box customClass="flex flex-col" gap={2} mt={1}>
                <Box className="input-element">
                    <Label label={eventStatusLabel} />
                    <SelectData
                        customClass="login-input"
                        placeholder="Select status"
                        value={values.status}
                        error={!!(touched.status && errors.status)}
                        helperText={touched.status ? errors.status : undefined}
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
                    {...buildProps(
                        "message",
                        eventMessageLabel,
                        eventMessagePlaceholder,
                    )}
                    optional
                />
                <Input
                    {...buildProps(
                        "location",
                        eventLocationLabel,
                        eventLocationPlaceholder,
                    )}
                />
            </Box>
        </Modal>
    );
}

export default AddTrackingEventForm;
