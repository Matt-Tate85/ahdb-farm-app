# AHDB FarmAssist App

A mobile/web application for UK farmers providing access to AHDB (Agriculture and Horticulture Development Board) resources, tools, and farming management features.

## Features

- Dashboard with weather forecasts, priority actions, and farming tips
- Field assessment tool with camera functionality for crop health analysis
- AI advisor for sector-specific farming advice
- Market data tracking with price trends and regional insights
- Farm profile management with benchmarking data
- Access to AHDB tools, calculators, and publications
- Events calendar and training resources
- Knowledge library with searchable publications

## Tech Stack

- React 18 with functional components and hooks
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js 14.0.0 or later
- npm 6.0.0 or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ahdb-farm-app.git
cd ahdb-farm-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at http://localhost:3000

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

```bash
npm run deploy
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── common/      # Shared components across the app
│   ├── dashboard/   # Dashboard-specific components
│   └── market/      # Market-specific components
├── contexts/        # React contexts for state management
├── hooks/           # Custom React hooks
├── pages/           # Main page components
├── styles/          # CSS styles
├── utils/           # Utility functions and constants
├── App.js           # Main application component
└── index.js         # Application entry point
```

## Sector-Based Content

The application provides tailored content based on the selected agricultural sector:
- Cereals & Oilseeds
- Dairy
- Beef & Lamb
- Pork

Users can switch between sectors to access relevant information, tools, and resources.

## Navigation

The application features two types of navigation:

1. **Bottom Navigation**: Main tabs for quick access to primary features
   - Dashboard
   - Field Check
   - Advice
   - Markets
   - My Farm
   - Tools
   - Events
   - Library

2. **Side Menu**: Additional features and settings
   - My Farm Record
   - AHDB Farmbench
   - AHDB Knowledge Library
   - Research Projects
   - Local Monitor Farm
   - Events Near Me
   - Tools & Calculators
   - Settings
   - Logout

## Responsive Design

The application is designed to work on mobile devices and desktop browsers, with a mobile-first approach. The interface adapts to different screen sizes to provide an optimal user experience.

## State Management

- React Context API is used for managing application state
- SectorContext provides the selected sector throughout the application
- Local component state is used for UI interactions

## GitHub Deployment

To deploy the application to GitHub Pages:

1. Update the `homepage` field in package.json with your GitHub Pages URL
2. Run the deployment script:
```bash
npm run deploy
```

## Best Practices

This project follows modern React best practices:
- Functional components with hooks
- Component-based architecture
- Separation of concerns
- Accessibility considerations
- Modular code organization
- Responsive design

## License

This project is for demonstration purposes only. All AHDB branding and content is the property of the Agriculture and Horticulture Development Board.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)
- [Agriculture and Horticulture Development Board](https://ahdb.org.uk/)
