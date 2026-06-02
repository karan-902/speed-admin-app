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
  emailId,
  emailPlaceHolder,
  login,
  password,
  PASSWORD_LENGTH_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  passwordId,
  passwordPlaceHolder,
} from "../../components/messages";
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
  return (
    <>
      <Grid onSubmit={handleSubmit} component={"form"} mt={4}>
        <Input
          isError={touched.email && Boolean(errors.email)}
          helperText={touched.email ? errors.email : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          name={emailId}
          id={emailId}
          showLabel
          placeholder={emailPlaceHolder}
          label={emailAddress}
        />
        <Input
          isError={touched.password && Boolean(errors.password)}
          helperText={touched.password ? errors.password : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          showLabel
          type="password"
          isPasswordVisible={true}
          name={passwordId}
          id={passwordId}
          placeholder={passwordPlaceHolder}
          label={password}
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
