# Giriraj Hibare - Portfolio

A modern, responsive portfolio website built with Next.js 16, featuring a stunning dark theme with glassmorphism effects, animations, and a complete admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Modern UI/UX** - Dark theme with gradient accents, glassmorphism, and smooth animations
- **Responsive Design** - Optimized for all screen sizes
- **Dynamic Projects** - JSON file-based project showcase with CRUD operations
- **Contact Form** - Functional contact form with JSON file storage
- **Admin Dashboard** - Secure admin panel to manage projects and view messages
- **SEO Optimized** - Full SEO setup with sitemap, robots.txt, and Open Graph tags
- **Authentication** - NextAuth.js protected admin routes

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Data Storage:** JSON files (projects.json, contacts.json)
- **Styling:** Tailwind CSS v4
- **Authentication:** NextAuth.js
- **Animations:** Framer Motion
- **Icons:** React Icons

## 🚀 Quick Start

### Prerequisites
- Node.js 18+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/girirajh/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your values:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_key
   ADMIN_USER=admin
   ADMIN_PASSWORD=your_secure_password
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── public/
│   └── resume/                 # Place your resume PDF here
├── src/
│   ├── app/
│   │   ├── (admin)/dashboard/  # Admin dashboard routes
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # NextAuth routes
│   │   │   ├── contact/        # Contact form API
│   │   │   └── projects/       # Projects CRUD API
│   │   ├── auth/               # Auth pages
│   │   ├── layout.js           # Root layout with SEO
│   │   ├── page.js             # Homepage
│   │   ├── sitemap.js          # Dynamic sitemap
│   │   └── robots.js           # Robots.txt config
│   ├── components/
│   │   ├── AdminPanel.js       # Add project form
│   │   ├── Contact.js          # Contact section
│   │   ├── Footer.js           # Footer section
│   │   ├── Hero.js             # Hero section
│   │   ├── MessagesManager.js  # Admin messages view
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── ProjectCard.js      # Project card component
│   │   ├── Projects.js         # Projects section
│   │   ├── ProjectsManager.js  # Admin projects CRUD
│   │   └── TechStack.js        # Skills section
│   ├── lib/
│   │   ├── contacts.ts         # Contact form data management
│   │   └── projects.ts         # Projects data management
│   └── data/
│       ├── contacts.json       # Contact messages storage
│       └── projects.json       # Projects data storage
```

## 🔐 Admin Access

1. Navigate to `/auth/signin`
2. Login with your admin credentials (set in `.env`)
3. Access the dashboard at `/dashboard`

### Admin Features
- **Add Projects:** `/dashboard`
- **Manage Projects:** `/dashboard/projects` (Edit/Delete)
- **View Messages:** `/dashboard/messages`

## 📌 Customization

### Update Personal Info
Update your information in these files:
- `src/components/Hero.js` - Name, tagline, social links
- `src/components/Contact.js` - Email, location, social links
- `src/components/Footer.js` - Social links
- `src/app/layout.js` - SEO metadata

### Add Your Resume
Place your resume PDF at:
```
public/resume/Giriraj_Hibare_Resume.pdf
```

### Social Links
Update the social media URLs in the components to your actual profiles.

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms
```bash
npm run build
npm start
```

## 📄 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Your site URL | ✅ |
| `NEXTAUTH_SECRET` | Auth secret key | ✅ |
| `ADMIN_USER` | Admin username | ✅ |
| `ADMIN_PASSWORD` | Admin password | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Production URL for SEO | ⚠️ |

## 📝 License

MIT License - feel free to use this for your own portfolio!

---

Built with ❤️ by **Giriraj Hibare**
