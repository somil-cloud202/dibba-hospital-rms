# HRMS + IEMS Quick Start Guide

## 🚀 Getting Started

### 1. Installation
```bash
# Clone or download the project
git clone <repo-url>
cd hrms-iems-frontend

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### 2. Access the Application
- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Career Portal**: http://localhost:3000/careers

### 3. Demo Credentials

Use these role selections at the login page:
- **Admin**: Full access to all modules
- **Recruiter**: RMS access (Jobs, Candidates, Applications, Interviews)
- **Finance Manager**: IEMS access (Income, Expense, Payroll, Reports)

---

## 📋 Module Map

### 🎯 Recruitment Management System (RMS)

| Module | URL | Features |
|--------|-----|----------|
| **Job Management** | `/dashboard/jobs` | Create, edit, duplicate jobs; filter by dept/location |
| **Candidates** | `/dashboard/candidates` | Upload resume, parse with AI, manage profile |
| **Applications** | `/dashboard/applications` | Track via Kanban board, 8 status stages |
| **Interviews** | `/dashboard/interviews/calendar` | Schedule, feedback, video calls |
| **Email** | `/dashboard/communications/email` | Templates, bulk send, track delivery |
| **Analytics** | `/dashboard/rms-reports` | KPIs, trends, recruiter performance |

### 💰 Income & Expense Management (IEMS)

| Module | URL | Features |
|--------|-----|----------|
| **Dashboard** | `/dashboard/finance/dashboard` | Overview, charts, recent transactions |
| **Income** | `/dashboard/finance/income` | Add income, approval workflow, tracking |
| **Expenses** | `/dashboard/finance/expenses` | Track expenses, budget limits, approval |
| **Payroll** | `/dashboard/finance/payroll` | Employee payroll, salary management |
| **Reports** | `/dashboard/finance/reports` | P&L, Income statement, Expense statement |

### 🌐 Public Website

| Page | URL | Features |
|------|-----|----------|
| **Homepage** | `/` | Hero, features, statistics, CTA |
| **About** | `/about` | Company info, team, values |
| **Contact** | `/contact` | Contact form, company details |
| **Careers** | `/careers` | Job listings, department filter |
| **Apply** | `/careers/apply` | 3-step application form |

---

## 🎮 Interactive Demo Flows

### Flow 1: Post a Job and Hire Someone
1. Login as **Recruiter**
2. Go to `/dashboard/jobs`
3. Click **+ New Job**
4. Fill form and create job
5. See applications in `/dashboard/applications/kanban`
6. Drag application through stages to hire

### Flow 2: Record Income and Expenses
1. Login as **Finance Manager**
2. Go to `/dashboard/finance/income`
3. Add income entry
4. Go to `/dashboard/finance/expenses`
5. Add expense and see budget tracking
6. View `/dashboard/finance/reports` for P&L

### Flow 3: Schedule an Interview
1. Login as **Recruiter**
2. Go to `/dashboard/interviews/calendar`
3. Click "Schedule Interview"
4. Select date, interviewer, type
5. Video link auto-generates
6. View interview feedback

### Flow 4: Apply for a Job (External)
1. Go to `/careers`
2. Filter jobs by department
3. Click **Apply Now**
4. Fill 3-step form (Personal → Experience → Docs)
5. Submit and get confirmation

---

## 🔑 Key Features to Demo

### ✨ Must-See Features

**1. Kanban Board** (`/dashboard/applications/kanban`)
- Drag and drop applications between stages
- 8 workflow stages from "Applied" to "Hired"
- Real-time status updates

**2. Interview Calendar** (`/dashboard/interviews/calendar`)
- Interactive calendar view
- Schedule multiple interview types
- Video meeting link auto-generation

**3. Resume Parser** (`/dashboard/candidates/upload`)
- Drag-drop resume upload
- Simulated AI parsing
- Auto-fill candidate profile

**4. Financial Reports** (`/dashboard/finance/reports`)
- Switch between Income/Expense/P&L statements
- Date range filtering
- Export to PDF/CSV

**5. Budget Tracking** (`/dashboard/finance/expenses`)
- Real-time budget vs actual
- Visual progress bars
- Budget alerts

---

## 📊 Sample Data

All demo data is pre-loaded from `/lib/dummy-data.ts`:

- **10 Jobs** across 5 departments
- **20 Candidates** with profiles and experience
- **50+ Applications** in various stages
- **15 Interviews** scheduled
- **12 Income Entries** with approval workflow
- **20 Expenses** with budget tracking
- **5 Payroll Records** for employees

---

## 🎨 Customization

### Change Theme Colors
Edit `/app/globals.css` - update CSS variables:
```css
--primary: #10b981;      /* Emerald */
--secondary: #06b6d4;    /* Cyan */
--neutral: #0f172a;      /* Slate */
```

### Update Company Info
Edit `/lib/dummy-data.ts` - modify:
- Company name
- Departments
- Job listings
- Employee names

### Add/Remove Modules
- Add new route in `/app/dashboard/`
- Update sidebar in `/app/dashboard/layout.tsx`
- Add menu items based on role

---

## 🔧 Development Tips

### Component Structure
```
/app/dashboard/
├── layout.tsx          # Layout with sidebar/header
├── page.tsx            # Dashboard home
├── [module]/
│   ├── page.tsx        # Module main page
│   ├── components/     # Module components (optional)
│   └── hooks/          # Module hooks (optional)
```

### Adding New Pages
1. Create folder: `/app/dashboard/new-module/`
2. Add `page.tsx`
3. Update dashboard layout navigation
4. Check role permissions

### State Management
- Using `useState` for simplicity
- Mock data from `dummy-data.ts`
- Ready for Redux/Context API upgrade

### Styling
- Tailwind CSS v4
- Dark mode with `dark:` prefix
- Responsive: `md:`, `lg:`, `xl:` prefixes
- Design tokens in `globals.css`

---

## 🚨 Common Issues & Solutions

### Q: Login not working?
**A:** Make sure you select a role (Admin/Recruiter/Finance Manager) before clicking login.

### Q: Dark mode not showing?
**A:** Check if your system has dark mode enabled. Toggle with system settings or browser dev tools.

### Q: Data not persisting after refresh?
**A:** This is a frontend-only POC. Data is stored in state. For persistence, integrate a backend database.

### Q: Can I export data?
**A:** Export buttons (PDF, CSV) are UI-ready. Requires backend integration for actual export.

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

All pages are fully responsive. Test on different devices!

---

## 🔐 Security Notes

This is a **frontend-only POC**. For production:
- ✅ Add real authentication (OAuth/JWT)
- ✅ Validate all inputs server-side
- ✅ Use HTTPS only
- ✅ Implement rate limiting
- ✅ Add CSRF protection
- ✅ Encrypt sensitive data
- ✅ Implement RLS on database

---

## 📞 Support & Documentation

### Full Documentation
See `IMPLEMENTATION_SUMMARY.md` for complete feature list and architecture.

### Project Structure
```
/
├── app/               # Next.js app directory
├── lib/               # Utilities and mock data
├── public/            # Static files
├── components/        # Reusable components
├── styles/            # Global styles
└── docs/              # Documentation
```

### Key Files
- `IMPLEMENTATION_SUMMARY.md` - Complete feature documentation
- `lib/dummy-data.ts` - All mock data
- `app/globals.css` - Design system and theme
- `app/dashboard/layout.tsx` - Main dashboard layout

---

## 🎯 Next Steps

1. **Explore** all modules by clicking through the sidebar
2. **Try demo flows** listed above
3. **Review code** in corresponding page files
4. **Customize** colors and data in `lib/dummy-data.ts`
5. **Integrate backend** when ready for production

---

## ✅ Deployment Checklist

- [ ] Update company branding
- [ ] Replace dummy data with real data
- [ ] Set up environment variables
- [ ] Configure backend API endpoints
- [ ] Add real authentication
- [ ] Set up database
- [ ] Test all workflows
- [ ] Deploy to production
- [ ] Set up monitoring
- [ ] Add backup system

---

## 📈 Performance Tips

1. Use images wisely (compress before using)
2. Lazy load components for large lists
3. Implement pagination for large datasets
4. Cache API responses appropriately
5. Optimize database queries
6. Use CDN for static assets

---

## 🎓 Learning Resources

- **React**: https://react.dev
- **Next.js**: https://nextjs.org
- **Tailwind CSS**: https://tailwindcss.com
- **TypeScript**: https://typescriptlang.org

---

## 📝 Version History

- **v1.0** - Initial POC with all core features
  - RMS (Jobs, Candidates, Applications, Interviews, Email)
  - IEMS (Income, Expenses, Payroll, Reports)
  - Career Portal with Application Flow
  - Analytics and Reporting

---

## 🎉 You're All Set!

Start the dev server and explore the application. All features are ready to demo and customize!

```bash
pnpm dev
```

Happy building! 🚀
