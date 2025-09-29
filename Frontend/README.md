### -------***routes naming *** -------------
🔑 Auth Routes (/api/auth)
    POST /api/auth/register → create account (Admin only)
    GET /api/auth/profile → get user profile
    PUT /api/auth/change-password → update password

👤 Admin Routes (/api/admin)
Staff Management
    POST /api/admin/staff → add staff

### remove register route and controller after project is done

Drug Management✅

Reports & Analytics
    GET /api/admin/reports/daily
    GET /api/admin/reports/export/:format → export as pdf, excel, csv

👩‍⚕️ Pharmacist Routes (/api/pharmacist)
    Sales & Billing✅
  Inventory (Limited)✅
  Sales History✅

🔔 General Routes (/api/general) (Both roles)
    GET /api/general/notifications → fetch all notifications
    PATCH /api/general/notifications/:id/read → mark notification as read
    GET /api/general/drugs/near-expiry → list near expiry drugs



*******registeration detials
-start with one supervisor
-incoming supervisor can create an account but wait for verification
- existing supervisor approves new supervisor, token for verification is send and verify to log in 
-pharmacists create account but wait for verification 
-existing supervisor approves new pharmacist, token for verificaion is sent and verify to log in 
-supervisor can create, edit and deacitvate a pharmacist account
-main supervisor or initial one created will be able to deactivate other supervisors
-reset password
-supervisor should see logout and login sessions with the timestamps

*** login process✅ 

*****main website
-homepage
-login (role-based: Admin / Pharmacist / Cashier)✅ 

*****general Pages
-Dashboard Page (different widgets depending on role)
-Notifications Page (expiry alerts, stock alerts)
-profile Page
-settings for dark mode on all pages

*****admin Pages
-Drug Management Page – add, update, delete, categorize drugs
-Staff Management Page – add/edit pharmacists
-Analytics Page – sales trends, most sold drugs, revenue overview
-Report Page / Export Center – generate reports in PDF/Excel/CSV

*****pharmacist Page
-Sales Page – search/add drugs to cart, generate receipt
-Stock Update Page – update quantities, mark near-expiry
-Sales History Page – lookup previous transactions


------------ **backend functionalities** based on **who performs what**.
# 🔑 **Admin Backend Functionalities**
### 👤 Authentication & User Management
* Create staff accounts (pharmacists, admins).

### 💊 Drug Inventory Management
* Categorize drugs.
* Flag expired/near-expiry drugs.

### 📊 Analytics & Reports
* Generate daily, weekly, and monthly sales reports.
* Export reports (PDF, Excel, CSV).
* View sales trends (charts, revenue overview).
* Compare sales periods (this month vs last month).

### 🔔 Notifications
* Access all expiry and stock notifications.
* Manage notification rules (e.g., set threshold for low stock alerts).

### ⚙️ System Management
* Update pharmacy settings (branding, logo, etc.).
* View system activity logs (who added drugs, made sales, etc.).

# 👩‍⚕️ **Pharmacist Backend Functionalities**
### 💊 Drug Inventory (Limited Scope)
* Mark drugs as near-expiry.  ***** want to make it an automatic feature
* Search drugs by name/category.

### 💵 Sales & Billing✅

### 📜 Sales History
* View past transactions (filter by date, receipt number, or drug).

### 🔔 Notifications
* Receive expiry and low-stock alerts.
* Cannot change notification rules (only Admin can).

## **1. Dashboard (Pharmacist Default Page)**
Purpose: Quick overview of important pharmacy operations in one glance.

## **2. Monthly Sales Report & Analytics Page**
* **Overview Cards**
  * Most Profitable Drug
* **Charts & Analytics**
  * Line/Bar Chart: Daily Sales trend (Day 1 → Day 30/31).
  * Pie/Donut Chart: Sales distribution by drug categories (e.g., Painkillers, Antibiotics, Cough medicines).
  * Top 10 best-selling drugs (with quantities and revenue).
  * Least selling drugs (to identify slow stock).
* **Pharmacist Performance** (if multiple pharmacists)
  * Ranking of pharmacists by sales made.
* **Export Options**
  * Export as PDF / Excel for accounting purposes.

## **3. Weekly Sales Report & Analytics Page**
* **Overview Cards**
  * Average Sales per Day
* **Charts & Analytics**
  * Bar Chart: Sales per day (Monday–Sunday).
  * Comparison to Last Week (↑ or ↓ percentage).
  * Low stock drugs impacting weekly sales.
* **Quick Trends**
  * Which days of the week perform best (e.g., higher weekend sales).

## **4. Daily Sales Report & Analytics Page**
Purpose: Track **pharmacy sales in real-time**.

**Details to include:**

* **Overview Cards**

  * Total Sales Today
  * Number of Customers Served (transactions)
  * Most Sold Drug of the Day
* **Charts & Analytics**

  * Sales over hours (line chart: 8am → 10pm).
  * Breakdown of sales by category (pie chart).
  * Top 5 sold drugs today.
* **Transaction Table**

  * List all transactions today (drug list, pharmacist, total price, timestamp).

---

## **5. Yearly Sales Report & Analytics Page**
* **Overview Cards**
  * Best Selling Drug of the Year
  * Best Performing Pharmacist
* **Charts & Analytics**
  * Line/Bar Chart: Monthly Sales trend (Jan → Dec).
  * Category Performance: Which drug categories generated the most revenue.
  * Year-over-Year Growth Comparison (e.g., 2024 vs 2025).
  * Seasonal Insights (e.g., more malaria drugs sold during rainy season).
* **Exports**
  * Annual Report downloadable for management/government reporting.

# 📌 Quick Access Control Table

| Feature                          | Admin |           Pharmacist          |
| -------------------------------- | :---: | :---------------------------: |
| Add staff / manage roles         |   ✅   |               ❌               |
| Add/update/delete drugs          |   ✅   | ❌ (can only update stock qty) |
| View all drugs                   |   ✅   |               ✅               |
| Categorize drugs                 |   ✅   |               ❌               |
| Handle stock updates             |   ✅   |               ✅               |
| Flag expired drugs               |   ✅   |         ✅ (mark only)         |
| Create sale + receipt            |   ❌   |               ✅               |
| View sales history               |   ✅   |               ✅               |
| Generate sales reports           |   ✅   |               ❌               |
| Export reports (PDF/Excel/CSV)   |   ✅   |               ❌               |
| View analytics (charts, revenue) |   ✅   |               ❌               |
| Notifications (expiry/stock)     |   ✅   |               ✅               |
| Manage notification thresholds   |   ✅   |               ❌               |
| Pharmacy system settings         |   ✅   |               ❌               |

---

✅ With this split:
* **Admins** = strategic control → manage staff, full drug inventory, reports, analytics, rules.
* **Pharmacists** = operational tasks → selling, updating stock, handling prescriptions, seeing alerts.

************backend functionalities**********
### 🔑 **Authentication & Authorization**
* [ ] Register new user (Admin creates Pharmacist accounts).

### 💊 **Drug Inventory Management**
* [ ] Get single drug (by ID).
* [ ] Search drugs by name or category.
* [ ] Track stock levels (get low-stock items).
* [ ] Flag near-expiry drugs.
* [ ] Auto-disable expired drugs (cannot be sold).

### 💵 **Sales & Billing**
* [ ] Print/return receipt data (for PDF or thermal printer).
* [ ] Get sales history (filter by date, staff, drug).

### 📊 **Reports & Analytics**
* [ ] Get daily sales report.
* [ ] Compare current vs past sales.
* [ ] Export reports (PDF, Excel, CSV).

### 👩‍⚕️ **Staff Management (Admin only)**
* [ ] Add staff (pharmacist).

### 🔔 **Notifications**
* [ ] Trigger alert when drug is below stock threshold.
* [ ] Trigger alert when drug is near expiry.
* [ ] Prevent sale of expired drugs (business logic check).
* [ ] Fetch all notifications for dashboard.
* [ ] Mark notification as read/dismissed.

### ⚙️ **General Utilities**
* [ ] Dark mode preference (save per user in DB).
* [ ] Audit logs (optional: track who added/edited drugs or made sales).
* [ ] Backup/export database (optional for Admin).

# 📌 Summary of Endpoints You’ll Likely Need
* **Auth** → `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/profile`, `/auth/change-password`
* **Notifications** → `/notifications`, `/notifications/:id/read`

# 📌 Pharmacist Sidebar (Dashboard)
### 1. **Dashboard (Default Page ✅)**
  * 🔹 *Near-expiry drugs count*

### 2. **Sales**
* Search drugs by name/category/barcode.

### 3. **Stock Management**
* Mark near-expiry drugs.
* Auto-flag expired items (cannot be sold).

### 4. **Sales History**
* Search by date, receipt number, or drug name.

### 5. **Notifications**
* Expiry alerts.
* Low stock alerts (specific to drugs the pharmacist manages).

### 6. **Profile**✅

### 7. **Settings**
* Dark mode toggle.
* Notification preferences.

# 📊 Final Sidebar Menu for Pharmacist

1. **Dashboard (Default Page ✅)**
2. **Sales**
3. **Stock Management**
4. **Sales History**
5. **Notifications**
6. **Profile**
7. **Settings**


# 📌 Pharmacist Dashboard Pages & Content
### 1. **Dashboard (Default Page)**
* Quick overview of **pharmacist’s daily activities**.
* Key widgets:

  * 📊 *Today’s Sales Summary* (total sales amount, number of transactions).
  * 💊 *Low Stock Drugs* (list of drugs running out soon).
  * ⏳ *Near Expiry Drugs* (items flagged for expiry).
  * 🏆 *Most Sold Drug Today*.
* Simple charts: today vs yesterday’s sales.

### 2. **Sales Page**
* Main selling interface.
* Features:
  * 🔍 *Search box* (by drug name, category, or barcode).
  * 🛒 *Cart system* – add selected drugs.
  * ➕ *Prescription Handling* – attach notes or upload prescriptions.
  * 💵 *Billing & Payment* – calculate totals, apply discounts (if allowed).
  * 🖨️ *Generate Receipt/Ticket*.

### 3. **Stock Management**
* Manage inventory at the pharmacist level.
* Features:
  * ✏️ Update stock quantities when new supplies arrive.
  * ⚠️ Mark items as near-expiry.
  * ❌ Auto-flag expired drugs (cannot be sold).
  * 📑 View batch details (expiry date, supplier info).

### 4. **Sales History**
* Lookup past transactions by this pharmacist.
* Features:
  * 📅 Filter by date, time, or receipt number.
  * 🧾 View details: drugs sold, quantities, total price, payment type.
  * 🔄 Option to reprint receipts.

### 5. **Notifications**
* System alerts relevant to pharmacist.
* Types of notifications:
  * ⚠️ *Drugs near expiry*.
  * 📉 *Stock running low*.
  * 🔔 *System messages* (if admin sends announcements).

### 6. **Profile Page**
* Personal information page.
* Features:
  * 🔑 Change password option.

### 7. **Settings**
* Personal preferences for pharmacist.
* Features:
  * 🌙 Dark mode toggle.
  * 🔔 Notification preferences (email / dashboard only).
  * 💻 Account security (2FA if implemented).

# ✅ Summary
* **Default page:** Dashboard → Quick stats & alerts.
* **Sales Page:** Handle transactions & receipts.
* **Stock Management:** Update and manage inventory.
* **Sales History:** View past transactions.
* **Notifications:** Alerts for expiry & stock.
* **Profile:** Personal details & password.
* **Settings:** Preferences & dark mode.
