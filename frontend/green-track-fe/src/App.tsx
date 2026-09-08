import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthGuard from "./guards/AuthGuard";
import { AuthProvider, useAuth } from "./services/AuthContext";
import { Spinner } from "./components/ui/spinner";

const RootRedirector = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Wait for the context to finish checking localStorage on boot
  if (isLoading) {
    return (
      <div className="flex h-dscreen w-full items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  // If token exists, fast-track to dashboard; otherwise, send to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootRedirector />} />
            <Route path="/login" element={<Login />} />

            <Route element={<AuthGuard />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
