# Cricket Parabola Calculator

A web application for calculating cricket match targets using the Parabola Method.

## Overview

This application implements the Parabola Method for calculating revised targets in cricket matches when the second innings is reduced due to interruptions. The Parabola Method uses a normalized table to determine fair targets based on the overs available to each team.

## Features

- Calculate revised targets using the Parabola Method
- Input Team 1's score and overs played
- Input Team 2's available overs (including partial overs with balls)
- Real-time target calculation
- Clean, modern UI with responsive design

## Technology Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Recharts** - Data visualization

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Antigravity
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   └── ParabolaCalculator.jsx   # Main calculator component
├── data/
│   └── parabolaTable.js         # Parabola normalization table
├── hooks/
│   └── useParabola.js           # Custom hook for calculations
├── App.jsx                       # Main app component
├── index.css                     # Global styles
└── main.jsx                      # Entry point
```

## How It Works

The Parabola Method calculates the target using the formula:

**Target = (Norm2 / Norm1) × Score1**

Where:
- **Norm1** = Normalized value for Team 1's overs
- **Norm2** = Normalized value for Team 2's overs
- **Score1** = Team 1's final score

The normalized values are retrieved from a pre-calculated Parabola Table based on the number of overs (20-50) and balls (0-5).

## Usage Example

1. Enter Team 1's score (e.g., 250 runs)
2. Select Team 1's overs played (e.g., 50 overs)
3. Select Team 2's overs to be bowled (e.g., 40 overs, 0 balls)
4. The application will automatically calculate and display the target

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
