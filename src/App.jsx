import { Routes, Route } from "react-router-dom";
import ConfirmationDialogue from "./components/confirmationDialogue";
import Layout from "./layout/Layout";
import PushNotification from "./pages/pushNotification";
import NotificationPreview from "./pages/notificationPreview";
import InviteAFriend from "./pages/inviteafriend";
import ManageReviews from "./pages/ManageReviews";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Database from "./pages/database";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import ReturnOrders from "./pages/ReturnOrders";
import ManageItems from "./pages/ManageItems";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Points from "./pages/points";
import PromoCodeManagement from "./pages/PromoCodeManagement";
import UploadCategory from "./pages/UploadCategory";
import SubCategory from "./pages/SubCategory";
import Filters from "./pages/Filters";
import JoinUsControl from "./pages/JoinUsControl";
import ManageBannersOnRewards from "./pages/ManageBannersOnRewards";
import ProductBundling from "./pages/ProductBundling";
import ArrangementControl from "./pages/ArrangementControl";
import NewPartner from "./pages/NewPartner";
import BlockUser from "./pages/BlockUser";
import SendNotificationInApp from "./pages/sendnotificationinapp";
import SendPromoNotification from "./pages/sendpromonotification";
import CartAbandonmentRecovery from "./pages/cartabandonmentrecovery";
import BulkSMS from "./pages/BulkSMS";
import SingleProductUpload from "./pages/SingleProductUpload";
import FaqManagement from "./pages/FaqManagement";
import ReviewDetails from "./pages/ReviewDetails";
import CollectCommunicationPreferences from "./pages/Collect communication preferences";
import CollectProfileVisibilityData from "./pages/collect Profile visibility data";
import CollectLocationData from "./pages/collectlocationdata";
import GetAutoInvoiceMailing from "./pages/get auto invoice mailing";
import HuggingFaceApiOpenClose from "./pages/hugging face api open close";

const App = () => {
  return (
    <>
      <Routes>
        {/* All routes wrapped in Layout to show sidebar and admin interface */}
        <Route element={<Layout />}>
          {/* ===== DASHBOARD & MAIN ===== */}
          <Route path="/" element={<Database />} />
          <Route path="/database" element={<Database />} />
          
          {/* ===== ORDER MANAGEMENT ===== */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/return-orders" element={<ReturnOrders />} />
          
          {/* ===== PRODUCT MANAGEMENT ===== */}
          <Route path="/manage-items" element={<ManageItems />} />
          <Route path="/products" element={<Products />} />
          <Route path="/upload-category" element={<UploadCategory />} />
          <Route path="/subcategory" element={<SubCategory />} />
          <Route path="/single-product-upload" element={<SingleProductUpload />} />
          
          {/* ===== REVIEWS & RATINGS ===== */}
          <Route path="/manage-reviews" element={<ManageReviews />} />
          <Route path="/review-details/:reviewId" element={<ReviewDetails />} />
          
          {/* ===== USER MANAGEMENT ===== */}
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/block-user" element={<BlockUser />} />
          
          {/* ===== COMMUNICATION & NOTIFICATIONS ===== */}
          <Route path="/push-notification" element={<PushNotification />} />
          <Route path="/notification-preview" element={<NotificationPreview />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/in-app-notification" element={<SendNotificationInApp />} />
          <Route path="/send-promo-notification" element={<SendPromoNotification />} />
          <Route path="/bulk-messages" element={<BulkSMS />} />
          
          {/* ===== MARKETING & PROMOTIONS ===== */}
          <Route path="/invite" element={<InviteAFriend />} />
          <Route path="/points" element={<Points />} />
          <Route path="/promo-code-management" element={<PromoCodeManagement />} />
          <Route path="/cart-recovery" element={<CartAbandonmentRecovery />} />
          
          {/* ===== APP FUNCTIONAL AREA ===== */}
          <Route path="/filters" element={<Filters />} />
          <Route path="/join-control" element={<JoinUsControl />} />
          <Route path="/manage-banners-rewards" element={<ManageBannersOnRewards />} />
          <Route path="/bundling" element={<ProductBundling />} />
          <Route path="/arrangement" element={<ArrangementControl />} />
          <Route path="/new-partner" element={<NewPartner />} />
          
          {/* ===== DATA MANAGEMENT & COLLECTION ===== */}
          <Route path="/faq-management" element={<FaqManagement />} />
          <Route path="/collect-communication-preferences" element={<CollectCommunicationPreferences />} />
          <Route path="/collect-profile-visibility" element={<CollectProfileVisibilityData />} />
          <Route path="/collect-location-data" element={<CollectLocationData />} />
          <Route path="/auto-invoice-mailing" element={<GetAutoInvoiceMailing />} />
          <Route path="/hugging-face-api" element={<HuggingFaceApiOpenClose />} />
          
          {/* ===== ANALYTICS & REPORTS ===== */}
          <Route path="/analytics" element={<Analytics />} />
          
          {/* ===== SETTINGS & CONFIGURATION ===== */}
          <Route path="/settings" element={<Settings />} />
          
          {/* ===== SETTINGS SUB-ROUTES ===== */}
          {/* These routes provide direct access to settings components */}
          <Route path="/settings/communication-preferences" element={<CollectCommunicationPreferences />} />
          <Route path="/settings/profile-visibility" element={<CollectProfileVisibilityData />} />
          <Route path="/settings/location-data" element={<CollectLocationData />} />
          <Route path="/settings/auto-invoice" element={<GetAutoInvoiceMailing />} />
          <Route path="/settings/hugging-face" element={<HuggingFaceApiOpenClose />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
