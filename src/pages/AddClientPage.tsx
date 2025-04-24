import { Card } from "antd";
import AppContainer from "../components/AppContainer";
import AppNavigator from "../components/AppNavigator";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../store/slices/breadcrumbSlice";
import ClientForm from "../components/ClientForm";

function AddClientPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { title: "Clients", path: "/clients" },
        { title: "Add Client" },
      ])
    );
  }, [dispatch]);

  return (
    <AppContainer>
      <Card style={{ width: "50%", padding: "24px" }}>
        <AppNavigator />
        <ClientForm />
      </Card>
    </AppContainer>
  );
}

export default AddClientPage;
