import Text from "../../components/common/Text/Text";
import Link from "../../components/common/Link/Link";
import {
  doYouAlreadyHaveAnAccount,
  itGreatToHaveYouHereSignup,
  signIn,
  welcomeSignup,
} from "../../components/messages";
import RegisterForm from "./RegisterForm";
import Grid from "../../components/common/Grid/Grid";
function Register() {
  return (
    <>
      <Grid customClass="common-grid-wrapper signin-signup-container-layout">
        <Text variant="h5" fontSize={30} customClass="font-bold">
          {welcomeSignup}
        </Text>
        <Text variant="h6" size={18} mt={1}>
          {itGreatToHaveYouHereSignup}
        </Text>
        <RegisterForm />
        <Text
          textAlign={"center"}
          variant="h5"
          margin={"30px 0 20px 0"}
          customClass="font-SemiBold font16"
        >
          {doYouAlreadyHaveAnAccount}
          <Link to="/">{signIn}</Link>
        </Text>
      </Grid>
    </>
  );
}

export default Register;
