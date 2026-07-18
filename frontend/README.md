# Excellence ITI College & MIS Portal 🎓

A complete, full-stack web application built for an Industrial Training Institute (ITI). It features a premium public-facing website and a powerful Management Information System (MIS) with dedicated dashboards for both Administrators and Students.

## 🚀 Live Demo
*(Deployed on Vercel)*

## 🛠️ Technology Stack
- **Frontend:** HTML5, Tailwind CSS (via CDN), Vanilla JavaScript, FontAwesome
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Hosted on Neon Serverless)
- **ORM:** Prisma
- **Hosting/Deployment:** Vercel

## ✨ Key Features

### 1. Public Website
- **Modern UI/UX:** Built with Tailwind CSS featuring glassmorphism, dynamic animations, and a responsive mobile-first design.
- **Pages:** Home, About Us, Trades/Courses, Admissions, Facilities, Faculty, Gallery, Contact, and Notice Board.
- **Dynamic Contact Form & Admissions:** Forms send data directly to the PostgreSQL database.

### 2. Admin Dashboard (MIS)
- **Admission Management:** View new admission requests in a data table.
- **Student Accounts:** Create and manage student portal login credentials.
- **Notice Board System:** Publish new notices (Urgent/General) that instantly reflect on the public site and student dashboard.
- **Study Materials:** Upload and organize academic resources for students.
- **Contact Messages:** View and resolve messages sent from the public Contact page (features a "Mark Resolved" status).

### 3. Student Dashboard
- **Academic Overview:** View personalized Attendance status, Fee status, and past Semester Results.
- **Live Notices:** Get real-time updates and important alerts from the college.
- **Study Material Vault:** Download notes, PDFs, and assignments uploaded by the faculty.
- **Student Corner:** Quick access to the Academic Calendar, Time Tables, and Examination Results.

## ⚙️ How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- A [Neon](https://neon.tech/) PostgreSQL database URL

### Step 1: Clone & Install Dependencies
\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd <repo-folder>

# Install backend dependencies
cd backend
npm install
\`\`\`

### Step 2: Database Setup
Create a \`.env\` file inside the \`backend\` folder and add your Neon Database URL:
\`\`\`env
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
\`\`\`

Sync the Prisma schema with your database:
\`\`\`bash
npx prisma db push
\`\`\`

### Step 3: Seed Admin Account
To create the default Admin login credentials, run the seed script:
\`\`\`bash
node seed_admin.js
\`\`\`
*This will create an admin account with Email: **admin@iti.edu** and Password: **admin***

### Step 4: Start the Server
\`\`\`bash
node server.js
# The server will start on http://localhost:3000
\`\`\`

## 🔐 Default Login Credentials

**Admin Portal:**
- **Email:** \`admin@iti.edu\`
- **Password:** \`admin\`

**Student Portal:**
- Students must use the credentials created for them by the Admin inside the "Student Accounts" section of the Admin Dashboard.

## 📱 Mobile Responsiveness
The entire platform is fully responsive. It features custom-built off-canvas mobile sidebars and hamburger menus for seamless navigation on small devices.

---
*Built with ❤️ for Excellence ITI.*