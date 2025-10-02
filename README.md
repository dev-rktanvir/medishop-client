# 💊 MediShop - Multi-Vendor Medicine Selling E-commerce Website
## 🛍️ Overview

**MediShop** is a full-stack MERN application designed as a multi-vendor platform for selling medicines and healthcare products. It provides user, seller, and admin interfaces with role-based dashboards, real-time inventory, cart management, secure payment via Stripe, and more — all wrapped in a responsive and modern UI.

## 🚀 Features

1. 🔐 **Role-based Authentication:** Login/Signup with Firebase, Google, GitHub; roles include User, Seller, Admin.
2. 🛒 **Fully Functional Cart System:** Add to cart, update quantity, remove items, clear cart.
3. 💳 **Stripe Payment Integration:** Seamless and secure checkout experience.
4. 🧾 **Invoice Generation:** Auto-generated invoice after purchase with download/print options.
5. 🧑‍⚕️ **Multi-vendor Support:** Sellers can manage their medicines, view orders, and request ads.
6. 📊 **Admin Dashboard:** Manage users, categories, payments, sales reports, and banner ads.
7. 🏷️ **Dynamic Home Page:** Product slider, category display, and discounted product showcase.
8. 🔍 **Advanced Medicine Search & Filter:** Pagination, search by name/company/generic name, and price sorting.
9. 📅 **Sales Reporting Tools:** Date-range filter and data export to PDF/CSV/XLSX.
10. 🌐 **Responsive Design:** Fully mobile, tablet, and desktop friendly dashboard and website.
11. 📦 **Real-time Updates:** All data fetches use `tanstack-query` for fast and reactive UI.
12. 📢 **Smart Notifications:** Sweet Alerts and Toast messages for all user actions (no default alerts).
13. 🔐 **Protected Routes:** Authenticated access via JWT; routes remain protected on refresh.
14. 📁 **Secure Credentials:** Firebase and MongoDB credentials are hidden via `.env` files.

## 🧑‍💻 Technologies Used

- **Frontend:** React.js, React Router, Tailwind CSS, DaisyUI, TanStack Query, React Hook Form
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Auth:** Firebase Authentication (Email/Password, Google, GitHub)
- **Payment:** Stripe
- **File Handling:** Image upload via third-party hosting (e.g., ImgBB, Cloudinary)
- **PDF & Report Tools:** jsPDF, XLSX, react-data-table-component
- **Other Tools:** React Helmet, re-title, SweetAlert2, SwiperJS
