# YORAA Admin Dashboard

A modern React-based admin dashboard for managing notifications and account services, built with Vite for fast development and optimized performance.

## Features

- **Modular Layout**: Consistent header, sidebar, and fixed-width content area for all pages.
- **Push Notifications**: Compose, edit, and send notifications with image upload and preview.
- **Stacked Notifications**: Manage multiple notification rows with edit, delete, and send actions.
- **Reusable Components**: Clean, maintainable codebase with modular React components.
- **Responsive UI**: Modern design with shadow overlays, popups, and interactive elements.
- **LocalStorage Persistence**: Uploaded images are saved and restored automatically.
- **Custom Dropdowns**: Select target platforms for notifications.

## Project Structure

```
src/
  components/         # Reusable UI components (NotificationItem, EditNotificationModal, etc.)
  layout/             # Main dashboard layout (navbar, sidebar, content)
  pages/              # Application pages (pushNotification, notificationPreview)
  data/               # Static data (sidebar items)
  assets/             # SVGs and images
public/
  assets/             # Static assets for navbar and sidebar
```

## Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Run the development server**
   ```sh
   npm run dev
   ```
3. **Open in browser**
   Navigate to `http://localhost:5173` (default Vite port).

## Usage

- Use the sidebar to navigate between dashboard sections.
- Send push notifications by composing text, deeplink, selecting platforms, and uploading an image.
- Edit or delete stacked notifications using the action buttons.
- Preview uploaded notification images in full view.

## Technologies Used

- React
- Vite
- React Router
- Lucide-react (icons)
- Tailwind CSS (utility classes)

## Customization

- Update sidebar items in `src/data/sidebarItems.js`.
- Modify layout in `src/layout/Layout.jsx`.
- Add new pages in `src/pages/` and link via sidebar.

## License

This project is licensed under the MIT License.

---

For questions or contributions, please open an issue or submit a pull request.
