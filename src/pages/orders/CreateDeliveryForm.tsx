import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { object, string, mixed } from "yup";
import type { Dayjs } from "dayjs";
import Modal from "../../components/common/Modal/Modal";
import Input from "../../components/common/Input/Input";
import Box from "../../components/common/Box/Box";
import DatePickerField from "../../components/common/DatePicker/DatePickerField";
import {
    createDeliveryTitle,
    estimatedDeliveryLabel,
    ESTIMATED_AT_REQUIRED,
    orderIdLabel,
    orderIdPlaceholder,
    ORDER_ID_REQUIRED,
} from "../../components/messages";
import { callAPIInterface } from "../../utils";
import type { TCreateDeliveryPayload } from "../../types";

type CreateDeliveryValues = {
    order_id: string;
    estimated_at: Dayjs | null;
};

const schema = object({
    order_id: string().required(ORDER_ID_REQUIRED),
    estimated_at: mixed<Dayjs>()
        .nullable()
        .required(ESTIMATED_AT_REQUIRED)
        .test(
            "is-valid-date",
            ESTIMATED_AT_REQUIRED,
            (v) => v != null && v.isValid(),
        ),
});

interface ICreateDeliveryFormProps {
    open: boolean;
    onClose: () => void;
    orderId?: string;
}

function CreateDeliveryForm({ open, onClose, orderId }: ICreateDeliveryFormProps) {
    const [isDisabled, setIsDisabled] = useState(false);

    const formik = useFormik<CreateDeliveryValues>({
        initialValues: { order_id: orderId ?? "", estimated_at: null },
        validationSchema: schema,
        onSubmit: async (_values) => {
            const payload: TCreateDeliveryPayload = {
                order_id: formik.values.order_id,
                estimated_at: Number(formik.values.estimated_at?.valueOf()),
            };
            try {
                setIsDisabled(true);
                await callAPIInterface<TCreateDeliveryPayload, any>(
                    "POST",
                    "/deliveries",
                    payload,
                ).catch((err) => console.error(err));
            } catch (error) {
                console.error(error);
            } finally {
                setIsDisabled(false);
                formik.resetForm();
                onClose();
            }
        },
    });

    useEffect(() => {
        if (open) formik.setFieldValue("order_id", orderId ?? "");
    }, [open, orderId]);

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        values,
        touched,
        errors,
        dirty,
        isValid,
        resetForm,
    } = formik;

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            open={open}
            title={createDeliveryTitle}
            buttonLabel="Create"
            onClose={handleClose}
            onSubmit={handleSubmit}
            isForm
            disabled={!dirty || !isValid || isDisabled}
        >
            <Box customClass="flex flex-col" mt={1}>
                {!orderId && (
                    <Input
                        showLabel
                        id="order_id"
                        name="order_id"
                        label={orderIdLabel}
                        placeholder={orderIdPlaceholder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.order_id}
                        isError={!!(touched.order_id && errors.order_id)}
                        helperText={touched.order_id ? errors.order_id : undefined}
                        customClass="login-input"
                    />
                )}
                <DatePickerField
                    showLabel
                    label={estimatedDeliveryLabel}
                    value={values.estimated_at}
                    onChange={(val) => setFieldValue("estimated_at", val)}
                    onBlur={() => setFieldTouched("estimated_at", true)}
                    isError={!!(touched.estimated_at && errors.estimated_at)}
                    helperText={
                        touched.estimated_at
                            ? (errors.estimated_at as string)
                            : undefined
                    }
                    customClass="login-input"
                    disablePast
                />
            </Box>
        </Modal>
    );
}

export default CreateDeliveryForm;
