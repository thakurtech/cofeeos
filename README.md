# CoffeeShopOS ☕

A full-stack coffee shop management application with a stunning cheerful yellow theme, interactive 3D elements, and AI-powered chatbot.

![CoffeeShopOS](https://img.shields.io/badge/CoffeeShopOS-v1.0-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🎨 **Cheerful Yellow Theme**
- **Dark Mode**: Deep purple backgrounds with vibrant yellow/pink/blue accents
- **Light Mode**: Warm cream backgrounds with golden yellow highlights
- **Theme Toggle**: Persistent theme switching with smooth transitions

### 🎮 **Interactive Elements**
- **3D Coffee Cup Builder**: Customize cup colors, add foam, sprinkles, and caramel drizzle with mouse-tracking rotation
- **Floating Coffee Beans**: Physics-based particle system with mouse repulsion
- **Smooth Animations**: Framer Motion powered interactions throughout

### 🤖 **AI Chatbot**
- Quick-reply buttons for common questions
- Smart responses about menu, prices, and recommendations
- Cheerful gradient design matching the theme

### 🛒 **E-Commerce Features**
- Browse coffee menu with categories
- Add to cart functionality
- User authentication (login/signup)
- Admin dashboard for menu management

### 📱 **Responsive Design**
- Mobile-friendly layouts
- Glassmorphism UI components
- Smooth scrolling and transitions

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Framer Motion** - Animations & 3D transforms
- **Lucide React** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/coffee-shop-os.git
   cd coffee-shop-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Create a MongoDB database (local or Atlas)
   - Update connection string in `server/index.js` if needed

4. **Seed the database**
   ```bash
   node server/seed.js
   ```

5. **Start the backend server**
   ```bash
   node server/index.js
   ```
   Server runs on `http://localhost:5000`

6. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5177`

## 🎯 Usage

### Customer Features
- **Browse Menu**: View all available coffee drinks with prices and ratings
- **Customize Your Cup**: Use the 3D cup builder to create your perfect coffee
- **Chat with AI**: Ask questions using quick-reply buttons or type custom queries
- **Place Orders**: Add items to cart and checkout

### Admin Features
- **Login**: Use `admin@test.com` / `admin123`
- **Manage Menu**: Add, edit, or delete coffee items
- **View Stats**: Monitor sales and popular items

### Test Accounts
- **Admin**: `admin@test.com` / `admin123`
- **Customer**: `customer@test.com` / `password`

## 🎨 Design Highlights

- **Color Palette**: Vibrant yellows (#ffd93d), playful pinks (#ff6b9d), and electric blues (#4d96ff)
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Micro-Animations**: Hover effects, button interactions, loading states
- **Theme System**: CSS variables for easy theme switching

## 📁 Project Structure

```
coffee-shop-os/
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context (Auth, Theme)
│   ├── pages/           # Page components
│   ├── sections/        # Landing page sections
│   └── index.css        # Global styles & theme
├── server/
│   ├── models/          # MongoDB models
│   ├── index.js         # Express server
│   └── seed.js          # Database seeding
└── package.json
```

## 🔧 Configuration

### Theme Colors
Edit `src/index.css` to customize colors:
```css
[data-theme="dark"] {
  --color-accent: #ffd93d;  /* Yellow */
  --color-secondary: #ff6b9d; /* Pink */
  --color-tertiary: #4d96ff;  /* Blue */
}
```

### MongoDB Connection
Edit `server/index.js`:
```javascript
mongoose.connect('your-mongodb-connection-string');
```

## 🌟 Key Features Breakdown

### 3D Cup Builder
- Real-time 3D rotation based on mouse position
- Color customization (6 vibrant options)
- Toppings: foam, sprinkles, caramel
- Save and share your creation

### Physics Engine
- 20 coffee beans with velocity and friction
- Wall collision detection
- Mouse repulsion effects
- Click to scatter interaction

### Smart Chatbot
- Pre-selected quick replies
- Contextual responses
- Typing indicators
- Gradient message bubbles

## 🚧 Future Enhancements

- [ ] Real AI integration (Hugging Face/Gemini API)
- [ ] Payment processing
- [ ] Order tracking
- [ ] Loyalty rewards program
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ☕ and 💛 by Sumit

---

**Made with React, Node.js, MongoDB, and a lot of coffee!**
