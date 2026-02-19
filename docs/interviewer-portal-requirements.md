# Interviewer Portal - Requirements Document

## Overview
Build an interviewer portal where interviewers can login/signup, create meetings, and share meeting links with candidates via email.

---

## Features Required

### 1. Authentication System (Login/Signup)
- **Interviewer Registration** (Signup page)
- **Interviewer Login** (Login page)
- **Password Reset** functionality
- **Session management** (JWT or NextAuth.js)

### 2. Meeting Management
- **Create Meeting** with:
  - Meeting title
  - Date & Time
  - Duration
  - Description/Notes
  - Candidate email(s)
- **Unique Meeting URL** generation
- **Meeting Dashboard** to view all scheduled meetings
- **Edit/Delete meetings**

### 3. Email Notifications
- **Send meeting invite** to candidate with:
  - Meeting link
  - Date/Time
  - Interviewer details
- **Reminder emails** (optional)

---

## Necessary Things Required

### 1. Database (MongoDB)
You'll need collections for:

```javascript
// Interviewers Collection
{
  _id: ObjectId,
  name: String,
  email: String,           // unique
  password: String,        // hashed with bcrypt
  company: String,         // optional
  createdAt: Date
}

// Meetings Collection
{
  _id: ObjectId,
  interviewerId: ObjectId, // reference to interviewer
  title: String,
  description: String,
  scheduledAt: Date,       // meeting date & time
  duration: Number,        // in minutes
  meetingUrl: String,      // unique generated URL
  candidateEmail: String,
  candidateName: String,
  status: String,          // 'scheduled', 'completed', 'cancelled'
  createdAt: Date
}
```

### 2. Environment Variables
Add these to your `.env` file:

```env
# MongoDB (you already have this)
MONGODB_URI=your_mongodb_connection_string

# NextAuth Secret (for authentication)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Email (for sending invites) - you already have Outlook configured
OUTLOOK_EMAIL=your-email@outlook.com
OUTLOOK_PASSWORD=your-app-password

# Base URL for meeting links
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 3. NPM Packages Required

```bash
# Authentication
npm install next-auth bcryptjs

# Unique ID generation for meeting URLs
npm install nanoid
# OR
npm install uuid

# Date handling
npm install date-fns

# Email (already installed)
# nodemailer - already in your project
```

### 4. Pages/Routes to Create

| Route | Purpose |
|-------|---------|
| `/interviewer/login` | Login page for interviewers |
| `/interviewer/signup` | Registration page for interviewers |
| `/interviewer/dashboard` | Dashboard to view all meetings |
| `/interviewer/meetings/new` | Create new meeting |
| `/interviewer/meetings/[id]` | View/Edit specific meeting |
| `/meeting/[meetingId]` | Public meeting page for candidates |

### 5. API Routes to Create

| API Route | Method | Purpose |
|-----------|--------|---------|
| `/api/interviewer/signup` | POST | Register new interviewer |
| `/api/interviewer/login` | POST | Login interviewer |
| `/api/meetings` | GET | Get all meetings for logged-in interviewer |
| `/api/meetings` | POST | Create new meeting |
| `/api/meetings/[id]` | GET | Get single meeting |
| `/api/meetings/[id]` | PUT | Update meeting |
| `/api/meetings/[id]` | DELETE | Delete meeting |
| `/api/meetings/[id]/invite` | POST | Send email invite to candidate |

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     INTERVIEWER FLOW                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. Interviewer visits /interviewer/signup                     │
│              ↓                                                  │
│   2. Creates account (name, email, password)                    │
│              ↓                                                  │
│   3. Redirected to /interviewer/login                           │
│              ↓                                                  │
│   4. Logs in with credentials                                   │
│              ↓                                                  │
│   5. Sees Dashboard (/interviewer/dashboard)                    │
│              ↓                                                  │
│   6. Clicks "Create Meeting"                                    │
│              ↓                                                  │
│   7. Fills meeting details + candidate email                    │
│              ↓                                                  │
│   8. System generates unique URL: /meeting/abc123xyz            │
│              ↓                                                  │
│   9. Email sent to candidate with meeting link                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      CANDIDATE FLOW                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. Candidate receives email with meeting link                 │
│              ↓                                                  │
│   2. Clicks link → /meeting/abc123xyz                           │
│              ↓                                                  │
│   3. Sees meeting details (title, time, interviewer info)       │
│              ↓                                                  │
│   4. Joins meeting (if you integrate video calling)             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Optional Enhancements

### Video Calling Integration
If you want actual video meetings:
- **Jitsi Meet** (Free, open-source) - easiest to integrate
- **Daily.co** (Free tier available)
- **Zoom API** (Requires paid plan for API access)
- **Google Meet API**

### Calendar Integration
- Google Calendar API
- Outlook Calendar API

### Additional Features
- SMS reminders (Twilio)
- Meeting recordings
- Interview feedback forms
- Candidate profiles

---

## Folder Structure

```
src/
├── app/
│   ├── interviewer/
│   │   ├── login/
│   │   │   └── page.js
│   │   ├── signup/
│   │   │   └── page.js
│   │   ├── dashboard/
│   │   │   └── page.js
│   │   └── meetings/
│   │       ├── new/
│   │       │   └── page.js
│   │       └── [id]/
│   │           └── page.js
│   ├── meeting/
│   │   └── [meetingId]/
│   │       └── page.js
│   └── api/
│       ├── interviewer/
│       │   ├── signup/
│       │   │   └── route.js
│       │   └── login/
│       │       └── route.js
│       └── meetings/
│           ├── route.js
│           └── [id]/
│               ├── route.js
│               └── invite/
│                   └── route.js
├── lib/
│   ├── interviewers.js    # Interviewer CRUD operations
│   ├── meetings.js        # Meeting CRUD operations
│   └── email.js           # Already exists
└── components/
    └── interviewer/
        ├── LoginForm.js
        ├── SignupForm.js
        ├── MeetingForm.js
        └── MeetingsTable.js
```

---

## Summary - What You Need

| Category | Item | Status |
|----------|------|--------|
| **Database** | MongoDB | ✅ Already have |
| **Auth** | NextAuth.js | ✅ Already have |
| **Email** | Nodemailer + Outlook | ✅ Just configured |
| **Package** | bcryptjs (password hashing) | ⬜ Need to install |
| **Package** | nanoid (unique URLs) | ⬜ Need to install |
| **Package** | date-fns (date formatting) | ⬜ Need to install |
| **Pages** | Login, Signup, Dashboard | ⬜ Need to create |
| **APIs** | CRUD for meetings | ⬜ Need to create |

---

## Next Steps

1. Confirm if you want to build this in your current portfolio project or create a separate project
2. Decide if you need video calling integration
3. I can start building the authentication and meeting system for you

Let me know when you're ready to proceed!
