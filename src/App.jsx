import { Routes, Route, Outlet } from "react-router-dom";
import ConfirmationDialogue from "./components/confirmationDialogue";
import Layout from "./layout/Layout";
import PushNotification from "./pages/pushNotification";
import NotificationPreview from "./pages/notificationPreview";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ConfirmationDialogue />} />
        <Route element={<Layout />}>
          <Route path="/push-notification" element={<PushNotification />} />
          <Route
            path="/notification-preview"
            element={<NotificationPreview />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
