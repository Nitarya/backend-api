# Backend API - Campaign Management

A minimal Express.js API for managing marketing campaigns.

## Features

- **GET /campaigns** - Returns all campaigns (static/dummy data stored in JSON file)
- **POST /campaigns** - Creates a new campaign and stores it in the JSON file
- **CORS enabled** - Configured for frontend integration
- **Validation** - Input validation with proper error messages
- **Error handling** - Comprehensive error handling for all endpoints

## Setup

1. Ensure Node.js v24 is active:
```bash
nvm use 24
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:4000`

## API Endpoints

### GET /campaigns
Returns all campaigns stored in the system.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Summer Sale 2025",
      "budget": 50000,
      "status": "active",
      "startDate": "2025-06-01",
      "endDate": "2025-08-31",
      "targetAudience": "Young Adults",
      "platform": "Social Media",
      "createdAt": "2025-05-15T00:00:00.000Z"
    }
  ]
}
```

### POST /campaigns
Creates a new campaign.

**Request Body:**
```json
{
  "name": "New Campaign",
  "budget": 50000,
  "status": "planned",
  "startDate": "2025-01-01",
  "endDate": "2025-03-31",
  "targetAudience": "General Public",
  "platform": "Digital"
}
```

**Required fields:** `name`, `budget`

**Response:**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Campaign created successfully",
  "data": {
    "id": "1234567890",
    "name": "New Campaign",
    "budget": 50000,
    "status": "planned",
    "createdAt": "2025-12-10T..."
  }
}
```

## Data Storage

Campaigns are stored in `campaigns.json` file in the root directory. The file is created automatically with dummy data on first run.

## Tech Stack

- Express.js (JavaScript)
- CORS middleware
- File-based JSON storage
- Nodemon for development

## Project Structure

```
backend-api/
├── src/
│   ├── server.js                 # Main Express server
│   ├── models/
│   │   └── campaigns.js          # Campaign data access functions
│   └── routes/
│       └── campaigns.js          # Campaign routes
├── campaigns.json                # Data storage (auto-generated)
├── package.json
└── README.md
```
