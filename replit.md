# TenantTrack

A mobile-first SaaS web app where landlords manage maintenance requests via QR codes.

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (Vite)
- **Backend**: Express.js on port 5000
- **Database**: PostgreSQL via Drizzle ORM
- **Auth**: Replit Auth (landlord login)
- **Storage**: Replit Object Storage (tenant photo uploads)

## Key Features
- Landlords sign up, add properties (each generating a unique QR code)
- Tenants scan QR code to access public form at `/report/:propertyId` (no account needed)
- Tenants can upload up to 3 photos per maintenance request
- Dashboard with status badges (Green=Completed, Red=Emergency, Yellow=In-Progress)
- Printable flyer template at `/flyer/:propertyId` for landlords to post on tenant doors

## File Structure
- `shared/schema.ts` - Drizzle schema (properties, maintenanceRequests tables)
- `shared/models/auth.ts` - Replit Auth schema (users, sessions tables)
- `shared/routes.ts` - Shared route types
- `server/routes.ts` - API routes
- `server/storage.ts` - Storage interface (CRUD)
- `server/db.ts` - Database connection
- `server/replit_integrations/` - Auth + Object Storage integrations
- `client/src/App.tsx` - Routes and app wrapper
- `client/src/pages/` - Landing, Dashboard, Properties, TenantReport, PrintFlyer
- `client/src/components/layout/AppLayout.tsx` - Sidebar layout for landlord pages
- `client/src/hooks/` - Auth, properties, requests, upload hooks

## Routes
- `/` - Landing (unauthenticated) or Dashboard (authenticated)
- `/properties` - Property management (protected)
- `/flyer/:propertyId` - Printable flyer with QR code (protected)
- `/report/:propertyId` - Public tenant maintenance form

## Notes
- Object storage wildcard route uses regex syntax for Express 5 compatibility
- Stripe payments not yet integrated (requires connector setup)
- Logo assets in `attached_assets/` imported via `@assets/` alias
