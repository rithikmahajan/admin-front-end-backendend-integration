import { Routes, Route, Outlet } from "react-router-dom";
import ConfirmationDialogue from "./components/confirmationDialogue";
import Layout from "./layout/Layout";
import PushNotification from "./pages/pushnotification";
import NotificationPreview from "./pages/notificationPreview";
import InviteAFriend from "./pages/inviteafriend";
import ManageReviews from "./pages/ManageReviews";

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
          <Route path="/invite" element={<InviteAFriend />} />
          <Route path="/manage-reviews" element={<ManageReviews />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
