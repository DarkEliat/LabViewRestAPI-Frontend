# LabVIEW REST API Frontend

Web frontend application for controlling a servo mechanism via REST API. The project consists of three main components: Frontend (Vue.js), Backend (LabVIEW REST API), and the actuator device (ESP32 + servo mechanism).

## 📋 Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running](#running)
- [Configuration](#configuration)
- [API](#api)
- [Data Structure](#data-structure)
- [Authors](#authors)

## 🎯 Project Description

The project aims to create a servo mechanism control system via REST API. The system enables:

- **Manual control** of servo mechanism position in the range of 0-180°
- **Automatic control** (auto mode)
- **Real-time monitoring** of current position
- **Data visualization** on a chart (last ~30 seconds)
- **Connection status** with LabVIEW server and ESP32 device

## ✨ Features

### Servo Mechanism Control

- Setting servo position using a slider or numeric input (0-180°)
- Switching between **manual** (`manual`) and **automatic** (`auto`) modes
- Real-time display of current servo position
- Validation of entered position values

### Monitoring and Visualization

- Chart showing the last ~30 seconds of servo movement
- Sampling frequency: ~10 Hz
- Connection status indicators:
  - Connection to LabVIEW server
  - Connection to ESP32 device

### Communication

- REST API for communication with LabVIEW backend
- WebSocket for receiving logs in real-time
- Automatic data refresh every ~100ms (10 Hz)

## 🛠 Technologies

### Framework and Tools

- **Vue 3** (Composition API) - frontend framework
- **TypeScript** - static typing
- **Vite** - build tool and development server
- **Vue Router** - routing in the application
- **Pinia** - state management

### Libraries

- **Chart.js** + **vue-chartjs** - data visualization on charts
- **ESLint** - code linting
- **Prettier** - code formatting
- **Vitest** - testing framework

## 📁 Project Structure

```
src/
├── assets/              # Static resources (CSS)
├── components/          # Vue components
│   ├── connection/     # Connection-related components
│   │   ├── ConnectionStatus.vue
│   │   └── WebSocketManager.vue
│   ├── logs/           # Log display components
│   │   ├── LogItem.vue
│   │   └── LogViewer.vue
│   └── servo/          # Servo control components
│       ├── ServoChart.vue
│       ├── ServoControl.vue
│       ├── ServoDisplay.vue
│       ├── ServoModeSelector.vue
│       └── ServoPositionInput.vue
├── config/             # Application configuration
│   └── api.config.ts   # API configuration
├── router/             # Routing configuration
│   └── index.ts
├── services/           # API communication services
│   ├── api.service.ts  # Basic HTTP service
│   └── servo.service.ts # Servo control service
├── stores/             # Pinia stores (application state)
│   ├── chart.ts        # Chart state
│   ├── connection.ts   # Connection state
│   ├── logs.ts         # Logs state
│   └── servo.ts        # Servo mechanism state
├── types/              # TypeScript type definitions
│   ├── chart.types.ts
│   └── servo.types.ts
├── views/              # Views (pages)
│   ├── AboutView.vue   # "About" page
│   └── HomeView.vue    # Home page (control)
├── App.vue             # Main application component
└── main.ts             # Application entry point
```

## 📦 Installation

### Requirements

- **Node.js** (version 18 or higher)
- **npm** or **yarn**

### Installation Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd LabViewRestAPI-Frontend
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Running

### Development Mode

Run the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

Built files will be in the `dist/` directory

### Preview Production Build

```bash
npm run preview
```

### Other Commands

```bash
# TypeScript type checking
npm run type-check

# Code linting
npm run lint

# Code formatting
npm run format

# Run unit tests
npm run test:unit
```

## ⚙️ Configuration

### API Configuration

API configuration is located in `src/config/api.config.ts`:

```typescript
export const API_CONFIG = {
    BASE_URL: 'http://localhost:80/ServoControlService',
    TIMEOUT: 5000, // Request timeout in milliseconds
    HEADERS: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
} as const;
```

**Note:** Change `BASE_URL` to your LabVIEW REST API server address.

### Chart Configuration

Chart parameters can be changed in the store `src/stores/chart.ts`:

- `xAxisSize`: Number of seconds displayed on the horizontal axis (default: 30)
- `samplingRate`: Sampling frequency in Hz (default: 10)

## 🔌 API

### REST API Endpoints

The application communicates with the LabVIEW backend through the following endpoints:

#### GET `/ServoControlService/status`

Retrieves the current servo mechanism status.

**Response:**

```json
{
  "status": {
    "mode": "manual" | "auto",
    "position": 0-180
  },
  "esp32Connected": boolean
}
```

#### POST `/ServoControlService/actuator`

Sends a command to set the position or operating mode of the servo mechanism.

**Request body:**

```json
{
  "status": {
    "mode": "manual" | "auto",
    "position": 0-180
  }
}
```

**Response:**

```json
{
  "response": "OK" | "ERROR"
}
```

### WebSocket

The application connects to WebSocket at `ws://localhost:5173/ws` to receive logs in real-time.

**Message format:**

```json
{
    "timestamp": "2024-01-01T12:00:00.000Z",
    "message": "Log message"
}
```

## 📊 Data Structure

### TypeScript Types

#### `ServoControlMode`

```typescript
type ServoControlMode = 'manual' | 'auto';
```

#### `ServoPosition`

```typescript
type ServoPosition = Range<0, 180>; // Number in range 0-180
```

#### `ServoStatus`

```typescript
interface ServoStatus {
    status: {
        mode: ServoControlMode;
        position: ServoPosition;
    };
}
```

#### `AllServoData`

```typescript
interface AllServoData {
    status: {
        mode: ServoControlMode;
        position: ServoPosition;
    };
    esp32Connected: boolean;
}
```

#### `ChartPoint`

```typescript
interface ChartPoint {
    elapsedTime: number; // Time in seconds from start
    position: number; // Servo position (0-180)
}
```

## 👥 Authors

- **Jan Kostka**

Project developed as part of the Measurement Systems Programming course.

## 📝 License

Private project - all rights reserved.

## 🔗 Related Projects

- **Backend:** LabVIEW REST API Server
- **Device:** ESP32 + Servo Mechanism

---

**Version:** 0.0.0
