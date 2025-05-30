# FinPercent - Professional Financial Dashboard

A comprehensive React-based financial management application with advanced features, multiple budgeting methods, and interactive data visualizations.

![FinPercent Dashboard](https://img.shields.io/badge/React-18.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal)

## 🚀 Features

### 📊 **Main Dashboard**
- Interactive financial metrics with real-time data
- Sankey diagram for financial flow visualization
- Professional neomorphic design system
- Dark/Light theme with smooth transitions

### 🔍 **Explore Page**
- **Interactive Tabs**: Features, Tools, Insights
- **Feature Cards**: Status badges (Available, Beta, Coming Soon)
- **Tool Showcase**: User ratings and comprehensive descriptions
- **Call-to-Action**: Professional conversion sections

### 📈 **Advanced Statistics**
- **Time Range Selector**: 7d, 30d, 90d, 1y data views
- **Financial Metrics**: Trend indicators with color coding
- **Expense Breakdown**: Visual category analysis
- **Transaction History**: Expandable recent transactions
- **Financial Health Score**: Comprehensive wellness indicators

### 💡 **Financial Methods**

#### **STOP Method** (Detailed Sub-sections)
- **Savings**  - `/method/stop/savings`
- **Taxes**  - `/method/stop/taxes`  
- **Operations**  - `/method/stop/operations`
- **Profit**  - `/method/stop/profit`

#### **NWS Method** (Detailed Sub-sections)
- **Necessities**  - `/method/nws/necessities`
- **Wants**  - `/method/nws/wants`
- **Savings**  - `/method/nws/savings`

#### **Kakeibo Method**
- Japanese budgeting methodology with detailed tracking

### 🏦 **Advanced Features**
- **Stock Market**: Market analysis and trading interface
- **Investment Pooling**: Collaborative investing features
- **Automated Banking**: Banking automation tools
- **Debt Repayment**: Comprehensive debt management
- **Finring**: Community and social features
- **Super Features**: Advanced platform capabilities

### 👤 **User Management**
- **Profile Page**: User statistics and activity tracking
- **Settings**: Security, notifications, payment methods
- **Company Status**: Business analysis and file upload

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: TailwindCSS with custom neomorphic design
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Charts**: D3.js + d3-sankey for financial visualizations
- **Icons**: Lucide React
- **State Management**: React Context API

## 🎨 Design System

### **Neomorphic UI Components**
- `neo-card`: Soft shadows and 3D depth
- `neo-button`: Interactive button states
- `neo-input`: Inset form controls

### **Glass Morphism Effects**
- `glass-card`: Backdrop blur and transparency
- `glass-button`: Translucent interactive elements

### **Theme System**
- **Light Mode**: Clean, professional appearance
- **Dark Mode**: Easy on the eyes with proper contrast
- **Persistent**: Theme preference saved in localStorage
- **Smooth Transitions**: 300ms duration animations

## 📱 Responsive Design

### **Desktop (≥768px)**
- Organized sidebar navigation with sections
- Theme toggle in header
- Full feature access

### **Mobile (<768px)**
- Bottom navigation bar with 6 key items
- Floating theme toggle button
- Optimized touch interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd finpercent

# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

### Development
```bash
# Start development with hot reload
yarn dev --host 0.0.0.0 --port 3000

# Access at http://localhost:3000
```

### Production
```bash
# Build optimized production version
yarn build

# Serve production build
npx serve dist -l 3000
```

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/SankeyDiagram.tsx      # D3 financial flow visualization
│   ├── details/MethodDetails.tsx     # Method sub-section details
│   ├── Navigation.tsx                # Main navigation component
│   ├── ThemeToggle.tsx              # Dark/light mode toggle
│   └── ui/                          # Reusable UI components
├── contexts/
│   └── ThemeContext.tsx             # Theme state management
├── pages/
│   ├── DashboardPage.tsx            # Main financial dashboard
│   ├── ExplorePage.tsx              # Feature discovery
│   ├── StatsPage.tsx                # Advanced statistics
│   ├── SuperFeaturesPage.tsx        # Advanced features
│   ├── StockMarketPage.tsx          # Market analysis
│   ├── *MethodPage.tsx              # Financial method guides
│   └── ...                         # Additional pages
├── styles/
│   ├── glass.css                    # Glass morphism effects
│   └── neomorphic.css               # Neomorphic design system
├── App.tsx                          # Main application component
├── main.tsx                         # Application entry point
└── index.css                        # Global styles and imports
```

## 🔗 Navigation Structure

### **Main Sections**
- **Dashboard** (`/`) - Financial overview
- **Explore** (`/explore`) - Feature discovery  
- **Stats** (`/stats`) - Advanced analytics

### **Financial Methods**
- **NWS Method** (`/methods/nws`) + sub-sections
- **Kakeibo Method** (`/methods/kakeibo`)
- **STOP Method** (`/methods/stop`) + sub-sections

### **Advanced Features**
- **Super Features** (`/super-features`)
- **Stock Market** (`/stock-market`) 
- **Investment Pooling** (`/investment-pooling`)
- **Automated Banking** (`/automated-banking`)
- **Debt Repayment** (`/debt-repayment`)
- **Finring** (`/finring`)

### **User & Settings**
- **Profile** (`/profile`)
- **Settings** (`/settings`)
- **Company Status** (`/company-status`)

## 🎯 Key Features in Detail

### **Interactive Sub-sections**
Access detailed financial breakdowns:
- `/method/stop/savings` - Savings allocation analysis
- `/method/stop/taxes` - Tax planning breakdown  
- `/method/stop/operations` - Operational expense tracking
- `/method/stop/profit` - Profit distribution analysis
- `/method/nws/necessities` - Essential expense management
- `/method/nws/wants` - Discretionary spending analysis
- `/method/nws/savings` - Savings strategy implementation

Each sub-section includes:
- **Allocation Metrics**: Percentage and dollar amounts
- **Trend Charts**: 6-month historical data
- **Category Breakdowns**: Detailed progress tracking
- **Recommendations**: Actionable financial advice
- **Performance Trends**: Efficiency and growth metrics

### **Theme Management**
- **Context-based**: React Context API for global state
- **Persistent**: localStorage integration
- **Responsive**: Works across all components
- **Smooth**: 300ms transition animations

### **Chart Visualizations**
- **Sankey Diagram**: D3.js financial flow analysis
- **Progress Bars**: Category breakdown visualizations
- **Trend Lines**: Historical performance tracking
- **Interactive Elements**: Hover states and tooltips

## 🔧 Configuration

### **Vite Configuration**
- Host: `0.0.0.0` for network access
- Port: `3000` (configurable)
- HMR: Hot module replacement enabled
- CORS: Enabled for development

### **Styling Configuration**
- **TailwindCSS**: Custom color palette and utilities
- **PostCSS**: Processing pipeline for modern CSS
- **Custom Properties**: CSS variables for theming

## 📦 Dependencies

### **Core**
- `react`: ^18.0.0
- `react-dom`: ^18.0.0  
- `react-router-dom`: ^6.0.0
- `typescript`: ^5.0.0

### **UI & Styling**
- `tailwindcss`: ^3.4.0
- `framer-motion`: ^11.0.0
- `lucide-react`: ^0.400.0

### **Data Visualization**
- `d3`: ^7.0.0
- `d3-sankey`: ^0.12.0

### **Build Tools**
- `vite`: ^5.4.0
- `@vitejs/plugin-react`: ^4.0.0

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design System**: Inspired by modern neomorphic design principles
- **Financial Methods**: Based on established budgeting methodologies
- **Data Visualization**: Powered by D3.js ecosystem
- **UI Components**: Built with accessibility and usability in mind

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**FinPercent** - Transform your financial management with professional-grade tools and insights. 💚
