import { Card } from "antd";
import { useEffect } from "react";
import ClientList from "../components/ClientList";
import { useDispatch } from "react-redux";
import { setBreadcrumbs } from "../store/slices/breadcrumbSlice";
import AppNavigator from "../components/AppNavigator";
import AppContainer from "../components/AppContainer";

function ClientsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: "Clients" }]));
  }, [dispatch]);

  return (
    <AppContainer>
      <Card style={{ width: "50%", padding: "24px" }}>
        <AppNavigator />
        <ClientList />
      </Card>
    </AppContainer>
  );
}

export default ClientsPage;
