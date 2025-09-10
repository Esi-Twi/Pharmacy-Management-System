### -------***routes naming *** -------------
🔑 Auth Routes (/api/auth)
    POST /api/auth/login → login (Admin & Pharmacist) ✅ 
    POST /api/auth/register → create account (Admin only)
    GET /api/auth/profile → get user profile
    PUT /api/auth/change-password → update password

👤 Admin Routes (/api/admin)
Staff Management
    POST /api/admin/staff → add staff
    GET /api/admin/staff → get all staff
    GET /api/admin/staff/:id → get staff by ID
    PUT /api/admin/staff/:id → update staff
    PATCH /api/admin/staff/:id/status → activate/deactivate staff

Drug Management
    POST /api/admin/drugs → add drug
    PUT /api/admin/drugs/:id → update drug
    DELETE /api/admin/drugs/:id → delete drug
    GET /api/admin/drugs → list all drugs
    GET /api/admin/drugs/:id → get single drug

Reports & Analytics
    GET /api/admin/reports/daily
    GET /api/admin/reports/weekly
    GET /api/admin/reports/monthly
    GET /api/admin/reports/most-sold
    GET /api/admin/reports/export/:format → export as pdf, excel, csv

👩‍⚕️ Pharmacist Routes (/api/pharmacist)
    Sales & Billing
    POST /api/pharmacist/sales → create new sale
    GET /api/pharmacist/sales → get all sales (filter by date, drug)
    GET /api/pharmacist/sales/:id → get sale by ID (receipt lookup)

Inventory (Limited)
    PATCH /api/pharmacist/drugs/:id/stock → update stock quantity
    GET /api/pharmacist/drugs/search?name=xxx → search drugs
    GET /api/pharmacist/drugs/available → list available drugs

Sales History
    GET /api/pharmacist/history → get sales history

🔔 General Routes (/api/general) (Both roles)
    GET /api/general/notifications → fetch all notifications
    PATCH /api/general/notifications/:id/read → mark notification as read
    GET /api/general/drugs/near-expiry → list near expiry drugs
    GET /api/general/drugs/low-stock → list low stock drugs



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
-take email password
-check if verified
-check account status
-redirect to approriate dashboard



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
-Staff Management Page – add/edit pharmacists, cashiers, assign roles
-Analytics Page – sales trends, most sold drugs, revenue overview
-Report Page / Export Center – generate reports in PDF/Excel/CSV

*****pharmacist Page
-Sales Page – search/add drugs to cart, generate receipt
-Stock Update Page – update quantities, mark near-expiry
-Sales History Page – lookup previous transactions


------------ **backend functionalities** based on **who performs what**.

---

# 🔑 **Admin Backend Functionalities**

### 👤 Authentication & User Management

* Create staff accounts (pharmacists, cashiers).
* Update staff info (name, role, contact).
* Activate/deactivate staff accounts.
* Assign/revoke roles.

### 💊 Drug Inventory Management

* Add new drugs (with details like price, stock, expiry, category).
* Update drug details (edit name, price, expiry, etc.).
* Delete/disable drugs.
* View all drugs (full inventory).
* Categorize drugs.
* Flag expired/near-expiry drugs.

### 📊 Analytics & Reports

* Generate daily, weekly, and monthly sales reports.
* Export reports (PDF, Excel, CSV).
* View sales trends (charts, revenue overview).
* View most sold drugs.
* Compare sales periods (this month vs last month).

### 🔔 Notifications

* Access all expiry and stock notifications.
* Manage notification rules (e.g., set threshold for low stock alerts).

### ⚙️ System Management

* Update pharmacy settings (branding, logo, etc.).
* View system activity logs (who added drugs, made sales, etc.).

---

# 👩‍⚕️ **Pharmacist Backend Functionalities**

* login
* Update info (name, contact).

### 💊 Drug Inventory (Limited Scope)

* Update stock levels (e.g., after restock).
* Mark drugs as near-expiry.  ***** want to make it an automatic feature
* View available drugs.
* Search drugs by name/category.

### 💵 Sales & Billing

* Create new sale (select drug, quantity, process purchase).
* Generate receipt/ticket for each sale.
* Store purchase details (drugs sold, quantities, price, total).
* Reduce stock automatically after sale.

### 📜 Sales History

* View past transactions (filter by date, receipt number, or drug).
* Lookup individual receipts.

### 🔔 Notifications

* Receive expiry and low-stock alerts.
* Cannot change notification rules (only Admin can).

---

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
* [ ] Login (verify credentials).
* [ ] Generate JWT token on successful login.
* [ ] Role-based middleware → restrict access (Admin vs Pharmacist).
* [ ] update profile info.
* [ ] Logout (invalidate token or remove session).

### 💊 **Drug Inventory Management**
* [ ] Add new drug (name, category, quantity, price, expiry date).
* [ ] Update drug details (edit name, price, expiry, etc.).
* [ ] Delete drug (soft delete recommended to keep history).
* [ ] Get all drugs (paginated list).
* [ ] Get single drug (by ID).
* [ ] Search drugs by name or category.
* [ ] Track stock levels (get low-stock items).
* [ ] Flag near-expiry drugs.
* [ ] Auto-disable expired drugs (cannot be sold).

### 💵 **Sales & Billing**
* [ ] Create new sale (pharmacist selects drugs, quantities).
* [ ] Reduce stock after sale.
* [ ] Generate unique receipt number.
* [ ] Print/return receipt data (for PDF or thermal printer).
* [ ] Store purchase details (drug IDs, qty, price, total, cashier).
* [ ] Get sales history (filter by date, staff, drug).

### 📊 **Reports & Analytics**
* [ ] Get daily sales report.
* [ ] Get weekly sales report.
* [ ] Get monthly sales report.
* [ ] Get revenue summary (total sales, profit margin if needed).
* [ ] Get most sold drugs (for chart visualization).
* [ ] Compare current vs past sales.
* [ ] Export reports (PDF, Excel, CSV).

### 👩‍⚕️ **Staff Management (Admin only)**
* [ ] Add staff (pharmacist).
* [ ] Update staff info (name, contact).
* [ ] Activate/deactivate staff accounts.
* [ ] Get all staff list.
* [ ] Get single staff details.

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
* **Drugs** → `/drugs`, `/drugs/:id`, `/drugs/search`, `/drugs/low-stock`, `/drugs/near-expiry`
* **Sales** → `/sales`, `/sales/:id`, `/sales/history`, `/sales/report/daily|weekly|monthly`, `/sales/most-sold`
* **Staff** → `/staff`, `/staff/:id`, `/staff/activate`, `/staff/deactivate`
* **Notifications** → `/notifications`, `/notifications/:id/read`
* **Reports** → `/reports/export/pdf|excel|csv`

✅ 
