import { Grid } from "@mui/material";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useReduxDispatch } from "../../redux/hooks";
import { logIn } from "../../redux/thunks";
import {
    EMAIL_REQUIRED_MESSAGE,
    emailAddress,
    emailPlaceHolder,
    login,
    password,
    PASSWORD_LENGTH_MESSAGE,
    PASSWORD_REQUIRED_MESSAGE,
    passwordPlaceHolder,
} from "../../components/messages";
import type { InputProps, TLoginForm } from "../../utils/components";
function LoginForm() {
    const dispatch = useReduxDispatch();
    const loginSchema = object({
        email: string().required(EMAIL_REQUIRED_MESSAGE).email(),
        password: string()
            .required(PASSWORD_REQUIRED_MESSAGE)
            .min(8, PASSWORD_LENGTH_MESSAGE),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => dispatch(logIn(values)),
    });
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        dirty,
        isValid,
        errors,
        touched,
    } = formik;
    const disabled = !isValid || !dirty;
    const buildFieldProps = (
        field: keyof TLoginForm,
        label: string,
        placeholder: string,
    ): InputProps => ({
        id: field,
        name: field,
        onChange: handleChange,
        onBlur: handleBlur,
        showLabel: true as const,
        value: values[field],
        isError: touched[field] && Boolean(errors[field]),
        helperText: touched[field] ? errors[field] : undefined,
        label: label,
        placeholder: placeholder,
    });
    return (
        <>
            <Grid onSubmit={handleSubmit} component={"form"} mt={4}>
                <Input
                    {...buildFieldProps(
                        "email",
                        emailAddress,
                        emailPlaceHolder,
                    )}
                />
                <Input
                    {...buildFieldProps(
                        "password",
                        password,
                        passwordPlaceHolder,
                    )}
                />
                <Button
                    customClass="login-button"
                    icon="next"
                    type="submit"
                    label={login}
                    disabled={disabled}
                    iconPosition="end"
                ></Button>
            </Grid>
        </>
    );
}

export default LoginForm;
