import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/dashboard";
import TestPage from "./pages/TestPage";
import DatabaseDashboardNoIcons from "./pages/DatabaseDashboardNoIcons";

const App = () => {
  return (
    <>
      <Routes>
        {/* All routes wrapped in Layout to show sidebar and admin interface */}
        <Route element={<Layout />}>
          {/* ===== DASHBOARD & MAIN ===== */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/database" element={<DatabaseDashboardNoIcons />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
