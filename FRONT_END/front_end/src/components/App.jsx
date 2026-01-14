import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "../stores/store";
import LoginPage from "./LoginPage/LoginPage";
import OrganiserDashboard from "./OrganiserDashboard/OrganiserDashboard";
import ReviewerDashboard from "./ReviewerDashboard/ReviewerDashboard";
import "./App.css";

function RoleRouter() {
  const user = useSelector((state) => state.auth.data);
  const role = (user?.role || "").toUpperCase();

  if (!user) return <LoginPage />;
  if (role === "ORGANISER") return <OrganiserDashboard />;
  if (role === "REVIEWER") return <ReviewerDashboard />;

  return (
    <div style={{ padding: 24 }}>Dashboard pentru {role} nu e implementat.</div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleRouter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
