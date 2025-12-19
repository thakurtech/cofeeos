# ☕ CaféOS User Guide

**Status:** ✅ System Fully Operational
**Version:** 1.0.0

---

## 🚀 Quick Access URLs

| Portal | URL | Description |
|--------|-----|-------------|
| **Login Page** | [http://localhost:3000/login](http://localhost:3000/login) | Main entry point for all users |
| **Super Admin** | [http://localhost:3000/super-admin](http://localhost:3000/super-admin) | Manage all cafes, owners, and platform settings |
| **Cafe Dashboard** | [http://localhost:3000/dashboard](http://localhost:3000/dashboard) | Owner's view: analytics, menu, staff |
| **POS System** | [http://localhost:3000/pos](http://localhost:3000/pos) | Cashier interface for taking orders |
| **Kitchen Display** | [http://localhost:3000/kitchen](http://localhost:3000/kitchen) | Chef's view for incoming orders |

---

## 🔑 Login Credentials

### 1. Super Admin (You)
*   **Email:** `admin@cafeos.com`
*   **Password:** `password`
*   **Role:** Platform Owner
*   **Capabilities:** Create cafes, manage subscriptions, view global analytics.

### 2. Cafe Owner (Demo Account)
*   **Email:** `owner@cafenoir.com`
*   **Password:** `password`
*   **Role:** Shop Owner
*   **Capabilities:** Manage menu, view shop reports, manage staff.

---

## 🛠️ Typical Workflows

### 🆕 Create a New Cafe
1.  Login as **Super Admin**.
2.  Navigate to **Cafes** > **New Cafe**.
3.  Fill in Cafe Details (Name, Slug, Address).
4.  Create Owner Account (Name, Email, **Password**).
    *   *Note: Password is now required and hashed automatically.*
5.  Set Branding (Theme Color, UPI ID).
6.  Click **Create Cafe**.

### ☕ Process an Order (POS)
1.  Login as **Cafe Owner** (or use a Cashier account).
2.  Go to **POS** (`/pos`).
3.  Tap menu items to add to cart.
4.  Select **Dine In** or **Takeaway**.
5.  Click **Charge** > Select Payment Method (Cash/UPI).
6.  Order is sent to Kitchen!

### 👨‍🍳 Complete an Order (Kitchen)
1.  Go to **Kitchen Display** (`/kitchen`).
2.  You will see the new order card.
3.  Click **"Mark Ready"** when food is prepared.
4.  Order moves to *Completed* tab.

---

## ⚠️ Important Deployment Notes

1.  **Mobile Hotspot:** Currently, the database (Supabase) connection requires a mobile hotspot due to ISP port blocking on local WiFi. Ensure your laptop is connected to your phone's hotspot.
2.  **Server Status:** Ensure both terminals are running:
    *   Backend: `npm run start:dev` (Port 3001)
    *   Frontend: `npm run dev` (Port 3000)

---

## 🎉 Ready for Sales?
**Yes!** The application core flows are complete. You can now demo this to potential cafe owners.
