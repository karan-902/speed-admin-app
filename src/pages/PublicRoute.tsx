import { Outlet, Navigate } from "react-router-dom";
import Container from "../components/common/Container/Container";
import Box from "../components/common/Box/Box";
import { DiagonalDiv } from "../components/constants";
import { vector } from "../components/images";
import { logoWhite } from "../components/images";
import { useReduxSelector } from "../redux/hooks";

function PublicRoute() {
  const session = useReduxSelector((state) => state.auth.session);

  if (session?.access_token) return <Navigate to="/" replace />;
  return (
    <>
      <Box customClass="main-wrapper-container">
        <DiagonalDiv src={vector}>
          <Container customClass="ecommerce-container">
            <Box customClass="ecommerce-root-container">
              <Box component={"main"} customClass="auth-section-container">
                <Box customClass="main-logo-login">
                  <img src={logoWhite} alt="logo-white" />
                </Box>
                <Box customClass="container-layout">
                  <Outlet />
                </Box>
              </Box>
            </Box>
          </Container>
        </DiagonalDiv>
      </Box>
    </>
  );
}

export default PublicRoute;
