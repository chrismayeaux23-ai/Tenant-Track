TenantTrack

TenantTrack is a modern maintenance dispatch and vendor coordination platform for landlords and property managers.

It eliminates the chaos of calls, texts, and spreadsheets by automatically assigning vendors, managing scheduling, and tracking maintenance jobs from request to completion.

🚀 What TenantTrack Solves

Maintenance coordination is one of the most frustrating parts of property management:

Vendors don’t respond
Jobs get lost or delayed
Scheduling is inconsistent
Follow-ups waste hours
No clear system of record

TenantTrack turns this into a simple, automated workflow:

A tenant submits a request (QR code or form)
The best vendor is recommended or assigned
The vendor receives a secure job link
The vendor accepts or proposes a time
The job is scheduled and tracked
Notifications keep everyone in sync
The system escalates if no one responds
🧠 Core Features
⚙️ Smart Vendor Dispatch
Recommend or auto-assign vendors based on performance
Trust score ranking system
Preferred vendor prioritization
Fallback vendor suggestions
🔗 Vendor Magic-Link Portal
Vendors access jobs instantly (no account required)
Accept, decline, or propose new time
Update job status (en route, started, completed)
Add notes and completion details
📅 Scheduling & Calendar
Schedule and reschedule jobs easily
Conflict detection for double-booking
Track workload across properties
⏱ SLA & Escalation
Response deadlines based on urgency
Detect non-responsive vendors automatically
Recommend next-best vendor
Prevent jobs from getting stuck
📊 Dispatch Board
Visual workflow:
Needs Dispatch
Awaiting Response
Scheduled
In Progress
Completed
Prioritize urgent and overdue jobs
Take quick actions directly from the board
🛠 Vendor Management
Track vendor performance over time
Trust scores based on:
reviews
job completion
no-show behavior
📋 Maintenance Tracking
Full lifecycle tracking
Store notes, invoices, materials, and costs
Complete audit trail
🔔 Automated Notifications
Vendor assignment emails
Vendor reminders
Status updates
Tenant notifications
🏠 Tenant Request System
QR code submissions (no app required)
Photo uploads
Status tracking
🧱 Tech Stack

Frontend:

React + TypeScript
Vite
TailwindCSS

Backend:

Node.js + Express
TypeScript
Drizzle ORM

Database:

PostgreSQL

Integrations:

Resend (email notifications)
Stripe (subscriptions)
Object storage (file uploads)
⚡ Getting Started
git clone https://github.com/your-username/tenanttrack.git
cd tenanttrack
npm install
npm run dev
🔐 Environment Variables

Required:

DATABASE_URL
SESSION_SECRET

Email:

RESEND_API_KEY
EMAIL_FROM

Optional:

STRIPE_SECRET_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
🧪 Demo

Email: landlord@test.com
Password: demo123

🚧 Status

TenantTrack is in private beta.

Core dispatch, scheduling, and vendor coordination workflows are implemented and being refined with real user feedback.

🎯 Vision

TenantTrack is evolving into a fully automated maintenance system where:

Vendors are assigned instantly
Scheduling happens automatically
Jobs never fall through the cracks
Landlords stop chasing contractors
📄 License

MIT License

👤 Author

Christopher Mayeaux