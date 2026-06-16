import LoginPage from "./components/LoginPage";
import useAuth from "./hooks/useAuth";
import HomePage from "./pages/HomePage";

export default function App() {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return (
      <LoginPage
        error={auth.authError}
        isLoading={auth.authLoading}
        onLogin={auth.login}
      />
    );
  }

  return <HomePage onLogout={auth.logout} />;
}
