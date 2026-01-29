# Money Manager - Frontend

A modern, responsive web application for managing personal and business finances built with React and Tailwind CSS.

## 🚀 Features

- **Dashboard Analytics**: View income and expenses by week, month, or year
- **Transaction Management**: Add, edit (within 12 hours), and delete transactions
- **Smart Categorization**: Organize transactions by categories and divisions (Personal/Office)
- **Advanced Filtering**: Filter by type, category, division, and date range
- **Visual Reports**: Interactive charts and category-wise breakdowns
- **Responsive Design**: Beautiful glassmorphism UI that works on all devices

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Axios** - API calls
- **date-fns** - Date utilities

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend API URL
VITE_API_URL=http://localhost:5000
```

## 🏃 Running Locally

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variable: `VITE_API_URL=<your-backend-url>`
4. Deploy

### Netlify

1. Push code to GitHub
2. Import repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variable: `VITE_API_URL=<your-backend-url>`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AddTransactionModal.jsx
│   ├── EditTransactionModal.jsx
│   ├── FilterPanel.jsx
│   ├── Navbar.jsx
│   ├── SummarySection.jsx
│   ├── TransactionList.jsx
│   └── Charts/
│       └── IncomeExpenseChart.jsx
├── pages/              # Page components
│   ├── Dashboard.jsx
│   └── Home.jsx
├── services/           # API services
│   └── api.js
├── utils/              # Utility functions
│   ├── constants.js
│   └── dateUtils.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Features Breakdown

### Transaction Management
- Add income/expense with category, division, description, and date
- Edit transactions within 12 hours of creation
- Delete transactions anytime
- View transaction history with filters

### Dashboard
- Switch between weekly, monthly, and yearly views
- Visual charts showing income vs expense trends
- Category-wise pie charts and breakdowns
- Real-time statistics

### Filtering
- Filter by transaction type (income/expense)
- Filter by category
- Filter by division (Personal/Office)
- Filter by custom date range

## 🔗 API Integration

The frontend connects to the backend API. Ensure the backend is running and the `VITE_API_URL` environment variable is set correctly.

## 📄 License

ISC

## 👨‍💻 Author

Created for HCL GUVI Hackathon Round 2
