# Complete Page Index - HRMS + IEMS System

## 🎯 Quick Navigation Map

### Public Pages (No Authentication Required)
| Page | Path | Purpose |
|------|------|---------|
| Homepage | `/` | Landing page with features and CTA |
| About Us | `/about` | Company information and team |
| Contact | `/contact` | Contact form and company details |
| Careers Portal | `/careers` | Browse open positions |
| Job Details | `/careers/[id]` | View specific job description |
| Apply Form | `/careers/apply` | Multi-step job application |
| Login | `/login` | Role-based login page |

---

## 🔐 Authenticated Pages (Role-Based Access)

### Dashboard Navigation
After login, all users access `/dashboard` with role-specific options.

---

## 📊 RECRUITMENT MANAGEMENT SYSTEM (RMS)

### Jobs Module
```
/dashboard/jobs                    # Job listings with filters
├── Features:
│   ├── Create new jobs
│   ├── Filter by: Department, Location, Status, Date Range
│   ├── Search functionality
│   ├── Duplicate job option
│   ├── Status management (Active, Closed, On Hold)
│   └── Statistics overview

/dashboard/jobs/new                # Job creation form
├── Fields:
│   ├── Job Title (required)
│   ├── Department (required)
│   ├── Location (required)
│   ├── Job Type (Full-time, Part-time, Contract)
│   ├── Experience Level
│   ├── Salary Range
│   ├── Job Description
│   ├── Required Skills (multi-select)
│   ├── Application Deadline
│   └── Status
```

### Candidates Module
```
/dashboard/candidates              # Candidate listing and management
├── Features:
│   ├── Advanced filters:
│   │   ├── Education
│   │   ├── Experience (0-1, 1-3, 3-5, 5-10, 10+ years)
│   │   ├── Skills
│   │   ├── Location
│   │   ├── Salary expectation
│   │   ├── Notice period
│   │   └── Status
│   ├── Search by name/email
│   ├── Star rating system
│   ├── Quick actions (email, call, notes)
│   └── Bulk operations

/dashboard/candidates/upload       # Resume upload & AI parsing
├── Features:
│   ├── Drag-and-drop upload
│   ├── File validation
│   ├── AI parsing simulation
│   ├── Confidence percentage display
│   ├── Auto-extract fields:
│   │   ├── Full name
│   │   ├── Email
│   │   ├── Phone
│   │   ├── Location
│   │   ├── Skills
│   │   ├── Experience
│   │   └── Education
│   ├── Preview extracted data
│   └── Save to database

/dashboard/candidates/[id]         # Candidate profile
├── Sections:
│   ├── Personal Information
│   ├── Education Timeline
│   ├── Work Experience Timeline
│   ├── Skills & Endorsements
│   ├── Application History
│   ├── Internal Notes
│   ├── Rating System (1-5 stars)
│   └── Action buttons
```

### Applications Module
```
/dashboard/applications            # Applications listing view
├── Features:
│   ├── Filter by job, status, date range
│   ├── Search by candidate name
│   ├── Sort by date, status
│   └── Quick actions

/dashboard/applications/kanban     # Kanban board view
├── 8 Status Columns:
│   ├── Applied (New applications)
│   ├── Under Review
│   ├── Shortlisted
│   ├── Interview Scheduled
│   ├── Interview Completed
│   ├── Offer Extended
│   ├── Hired
│   └── Rejected
├── Features:
│   ├── Drag-and-drop between stages
│   ├── See candidate preview on hover
│   ├── Click for full details
│   ├── Add notes to applications
│   ├── Assign to recruiter
│   ├── View application timeline
│   └── Status change history

/dashboard/applications/[id]       # Application detail
├── Information:
│   ├── Candidate details
│   ├── Job details
│   ├── Application timeline
│   ├── Status progression
│   ├── Current stage
│   ├── Recruiter notes
│   ├── Attached documents
│   ├── Communication history
│   └── Action buttons (change status, send email, schedule interview)
```

### Interview Module
```
/dashboard/interviews              # Interview listing
├── Features:
│   ├── View all interviews
│   ├── Filter by date, status, type
│   ├── Search by candidate name
│   └── Quick actions

/dashboard/interviews/calendar     # Interactive calendar
├── Features:
│   ├── Month/Week/Day view
│   ├── View scheduled interviews
│   ├── Schedule new interview button
│   ├── See interviewer, time, type
│   ├── View interview feedback
│   └── Reschedule/Cancel options
├── Schedule Form:
│   ├── Select candidate
│   ├── Select job
│   ├── Interview type dropdown:
│   │   ├── Technical
│   │   ├── Behavioral
│   │   ├── HR Round
│   │   └── Final Round
│   ├── Interview mode:
│   │   ├── Online (generates video link)
│   │   └── Office (office location)
│   ├── Date & time picker
│   ├── Select interviewer
│   ├── Reminder notifications
│   └── Submit

/dashboard/interviews/schedule     # Interview scheduling
├── Form Fields:
│   ├── Candidate selection
│   ├── Job selection
│   ├── Interview type
│   ├── Date/time picker
│   ├── Interviewer selection
│   ├── Interview mode (Online/Office)
│   ├── Generate video call link (if online)
│   └── Send calendar invite

/dashboard/interviews/[id]         # Interview feedback
├── Sections:
│   ├── Interview details
│   ├── Rating system (1-5 stars):
│   │   ├── Technical skills
│   │   ├── Communication
│   │   ├── Problem solving
│   │   ├── Cultural fit
│   │   └── Overall rating
│   ├── Detailed feedback textarea
│   ├── Comments/observations
│   ├── Recommendation (Hire/Reject/Maybe)
│   ├── Status (Scheduled/Completed/Cancelled)
│   └── Submit button
```

### Communication Module
```
/dashboard/communications/email    # Email templates & sending
├── Features:
│   ├── Pre-built templates:
│   │   ├── Interview Invitation
│   │   ├── Rejection Letter
│   │   ├── Offer Letter
│   │   └── Custom templates
│   ├── Template preview modal
│   ├── Edit templates
│   ├── Variable insertion: {{candidateName}}, {{jobTitle}}, etc.
├── Bulk Send:
│   ├── Select template
│   ├── Choose recipients (single or multiple)
│   ├── Subject line
│   ├── Email body
│   ├── Preview before send
│   ├── Send status tracking
│   └── Delivery confirmation
├── Email History:
│   ├── View sent emails
│   ├── Recipient list
│   ├── Sent date
│   ├── Delivery status
│   └── Open rate tracking
```

### RMS Analytics & Reporting
```
/dashboard/rms-reports             # RMS Analytics Dashboard
├── Key Metrics:
│   ├── Total Applications
│   ├── Active Jobs
│   ├── Hired This Month
│   ├── Average Time to Hire
│   ├── Conversion Rate (%)
│   └── Open Positions
├── Charts & Analytics:
│   ├── Applications by Status (pie chart)
│   ├── 6-month Applications trend
│   ├── Applications by Job (bar chart)
│   ├── Applications by Source
│   ├── Recruiter Performance metrics
│   ├── Hiring funnel
│   └── Department-wise hiring
├── Reports:
│   ├── By Date Range
│   ├── By Department
│   ├── By Recruiter
│   ├── By Job
│   └── By Source
├── Export Options:
│   ├── Download as CSV
│   ├── Download as PDF
│   └── Print friendly view
```

---

## 💰 INCOME & EXPENSE MANAGEMENT SYSTEM (IEMS)

### Finance Dashboard
```
/dashboard/finance/dashboard       # Finance Overview
├── Key Metrics Cards:
│   ├── Current Month Income
│   ├── Current Month Expense
│   ├── Net Profit/Loss
│   ├── Budget Remaining
│   ├── Expense Ratio
│   └── Income Growth %
├── Charts:
│   ├── Income vs Expense (6-month trend)
│   ├── Expense breakdown by category
│   ├── Income by source
│   └── Budget utilization
├── Recent Transactions:
│   ├── Latest income entries
│   ├── Latest expense entries
│   └── Quick actions (view, edit)
├── Tabs:
│   ├── Overview
│   ├── Income
│   ├── Expense
│   └── Budget
```

### Income Management
```
/dashboard/finance/income          # Income Management
├── Metrics:
│   ├── Total Approved Income
│   ├── Pending Approval Amount
│   ├── Total Transactions
│   └── Month-over-month growth
├── Add Income Form:
│   ├── Amount (required)
│   ├── Date (required)
│   ├── Category
│   ├── Payment Method dropdown:
│   │   ├── Bank Transfer
│   │   ├── Credit Card
│   │   ├── Check
│   │   └── Cash
│   ├── Client Name (required)
│   ├── Invoice Number
│   └── Description
├── Income Transaction List:
│   ├── Date
│   ├── Client Name
│   ├── Category
│   ├── Amount
│   ├── Payment Method
│   ├── Status (Pending/Approved/Rejected)
│   └── Actions (Approve/Reject/View)
├── Status Workflow:
│   ├── New entries: Pending
│   ├── Manager reviews and Approves/Rejects
│   ├── Status badge color coding
│   └── Audit trail
```

### Expense Management
```
/dashboard/finance/expenses        # Expense Management
├── Metrics:
│   ├── Total Approved Expenses
│   ├── Pending Approval Amount
│   ├── Total Transactions
│   └── Expense Ratio %
├── Add Expense Form:
│   ├── Amount (required)
│   ├── Date (required)
│   ├── Category dropdown:
│   │   ├── Office Supplies
│   │   ├── Software
│   │   ├── Travel & Meals
│   │   ├── Utilities
│   │   └── Other
│   ├── Vendor Name (required)
│   └── Description
├── Budget vs Actual Tracking:
│   ├── Category-wise budgets
│   ├── Spent vs Budget comparison
│   ├── Progress bar with color coding:
│   │   ├── Green: Under budget
│   │   └── Red: Over budget
│   ├── Percentage used
│   ├── Budget alerts (visual warning if exceeded)
│   └── Remaining budget
├── Expense Transaction List:
│   ├── Date
│   ├── Vendor
│   ├── Category
│   ├── Amount
│   ├── Status (Pending/Approved/Rejected)
│   └── Actions (Approve/Reject/View)
```

### Payroll Management
```
/dashboard/finance/payroll         # Payroll Management
├── Employee List:
│   ├── Employee name
│   ├── Employee ID
│   ├── Designation
│   ├── Department
│   ├── Base Salary
│   ├── Bonus
│   ├── Deductions
│   ├── Net Salary
│   ├── Pay Status (Paid/Pending)
│   └── Last Paid Date
├── Payroll Processing:
│   ├── Select pay period
│   ├── Bulk process payroll
│   ├── View individual payslips
│   ├── Generate PDF payslips
│   ├── Email payslips to employees
│   └── Approve payroll
├── Payroll History:
│   ├── View past payroll runs
│   ├── Filter by date range
│   ├── Export payroll records
│   └── Compliance reports
```

### Financial Reports
```
/dashboard/finance/reports         # Financial Reports
├── Report Type Selection:
│   ├── Income Statement
│   ├── Expense Statement
│   └── Profit & Loss (P&L)
├── Date Range Selection:
│   ├── Start date picker
│   ├── End date picker
│   └── Preset ranges (This month, Last 3 months, Year to date, etc.)
├── Income Statement:
│   ├── Revenue by source
│   ├── Total income
│   ├── Breakdown by category
│   └── Revenue growth metrics
├── Expense Statement:
│   ├── Operating expenses breakdown
│   ├── Expenses by category
│   ├── Total expenses
│   └── Expense trends
├── Profit & Loss Statement:
│   ├── Total Revenue
│   ├── Total Expenses
│   ├── Net Profit/Loss
│   ├── Profit Margin %
│   ├── Expense Ratio
│   └── Visual indicators (Green for profit, Red for loss)
├── Financial Summary Table:
│   ├── Metric | Amount | Percentage
│   ├── Total Income | ₹X | 100%
│   ├── Total Expenses | ₹Y | Z%
│   └── Net Profit | ₹Z | %
├── Export Options:
│   ├── Download as PDF
│   ├── Download as CSV
│   └── Print report
```

### Finance Settings (Optional)
```
/dashboard/finance/settings        # Finance Configuration
├── Budget Settings:
│   ├── Set category budgets
│   ├── Set monthly/quarterly budgets
│   ├── Alert thresholds
│   └── Budget fiscal year settings
├── Approval Workflows:
│   ├── Set approval levels
│   ├── Required approvers by amount
│   └── Notification settings
├── Reports:
│   ├── Automated report generation
│   ├── Report distribution list
│   └── Report frequency
```

---

## 🌐 GENERAL PAGES

### Dashboard Modules
```
/dashboard                         # Main Dashboard Hub
├── Quick Stats Overview
├── Recent Activity
├── Navigation to all modules
├── Role-specific dashboard customization
├── User profile access
└── Settings link

/dashboard/settings                # Settings & Configuration
├── User Profile:
│   ├── Edit profile information
│   ├── Change password
│   ├── Upload profile picture
│   └── Notification preferences
├── Dashboard Preferences:
│   ├── Layout options
│   ├── Theme (Light/Dark)
│   ├── Default module on login
│   └── Language selection
├── Security:
│   ├── Two-factor authentication
│   ├── Session management
│   ├── API keys (for integrations)
│   └── Activity log
├── Integrations:
│   ├── Connected services
│   ├── API configuration
│   └── Webhook settings
```

### General Reports
```
/dashboard/reports                 # General Reports Hub
├── Available Reports:
│   ├── RMS Reports (hiring, recruitment)
│   ├── Finance Reports (P&L, budget)
│   ├── HR Reports (attendance, payroll)
│   └── Custom reports
├── Report Builder:
│   ├── Select report type
│   ├── Choose metrics/dimensions
│   ├── Set filters
│   ├── Date range
│   └── Export options
├── Scheduled Reports:
│   ├── Set up automated reports
│   ├── Distribution list
│   ├── Report frequency
│   └── Delivery method (email, portal)
```

---

## 🎯 PUBLIC WEBSITE PAGES

### Homepage
```
/                                  # Landing Page
├── Navigation Bar:
│   ├── Logo/Home link
│   ├── About link
│   ├── Services link
│   ├── Contact link
│   ├── Careers link
│   └── Sign In button
├── Hero Section:
│   ├── Headline
│   ├── Subheading
│   ├── CTA buttons
│   └── Background image
├── Features Section:
│   ├── 6 feature cards with icons
│   ├── Feature descriptions
│   └── Learn more links
├── Statistics Section:
│   ├── Key metrics display
│   ├── Companies served
│   ├── Users active
│   └── Transactions processed
├── CTA Banner Section:
│   ├── Compelling message
│   ├── Call-to-action button
│   └── Secondary link
├── Footer:
│   ├── Company info
│   ├── Quick links
│   ├── Social media links
│   ├── Newsletter signup
│   └── Copyright info
```

### About Us
```
/about                             # About Company Page
├── Company Header:
│   ├── Company name/logo
│   ├── Brief description
│   └── Founded year
├── Mission & Vision:
│   ├── Mission statement
│   ├── Vision statement
│   └── Core values (displayed as cards)
├── History Section:
│   ├── Company founding story
│   ├── Key milestones
│   ├── Growth achievements
│   └── Timeline view
├── Team Section:
│   ├── Leadership team members
│   ├── Member name, title, photo
│   ├── Brief bio
│   └── Social links
├── Achievements:
│   ├── Awards & recognitions
│   ├── Industry certifications
│   ├── Client testimonials
│   └── Media mentions
├── Contact CTA:
│   ├── Get in touch button
│   └── Newsletter signup
```

### Contact Us
```
/contact                           # Contact Page
├── Contact Header:
│   ├── Page title
│   └── Brief description
├── Contact Form:
│   ├── Name (required)
│   ├── Email (required)
│   ├── Phone (optional)
│   ├── Subject (required)
│   ├── Message (required)
│   ├── Inquiry type dropdown
│   ├── reCAPTCHA verification
│   └── Submit button
├── Success Message:
│   ├── Thank you message
│   ├── Confirmation email sent message
│   └── Expected response time
├── Company Contact Info:
│   ├── Office address
│   ├── Phone numbers
│   ├── Email address
│   ├── Operating hours
│   └── Map location
├── Social Media Links:
│   ├── LinkedIn
│   ├── Twitter
│   ├── Facebook
│   └── Instagram
├── Office Locations:
│   ├── Multiple office addresses (if applicable)
│   ├── Regional contacts
│   └── Maps embed
```

---

## 🎓 CAREERS PORTAL

### Careers Listing
```
/careers                           # Job Listings Portal
├── Navigation:
│   ├── Company logo/home link
│   ├── Home link
│   ├── Sign In button
│   └── Responsive mobile menu
├── Hero Section:
│   ├── "Join Our Team" headline
│   ├── Call-to-action message
│   ├── Background gradient
│   └── Inspiring tagline
├── Sidebar (Desktop) / Filters (Mobile):
│   ├── Department filter buttons:
│   │   ├── All Departments
│   │   ├── Engineering
│   │   ├── Product
│   │   ├── Design
│   │   ├── Analytics
│   │   └── HR
│   └── Active department highlighting
├── Main Job Listings:
│   ├── Job count display
│   ├── Job cards showing:
│   │   ├── Job title
│   │   ├── Department
│   │   ├── Location with icon
│   │   ├── Job type badge
│   │   ├── Salary (optional)
│   │   └── Apply Now button
│   ├── Grid/List view toggle (optional)
│   ├── Sorting options (by date, relevance)
│   ├── Pagination or infinite scroll
│   └── Empty state if no results
├── Footer:
│   ├── Company info
│   ├── Quick links
│   └── Social media
```

### Job Details
```
/careers/[id]                      # Job Details Page
├── Job Header:
│   ├── Job title (large)
│   ├── Department & Location
│   ├── Job type badge
│   ├── Salary range (if disclosed)
│   └── Application deadline
├── Quick Info:
│   ├── Experience required
│   ├── Employment type
│   ├── Salary range
│   ├── Location
│   ├── Remote/Hybrid option
│   └── Posted date
├── Job Description Section:
│   ├── Role overview
│   ├── Key responsibilities (bulleted list)
│   ├── Required qualifications
│   ├── Preferred qualifications
│   ├── Nice to have skills
│   └── About the team
├── Requirements Section:
│   ├── Education level required
│   ├── Years of experience
│   ├── Required skills (tagged)
│   ├── Technical requirements
│   └── Soft skills needed
├── Responsibilities Section:
│   ├── Day-to-day tasks
│   ├── Key deliverables
│   ├── Reporting structure
│   └── Team interactions
├── Benefits Section:
│   ├── Health insurance
│   ├── Retirement plan
│   ├── Paid time off
│   ├── Remote work options
│   ├── Professional development
│   ├── Wellness programs
│   ├── Other perks
│   └── Benefits description
├── Company Info:
│   ├── About company
│   ├── Company culture
│   ├── Why join us
│   └── Company achievements
├── Application CTA:
│   ├── Large "Apply Now" button
│   ├── Share job link
│   ├── Save job option
│   └── Recommend to friend
├── Back to Jobs:
│   ├── Browse more positions link
│   └── Similar jobs section
```

### Job Application Form
```
/careers/apply                     # Multi-Step Application Form
├── Header:
│   ├── Back to careers link
│   ├── Apply for [Job Title]
│   └── Logo
├── Progress Indicator:
│   ├── Step 1, 2, 3 progress bar
│   ├── Current step highlight
│   └── Completion percentage
├── STEP 1: Personal Information
│   ├── Full Name (required)
│   ├── Email (required)
│   ├── Phone (required)
│   ├── Current Location (required)
│   ├── Visible progress bar
│   ├── Back/Next buttons
│   └── Form validation
├── STEP 2: Experience & Skills
│   ├── Years of Experience (required)
│   │   ├── Dropdown options: 0-1, 1-3, 3-5, 5-10, 10+
│   ├── Education Level (required)
│   ├── Education Details (required)
│   ├── Key Skills (required, comma separated)
│   ├── Work Preference
│   │   ├── On-site
│   │   ├── Remote
│   │   └── Hybrid
│   ├── Additional Qualifications (optional)
│   ├── Back/Next buttons
│   └── Form validation
├── STEP 3: Documents & Expectations
│   ├── Resume Upload (required)
│   │   ├── Drag-and-drop zone
│   │   ├── File browser button
│   │   ├── Supported formats: PDF, DOC, DOCX
│   │   ├── Max file size: 5MB
│   │   └── Upload progress indicator
│   ├── Cover Letter (optional)
│   │   ├── Text area with character count
│   │   └── Rich text editor (optional)
│   ├── Salary Expectation (optional)
│   │   ├── Range input (min-max)
│   │   └── Currency selection
│   ├── Notice Period (optional)
│   │   ├── Dropdown: Immediately, 2 weeks, 1 month, 3 months, 6 months
│   ├── Additional Documents (optional)
│   │   ├── Portfolio link
│   │   ├── GitHub profile
│   │   ├── LinkedIn profile
│   │   └── Other links
│   ├── Terms Agreement (required)
│   │   ├── Checkbox: "I agree to privacy policy and terms"
│   │   └── Links to privacy/terms
│   ├── Back/Submit buttons
│   └── Form validation
├── Submission Confirmation:
│   ├── Success message
│   ├── Application reference number
│   ├── Confirmation email notification
│   ├── What happens next information
│   ├── Timeline (2-3 business days)
│   ├── Back to careers link
│   └── Auto-redirect after 3 seconds
```

---

## 🔑 KEY FEATURES BY LOCATION

| Feature | Location | Status |
|---------|----------|--------|
| Role-Based Access | `/login` | ✅ Implemented |
| Job Management | `/dashboard/jobs` | ✅ Complete |
| Resume Parsing | `/dashboard/candidates/upload` | ✅ Simulated |
| Kanban Board | `/dashboard/applications/kanban` | ✅ Drag-able |
| Interview Calendar | `/dashboard/interviews/calendar` | ✅ Interactive |
| Email Templates | `/dashboard/communications/email` | ✅ Full |
| Income Management | `/dashboard/finance/income` | ✅ Complete |
| Expense Tracking | `/dashboard/finance/expenses` | ✅ With budget |
| Financial Reports | `/dashboard/finance/reports` | ✅ 3 types |
| Career Portal | `/careers` | ✅ Full |
| Job Application | `/careers/apply` | ✅ 3-step |
| RMS Analytics | `/dashboard/rms-reports` | ✅ Complete |
| Finance Dashboard | `/dashboard/finance/dashboard` | ✅ Full |
| Payroll Management | `/dashboard/finance/payroll` | ✅ Basic |

---

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 🎨 Theme Support

All pages support:
- ✅ Light mode
- ✅ Dark mode
- ✅ System preference detection
- ✅ Theme switcher (ready for implementation)

---

## 📊 Total Pages Created

- **Public Pages**: 8
- **Dashboard Pages**: 25+
- **Total Routes**: 35+
- **Responsive Variants**: All pages

---

**Ready to explore? Start with the homepage at `/` or jump to login at `/login`!**
