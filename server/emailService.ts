import { Resend } from 'resend';

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

const FROM = process.env.EMAIL_FROM || 'TenantTrack <notifications@tenant-track.com>';
const APP_URL = process.env.APP_URL || 'https://www.tenant-track.com';

export async function sendNewRequestEmail(opts: {
  landlordEmail: string;
  landlordName: string;
  tenantName: string;
  propertyName: string;
  unitNumber: string;
  issueType: string;
  urgency: string;
  description: string;
  trackingCode: string;
}) {
  const resend = getResend();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: opts.landlordEmail,
      subject: `🔔 New ${opts.urgency} request: ${opts.issueType} at ${opts.propertyName} Unit ${opts.unitNumber}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f1a12;color:#f0faf2;padding:32px;border-radius:12px">
          <h2 style="color:#4ade80;margin-top:0">New Maintenance Request</h2>
          <p>Hi ${opts.landlordName},</p>
          <p>A tenant submitted a new maintenance request through TenantTrack.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <tr><td style="padding:8px;color:#94a3b8;width:140px">Property</td><td style="padding:8px;color:#f0faf2">${opts.propertyName}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8">Unit</td><td style="padding:8px;color:#f0faf2">${opts.unitNumber}</td></tr>
            <tr><td style="padding:8px;color:#94a3b8">Tenant</td><td style="padding:8px;color:#f0faf2">${opts.tenantName}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8">Issue</td><td style="padding:8px;color:#f0faf2">${opts.issueType}</td></tr>
            <tr><td style="padding:8px;color:#94a3b8">Urgency</td><td style="padding:8px;color:${opts.urgency === 'Emergency' ? '#f87171' : opts.urgency === 'High' ? '#fb923c' : '#4ade80'}">${opts.urgency}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8;vertical-align:top">Description</td><td style="padding:8px;color:#f0faf2">${opts.description}</td></tr>
          </table>
          <p style="color:#94a3b8;font-size:13px">Tracking code: <strong style="color:#4ade80">${opts.trackingCode}</strong></p>
          <a href="${APP_URL}" style="display:inline-block;background:#22c55e;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px">View in Dashboard →</a>
          <p style="color:#4b5563;font-size:12px;margin-top:24px">You're receiving this because you're a TenantTrack landlord. Log in to manage this request.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send new request email:', err);
  }
}

export async function sendStatusUpdateEmail(opts: {
  tenantEmail: string;
  tenantName: string;
  propertyName: string;
  unitNumber: string;
  issueType: string;
  newStatus: string;
  trackingCode: string;
}) {
  const resend = getResend();
  if (!resend) return;
  const statusColor = opts.newStatus === 'Completed' ? '#4ade80' : opts.newStatus === 'In-Progress' ? '#facc15' : '#94a3b8';
  try {
    await resend.emails.send({
      from: FROM,
      to: opts.tenantEmail,
      subject: `Update on your maintenance request — ${opts.newStatus}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f1a12;color:#f0faf2;padding:32px;border-radius:12px">
          <h2 style="color:#4ade80;margin-top:0">Request Status Update</h2>
          <p>Hi ${opts.tenantName},</p>
          <p>Your maintenance request has been updated.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <tr><td style="padding:8px;color:#94a3b8;width:140px">Property</td><td style="padding:8px;color:#f0faf2">${opts.propertyName}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8">Unit</td><td style="padding:8px;color:#f0faf2">${opts.unitNumber}</td></tr>
            <tr><td style="padding:8px;color:#94a3b8">Issue</td><td style="padding:8px;color:#f0faf2">${opts.issueType}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8">New Status</td><td style="padding:8px;color:${statusColor};font-weight:600">${opts.newStatus}</td></tr>
          </table>
          <p style="color:#94a3b8;font-size:13px">Tracking code: <strong style="color:#4ade80">${opts.trackingCode}</strong></p>
          <a href="${APP_URL}/track/${opts.trackingCode}" style="display:inline-block;background:#22c55e;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px">Track Your Request →</a>
          <p style="color:#4b5563;font-size:12px;margin-top:24px">No account needed — use your tracking code to view updates anytime.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send status update email:', err);
  }
}

export async function sendStaffAssignmentEmail(opts: {
  staffEmail: string;
  staffName: string;
  propertyName: string;
  unitNumber: string;
  issueType: string;
  urgency: string;
  description: string;
  tenantName: string;
  tenantPhone: string;
}) {
  const resend = getResend();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: FROM,
      to: opts.staffEmail,
      subject: `🔧 Assigned: ${opts.issueType} at ${opts.propertyName} Unit ${opts.unitNumber}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f1a12;color:#f0faf2;padding:32px;border-radius:12px">
          <h2 style="color:#4ade80;margin-top:0">Maintenance Request Assigned</h2>
          <p>Hi ${opts.staffName},</p>
          <p>A maintenance request has been assigned to you.</p>
          <table style="width:100%;border-collapse:collapse;margin:20px 0">
            <tr><td style="padding:8px;color:#94a3b8;width:140px">Property</td><td style="padding:8px;color:#f0faf2">${opts.propertyName}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8">Unit</td><td style="padding:8px;color:#f0faf2">${opts.unitNumber}</td></tr>
            <tr><td style="padding:8px;color:#94a3b8">Issue</td><td style="padding:8px;color:#f0faf2">${opts.issueType}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8">Urgency</td><td style="padding:8px;color:${opts.urgency === 'Emergency' ? '#f87171' : opts.urgency === 'High' ? '#fb923c' : '#4ade80'}">${opts.urgency}</td></tr>
            <tr><td style="padding:8px;color:#94a3b8;vertical-align:top">Description</td><td style="padding:8px;color:#f0faf2">${opts.description}</td></tr>
            <tr style="background:#1a2e1e"><td style="padding:8px;color:#94a3b8">Tenant</td><td style="padding:8px;color:#f0faf2">${opts.tenantName} — ${opts.tenantPhone}</td></tr>
          </table>
          <a href="${APP_URL}" style="display:inline-block;background:#22c55e;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px">View Details →</a>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send staff assignment email:', err);
  }
}
