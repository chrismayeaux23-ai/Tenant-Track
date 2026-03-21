# VendorTrust

VendorTrust is a mobile-first SaaS platform for landlords and property owners to manage maintenance requests via QR codes, coordinate vendor dispatch with trust scoring, and track repair costs — all in one dashboard.

Tenants submit maintenance issues instantly by scanning a QR code. Landlords dispatch trusted vendors, track job status, and manage costs across their entire portfolio.

---

## Product Walkthrough

Watch a quick demo of VendorTrust:

[![VendorTrust Demo](https://img.youtube.com/vi/3Y8qK9X28ko/0.jpg)](https://www.youtube.com/watch?v=3Y8qK9X28ko)

---

## Live Demo

You can explore the platform using the demo credentials below:

Email: landlord@test.com  
Password: demo123

---

## Who VendorTrust Is Built For

Independent landlords and small property management companies who need a simple, powerful system for maintenance coordination and vendor management.

---

## Everything a Landlord Needs

VendorTrust replaces scattered texts, spreadsheets, and sticky notes with one organized maintenance management system featuring vendor trust scores, dispatch coordination, and cost tracking.

---

## Key Features

- **QR Code Maintenance System** — Tenants scan and submit issues in 60 seconds with photos
- **Vendor Trust Scores** — Every contractor rated 0–100 based on job performance
- **Smart Vendor Dispatch** — Assign, schedule, and track vendors per request
- **Proof of Completion** — Capture completion notes, invoices, materials, and final costs
- **Vendor Leaderboard & Analytics** — Performance insights across your vendor network
- **Tenant Request Tracking** — Tenants check status anytime with a tracking code (no app needed)
- **Bilingual Tenant UI** — English/Spanish support for tenant-facing pages
- **Tenant–Landlord Messaging** — Two-way messages tied to each request
- **Staff Assignment** — Assign maintenance requests to team members
- **Recurring Maintenance** — Schedule and track preventive maintenance tasks
- **Cost Tracking & Reports** — Log costs per request, export CSV for accounting
- **Stripe Subscriptions** — Three tiers: Starter ($29), Growth ($59), Pro ($99) with 14-day trial
- **Email Notifications** — Automated alerts via Resend for new requests, status updates, and assignments
- **Mobile-First Design** — Dark theme, responsive layout, works on any device

---

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- TailwindCSS
- Shadcn UI / Radix UI

**Backend**
- Node.js + Express
- TypeScript
- Drizzle ORM

**Database**
- PostgreSQL

**Integrations**
- Stripe (subscription payments)
- Resend (email notifications)
- Replit Object Storage (photo uploads)

---

## Environment Variables

Required:
- `DATABASE_URL` — PostgreSQL connection string
- `SESSION_SECRET` — Session encryption key

Optional:
- `RESEND_API_KEY` — For email notifications
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — For Google OAuth
- `EMAIL_FROM` — Sender address (e.g. `VendorTrust <notifications@vendortrust.com>`)

---

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

---

## Required Services

VendorTrust requires the following services to run:

- Node.js
- PostgreSQL

Optional integrations:

- Stripe (for subscriptions)
- Resend (for email notifications)
- S3-compatible storage for file uploads

---

## Repository Purpose

This repository contains the full source code for the VendorTrust SaaS platform.

---

## License

MIT License

---

## Author

Christopher Mayeaux

VendorTrust was created as a vertical SaaS solution designed to simplify property maintenance management and vendor coordination for independent landlords and property investors.
