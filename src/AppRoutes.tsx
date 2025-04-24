import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClientsPage from "./pages/ClientsPage";
import AddClientPage from "./pages/AddClientPage";
import EditClientPage from "./pages/EditClientPage";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<ClientsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/add" element={<AddClientPage />} />
          <Route path="/clients/edit/:id" element={<EditClientPage />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/clients" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? <Navigate to="/clients" /> : <RegisterPage />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
