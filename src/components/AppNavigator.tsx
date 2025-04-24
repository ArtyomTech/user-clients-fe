import { Row, Button } from "antd";
import AppBreadcrumb from "./AppBreadcrumb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";

function AppNavigator() {
  const { username } = useUser();
  const { setUsername } = useUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    setUsername(null);
    navigate("/login");
  };

  useEffect(() => {}, [username]);

  return (
    <>
      <Row justify="end" style={{ marginBottom: "20px" }}>
        <Button onClick={signOut}>Sign Out</Button>
      </Row>
      <AppBreadcrumb />
    </>
  );
}

export default AppNavigator;
