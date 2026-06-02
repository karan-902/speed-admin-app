import { object, string } from "yup";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import Input from "../../components/common/Input/Input";
import {
    EMAIL_REQUIRED_MESSAGE,
    emailAddress,
    emailPlaceHolder,
    FIRST_NAME_REQUIRED_MESSAGE,
    firstName,
    firstNamePlaceHolder,
    LAST_NAME_REQUIRED_MESSAGE,
    lastName,
    lastNamePlaceHolder,
    password,
    PASSWORD_LENGTH_MESSAGE,
    PASSWORD_REQUIRED_MESSAGE,
    passwordPlaceHolder,
    phone,
    PHONE_LENGTH_MESSAGE,
    PHONE_REQUIRED_MESSAGE,
    phonePlaceHolder,
    register,
} from "../../components/messages";
import Button from "../../components/common/Button/Button";
import { useReduxDispatch } from "../../redux/hooks";
import { signUp } from "../../redux/thunks";
import { useNavigate } from "react-router-dom";
import type { TRegisterForm } from "../../types";
import type { InputProps } from "../../utils/components";

function RegisterForm() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const registerSchema = object({
        first_name: string().required(FIRST_NAME_REQUIRED_MESSAGE),
        last_name: string().required(LAST_NAME_REQUIRED_MESSAGE),
        phone_number: string()
            .required(PHONE_REQUIRED_MESSAGE)
            .min(10, PHONE_LENGTH_MESSAGE),
        email: string().required(EMAIL_REQUIRED_MESSAGE).email(),
        password: string()
            .required(PASSWORD_REQUIRED_MESSAGE)
            .min(8, PASSWORD_LENGTH_MESSAGE),
    });

    const formik = useFormik<TRegisterForm>({
        initialValues: {
            first_name: "",
            last_name: "",
            phone_number: "",
            email: "",
            password: "",
        },
        validationSchema: registerSchema,
        onSubmit: (values) => {
            dispatch(signUp(values))
                .unwrap()
                .finally(() => {
                    formik.resetForm();
                    navigate("/login");
                });
        },
    });
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        dirty,
        isValid,
    } = formik;
    const disabled = !isValid || !dirty;

    const buildFormProps = (
        field: keyof TRegisterForm,
        label: string,
        placeHolder: string,
    ): InputProps => ({
        showLabel: true as const,
        id: field,
        name: field,
        label: label,
        placeholder: placeHolder,
        onChange: handleChange,
        onBlur: handleBlur,
        value: values[field],
        isError: touched[field] && Boolean(errors[field]),
        helperText: touched[field] ? errors[field] : undefined,
        customClass: "login-input" as const,
    });
    return (
        <Grid component={"form"} onSubmit={handleSubmit} mt={4}>
            <Input
                {...buildFormProps(
                    "first_name",
                    firstName,
                    firstNamePlaceHolder,
                )}
            />
            <Input
                {...buildFormProps("last_name", lastName, lastNamePlaceHolder)}
            />
            <Input
                {...buildFormProps("phone_number", phone, phonePlaceHolder)}
            />

            <Input
                {...buildFormProps("email", emailAddress, emailPlaceHolder)}
            />
            <Input
                {...buildFormProps("password", password, passwordPlaceHolder)}
            />

            <Button
                icon="next"
                type="submit"
                disabled={disabled}
                iconPosition="end"
            >
                {register}
            </Button>
        </Grid>
    );
}

export default RegisterForm;
