# 💰 Money Manager - Frontend

Professional React-based frontend for the Money Manager application with advanced analytics and monochrome design.

## 🌟 Features

- ✅ Modern React 19 with Vite
- ✅ Professional monochrome (black/white/gray) design
- ✅ Advanced analytics with interactive charts
- ✅ Responsive design for all devices
- ✅ Glassmorphism UI effects
- ✅ Real-time transaction management

## 🚀 Live Demo

**Frontend**: [https://money-manager-frontend.onrender.com](https://money-manager-frontend.onrender.com)

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS 4** - Styling
- **Recharts** - Charts and analytics
- **React Router** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add backend URL to .env
VITE_API_URL=http://localhost:5000

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment (Render)

1. Create a **Static Site** on Render
2. Connect this repository
3. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variable**: `VITE_API_URL=https://your-backend-url.onrender.com`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AdvancedAnalytics.jsx
│   ├── FilterPanel.jsx
│   ├── Navbar.jsx
│   ├── SummarySection.jsx
│   ├── TransactionList.jsx
│   ├── AddTransactionModal.jsx
│   ├── EditTransactionModal.jsx
│   └── Charts/
│       └── IncomeExpenseChart.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   └── Home.jsx
├── services/           # API services
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Design Features

### Monochrome Color Palette
- Professional black, white, and gray theme
- No bright colors for corporate appearance
- Consistent gradient effects

### Components
- **Dashboard**: Financial overview with stats
- **Advanced Analytics**: Pie charts, line charts, top categories
- **Transaction List**: Search, filter, and manage transactions
- **Filter Panel**: Date range and category filters

## 🔧 Environment Variables

```env
VITE_API_URL=https://money-manager-backend-jz8w.onrender.com
```

## 👨‍💻 Author

**Suman** - [@suman-2212](https://github.com/suman-2212)

## 📝 License

MIT License
