import { useFormik } from "formik";
import { object, string } from "yup";
import { MenuItem } from "@mui/material";
import Modal from "../../components/common/Modal/Modal";
import Input from "../../components/common/Input/Input";
import Box from "../../components/common/Box/Box";
import Label from "../../components/common/Label/Label";
import SelectData from "../../components/common/Select/Select";
import {
    emailAddress,
    emailPlaceHolder,
    EMAIL_REQUIRED_MESSAGE,
    firstName,
    firstNamePlaceHolder,
    FIRST_NAME_REQUIRED_MESSAGE,
    lastName,
    lastNamePlaceHolder,
    LAST_NAME_REQUIRED_MESSAGE,
    password,
    passwordPlaceHolder,
    PASSWORD_REQUIRED_MESSAGE,
    PASSWORD_LENGTH_MESSAGE,
    phone,
    phonePlaceHolder,
    PHONE_LENGTH_MESSAGE,
    addingUserText,
    addUserTitle,
    userRoleLabel,
    ROLE_REQUIRED_MESSAGE,
} from "../../components/messages";
import { USER_ROLE_OPTIONS } from "../../components/config";
import type { TCreateAdmin, TUserRole } from "../../types";
import { callAPIInterface } from "../../utils";
import type { TUser } from "../../utils/utils";
import ComponentLoader from "../../components/common/Loader/ComponentLoader";

type UserFormValues = {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
    role: TUserRole | "";
};

interface IUserFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const initialValues: UserFormValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: "",
};

const userSchema = object({
    email: string().required(EMAIL_REQUIRED_MESSAGE).email(),
    password: string()
        .required(PASSWORD_REQUIRED_MESSAGE)
        .min(8, PASSWORD_LENGTH_MESSAGE),
    first_name: string().required(FIRST_NAME_REQUIRED_MESSAGE),
    last_name: string().required(LAST_NAME_REQUIRED_MESSAGE),
    phone: string()
        .optional()
        .matches(/^\d{10}$/, PHONE_LENGTH_MESSAGE),
    role: string().required(ROLE_REQUIRED_MESSAGE),
});

function UserForm({ open, onClose, onSuccess }: IUserFormProps) {
    const formik = useFormik<UserFormValues>({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values) => {
            try {
                const payload: TCreateAdmin = {
                    ...values,
                    phone: values.phone ? Number(values.phone) : undefined,
                    role: values.role as TUserRole,
                };
                await callAPIInterface<TCreateAdmin, TUser>(
                    "POST",
                    "/users",
                    payload,
                );
                onSuccess();
                handleClose();
            } catch (error) {
                console.error(error);
            }
        },
    });

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
        isSubmitting,
    } = formik;

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const buildProps = (
        field: keyof Omit<UserFormValues, "role">,
        label: string,
        placeholder: string,
        optional = false,
    ) => ({
        showLabel: true as const,
        id: field,
        name: field,
        label,
        placeholder,
        optional,
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
            title={addUserTitle}
            buttonLabel="Add"
            onClose={handleClose}
            onSubmit={handleSubmit}
            isForm
            disabled={!dirty || !isValid || isSubmitting}
        >
            {isSubmitting ? (
                <ComponentLoader
                    customClass="flex flex-col items-center user-create-loader"
                    text={addingUserText}
                />
            ) : (
                <>
                    <Box customClass="flex user-form-name-row">
                        <Box customClass="user-form-half">
                            <Input
                                {...buildProps(
                                    "first_name",
                                    firstName,
                                    firstNamePlaceHolder,
                                )}
                            />
                        </Box>
                        <Box customClass="user-form-half">
                            <Input
                                {...buildProps(
                                    "last_name",
                                    lastName,
                                    lastNamePlaceHolder,
                                )}
                            />
                        </Box>
                    </Box>
                    <Input
                        {...buildProps("email", emailAddress, emailPlaceHolder)}
                    />
                    <Input
                        {...buildProps(
                            "password",
                            password,
                            passwordPlaceHolder,
                        )}
                        type="password"
                    />
                    <Input
                        {...buildProps("phone", phone, phonePlaceHolder, true)}
                    />
                    <Box className="input-element">
                        <Label label={userRoleLabel} />
                        <SelectData
                            customClass="login-input"
                            placeholder="Select role"
                            value={values.role}
                            error={!!(touched.role && errors.role)}
                            helperText={
                                touched.role ? errors.role : undefined
                            }
                            onChange={(e) =>
                                setFieldValue("role", e.target.value)
                            }
                            onBlur={() => setFieldTouched("role", true)}
                        >
                            {USER_ROLE_OPTIONS.map((opt) => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </SelectData>
                    </Box>
                </>
            )}
        </Modal>
    );
}

export default UserForm;
