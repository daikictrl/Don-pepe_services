# Don Pépé Services - Admin Dashboard Guide

## 🔐 How to Access the Admin Panel

### Method 1: Direct URL
Open your browser and navigate to:
```
http://localhost:3000/admin/login
```

### Method 2: From the Footer
Scroll down to the bottom of any page on the website and click on **"Admin"** in the Quick Links section.

### Method 3: Type the URL
In your browser's address bar, type:
```
/admin/login
```

## 👤 Login Credentials

**Email:** `admin@donpepe.com`  
**Password:** `admin123`

> ⚠️ **Note:** These are demo credentials. In production, you should implement proper authentication with a secure backend.

## 🎯 Admin Panel Features

Once logged in, you'll have access to the following sections:

### 1. Dashboard (`/admin/dashboard`)
- Overview of all listings
- Quick statistics (Cars, Properties, Services, Messages, Users)
- Quick action buttons
- System status
- Recent activity

### 2. Luxury Cars (`/admin/cars`)
- View all car listings
- Add new cars with multiple images (4-6 per car)
- Edit existing car details
- Delete cars
- Upload images and auto-assign to folders

### 3. Luxury Properties (`/admin/properties`)
- Manage property listings
- Add/edit/delete properties
- View property details (beds, baths, sqft, description)

### 4. Concierge Services (`/admin/concierge`)
- Manage concierge service offerings
- Add/edit/delete services
- Update descriptions

### 5. Client Messages (`/admin/messages`)
- View all customer inquiries
- Reply via WhatsApp or Email
- Delete messages
- Quick response options

### 6. User Management (`/admin/users`)
- Manage admin accounts
- Add/edit/delete users
- Toggle user status (active/inactive)

### 7. Settings (`/admin/settings`)
- Site configuration
- Theme colors
- Logo upload
- Default language
- Contact information
- Dark/light mode toggle

## 🎨 Navigation Features

### Sidebar Navigation
The left sidebar provides quick access to all sections:
- **Dashboard** - Overview
- **Cars** - Vehicle management
- **Properties** - Property management
- **Concierge** - Service management
- **Messages** - Customer inquiries
- **Users** - Admin management
- **Settings** - Site configuration
- **Logout** - Sign out
- **View Website** - Return to public site

### Quick Actions
On the dashboard, you'll find quick action buttons to:
- Add New Car
- Add Property
- Add Service
- Add Admin

## 🔄 Working Features

✅ **Fully Functional:**
- Login/logout authentication
- Protected routes
- Dashboard overview
- CRUD operations for Cars, Properties, Concierge, Messages
- User management
- Settings management
- Responsive design
- Dark theme
- Smooth animations
- Navigation between public and admin sites

## 🔗 Navigation Flow

```
Public Website → Admin Login → Dashboard
                      ↓
              [All Admin Sections]
                      ↓
            View Website → Public Site
```

## 🚀 Quick Start

1. **Start the development server:**
   ```powershell
   npm run dev
   ```

2. **Access the admin panel:**
   - Go to `http://localhost:3000/admin/login`
   - Enter credentials: `admin@donpepe.com` / `admin123`
   - Click "Sign In"

3. **Navigate the dashboard:**
   - Use the sidebar to access different sections
   - Use quick action buttons for common tasks
   - Manage content easily

## 📝 Important Notes

- **Authentication:** Currently using mock authentication. For production, implement a secure backend with proper encryption.
- **Data Storage:** Changes are currently stored in component state. Implement backend integration for persistence.
- **Image Upload:** File upload UI is ready but needs backend integration for actual file storage.
- **WhatsApp/Gmail Integration:** Reply buttons open mailto/whatsapp links. For automation, integrate APIs.

## 🛠️ Customization

All colors, fonts, and styling match the main website's luxury aesthetic:
- **Colors:** Gold (#d4af37), Purple (#6b46c1), Dark (#0a0a0a)
- **Fonts:** Playfair Display (serif), Montserrat (sans-serif)
- **Theme:** Dark mode default with smooth transitions

## 🔒 Security Recommendations

For production deployment:
1. Implement proper JWT or session-based authentication
2. Add role-based access control (RBAC)
3. Use environment variables for sensitive data
4. Implement CSRF protection
5. Add rate limiting
6. Use HTTPS for all connections
7. Implement audit logging

---

**Ready to manage your luxury platform!** 🎩✨




