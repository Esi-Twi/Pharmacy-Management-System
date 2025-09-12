// ---------------------user model--------------------------
// 	"staffs": [
// 		{
// 			"status": "Active",
// 			"deleted": false,
// 			"_id": "68c22f3e46f7d26e6774900e",
// 			"name": "Admin",
// 			"email": "admin@gmail.com",
// 			"role": "Admin",
// 			"verified": false,
// 			"createdAt": "2025-09-11T02:09:02.158Z",
// 			"updatedAt": "2025-09-11T02:09:02.158Z",
// 			"__v": 0
// 		},
// 		{
// 			"status": "Active",
// 			"deleted": false,
// 			"_id": "68c22f5946f7d26e67749011",
// 			"name": "Pharmacist",
// 			"email": "pharmacist@gmail.com",
// 			"role": "Pharmacist",
// 			"verified": false,
// 			"createdAt": "2025-09-11T02:09:29.017Z",
// 			"updatedAt": "2025-09-11T02:09:29.017Z",
// 			"__v": 0
// 		},
// 		{
// 			"_id": "68c2d4c45f0654d2320b1552",
// 			"email": "admin2@gmail.com",
// 			"role": "Admin",
// 			"status": "Active",
// 			"verified": false,
// 			"verificationToken": "589635",
// 			"verificationTokenValidation": "2025-09-12T13:55:16.860Z",
// 			"deleted": false,
// 			"createdAt": "2025-09-11T13:55:16.885Z",
// 			"updatedAt": "2025-09-11T13:55:16.885Z",
// 			"__v": 0
// 		}
// 	]
// }




// ------------------data about drugs modal and view data-------------------------
// # 💊 1. Drug Information to Store in Database

// | Field                     | Description                           | Example                    |
// | ------------------------- | ------------------------------------- | -------------------------- |
// | **Drug ID**               | Unique identifier (auto-generated)    | `DRG00123`                 |
// | **Name**                  | Commercial name of the drug           | *Paracetamol*              |
// | **Category**              | Classification                        | *Painkiller, Antibiotic*   |
// | **Form**                  | Type of drug                          | *Tablet, Syrup, Injection* |
// | **Batch Number**          | Tracking number from supplier         | `BATCH2025-01`             |
// | **Expiry Date**           | When drug becomes invalid             | `2026-03-15`               |
// | **Manufacture Date**      | When produced                         | `2024-03-15`               |
// | **Supplier Info**         | Vendor / supplier name                | *MedSupply Ltd.*           |
// | **Stock Quantity**        | Units available                       | `200`                      |
// | **Reorder Level**         | Minimum stock before restocking alert | `50`                       |
// | **Purchase Price**        | Cost price per unit                   | `$2.00`                    |
// | **Selling Price**         | Price sold to customers               | `$3.50`                    |

// ---

// # 👨‍⚕️ 2. Pharmacist – What They See / Do

// Pharmacists handle **day-to-day stock & sales**, so they see:

// * ✅ **Drug ID, Name, Generic Name, Category, Form, Strength**
// * ✅ **Batch Number, Expiry Date, Manufacture Date**
// * ✅ **Stock Quantity & Reorder Level**
// * ✅ **Selling Price** (to bill customers)
// * ✅ **Prescription Required flag**
// * ✅ **Notes**

// **Can Update:**

// * Stock Quantity (when drugs sold or new stock added).
// * Mark Near Expiry drugs.
// * Record prescriptions during sales.

// **Cannot Update:**

// * Purchase Price.
// * Supplier info.
// * Staff-level analytics (belongs to Admin).

// ---

// # 👨‍💼 3. Admin – What They See / Do

// Admins manage **the business side**, so they see:

// * ✅ Everything Pharmacists can see.
// * ✅ **Purchase Price (for profit margin tracking)**.
// * ✅ **Supplier Info** (for reordering).
// * ✅ **Full Analytics** (most sold drugs, sales trends, profit margins).
// * ✅ **Reorder Reports** (which drugs need reordering).

// **Can Update:**

// * All drug details (name, category, dosage, supplier, prices).
// * Add new drugs.
// * Delete drugs.
// * Manage stock globally.

// # ✅ Summary
// * **Pharmacist = Operations role** → sells drugs, updates stock, flags expiry.
// * **Admin = Management role** → controls full drug database, suppliers, pricing, analytics.


//###--------------**Pharmacist Backend Functionalities**----------------
    // * login
    // * Update info (name, contact).

    // ### 💊 Drug Inventory (Limited Scope)

    // * Update stock levels (e.g., after restock).
    // * Mark drugs as near-expiry.  ***** want to make it an automatic feature
    // * View available drugs.
    // * Search drugs by name/category.

    // ### 💵 Sales & Billing

    // * Create new sale (select drug, quantity, process purchase).
    // * Generate receipt/ticket for each sale.
    // * Store purchase details (drugs sold, quantities, price, total).
    // * Reduce stock automatically after sale.

    // ### 📜 Sales History

    // * View past transactions (filter by date, receipt number, or drug).
    // * Lookup individual receipts.