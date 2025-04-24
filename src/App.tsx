import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { UserProvider } from "./providers/UserProvider";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
