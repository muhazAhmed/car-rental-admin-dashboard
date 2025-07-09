# 🚗 Car Rental Admin Dashboard

A modern and clean **Admin Dashboard** to manage a car rental system — built with **Next.js 15 App Router**, **Tailwind CSS**, **Prisma**, and **ShadCN UI**.  
The project is fully modular, type-safe, and production ready.

> ✅ Admin login | 🔄 CRUD for cars | 📦 Modern UI | 🧪 Validations | 🔐 Local auth

---

## ⚙️ Tech Stack

| Layer        | Tech Used                                    |
|--------------|-----------------------------------------------|
| Framework    | Next.js 15 (App Router)                      |
| Styling      | Tailwind CSS, ShadCN UI                      |
| Animations   | Framer Motion                                |
| ORM          | Prisma (with SQLite locally)                 |
| Validation   | Zod                                          |
| Icons        | Lucide React                                 |
| Toasts       | Sonner / Custom Toast handler                |
| Routing      | Next.js API Routes with App Router structure |

---

## ✨ Features

- 🔐 **Admin Login** with cookie-based auth (local)
- 📋 **Car Listing Table**:
  - View, Edit, Delete
  - Tooltips, status badges, ID copy, confirmation modals
- 🛠️ **CRUD Support**
  - Server-side routes with Prisma
  - Zod schema validation on updates
- 🌐 **Responsive UI** with modern glassmorphism effect
- 📊 **Dashboard Cards**
  - Total cars, available/unavailable counts, pending approvals
- ✅ **Type-safe props and APIs**
- 🧪 **Fully structured for production builds**

---

## 📁 Folder Structure

```
car-rental-admin-dashboard/
├── src/
│   ├── app/                  # App routes (Next.js App Router)
│   ├── components/           # UI components
│   ├── lib/                  # Prisma, helpers, utils
│   ├── types/                # TypeScript interfaces
│   └── styles/               # Global styles if any
├── prisma/
│   ├── schema.prisma         # Prisma DB schema
│   ├── seed.ts               # Seeding logic
│   └── dev.db                # Local SQLite database
├── public/
└── README.md
```

---

## 🛠️ Local Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/car-rental-admin-dashboard.git
cd car-rental-admin-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment

Create a `.env` file in the root:

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Setup Local Database (SQLite)

Run the following commands in order:

```bash
rm -rf prisma/migrations
rm prisma/dev.db
npx prisma migrate dev --name init
npx prisma generate
npm run prisma:seed
```

> ✅ This resets and seeds your local database.

### 5. Start Development Server

```bash
npm run dev
```

---

## 🧪 Usage Credentials

- **Username:** `admin`  
- **Password:** `admin123`  

> 🔐 Auth is cookie-based. You can enhance this later with JWT/Auth.js.

---

## 🧱 Key Components & Files

| Path                                  | Purpose                          |
|---------------------------------------|----------------------------------|
| `/app/login/page.tsx`                 | Admin login form                 |
| `/app/dashboard/page.tsx`             | Dashboard overview               |
| `/app/cars/page.tsx`                  | Car listing page                 |
| `/app/api/cars/route.ts`              | Create & list cars (POST, GET)   |
| `/app/api/cars/[id]/route.ts`         | Get, Update, Delete car by ID    |
| `/components/dashboard/ListingTable`  | Car table with action buttons    |
| `/components/ui/*`                    | Reusable input, button, dialog   |
| `/lib/prisma.ts`                      | Prisma client setup              |
| `/lib/helperComponents.tsx`           | Toast and status utils           |
| `/types/props.ts`                     | Component prop types             |

---

## 🚧 Future Enhancements

- Role-based user system
- Pagination & filtering on listings
- Upload car images (Cloudinary/S3)
- Global dark mode toggle
- Export data to CSV
- Multi-language support

---

## 🙋‍♂️ Author

**Muhaz Ahmed**  
Frontend Engineer | MERN Stack Developer  
🔗 [LinkedIn](https://linkedin.com/in/muhazahmed) •

---

## 📜 License

MIT — Free to use, modify, and distribute.

> Built with ❤️ using Next.js, Prisma, and a little frustration 😅