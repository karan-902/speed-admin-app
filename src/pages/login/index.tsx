import Grid from "../../components/common/Grid/Grid";
import Link from "../../components/common/Link/Link";
import Text from "../../components/common/Text/Text";

import {
  dontHaveAnAccount,
  itGreatToHaveYouHere,
  signInYourAccount,
  signUp,
} from "../../components/messages";

import LoginForm from "./LoginForm";

function Login() {
  return (
    <>
      <Grid customClass="common-grid-wrapper signin-signup-container-layout">
        <Text variant="h5" fontSize={30} customClass="font-bold">
          {signInYourAccount}
        </Text>
        <Text variant="h6" size={18} mt={1}>
          {itGreatToHaveYouHere}
        </Text>
        <LoginForm />
        <Text
          textAlign={"center"}
          variant="h5"
          margin={"30px 0 20px 0"}
          customClass="font-SemiBold font16"
        >
          {dontHaveAnAccount}
          <Link to="/register">{signUp}</Link>
        </Text>
      </Grid>
    </>
  );
}

export default Login;
