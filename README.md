# Movie Search Application

A modern, responsive web application that helps users discover and search for movies using the TMDB API. The application features real-time search, trending movies, and a beautiful user interface built with React and Tailwind CSS.

## Features

- 🔍 Real-time movie search with debouncing
- 🎬 Trending movies section based on popular searches
- 🎨 Modern and responsive UI with Tailwind CSS
- 📱 Mobile-friendly design
- 🔄 Search term analytics using Appwrite backend
- 🎯 Popular movies discovery

## Features in Detail

### Search Functionality
- Real-time search with 500ms debouncing
- Integration with TMDB API for movie data
- Search term analytics tracking

### Trending Movies
- Displays top 5 most searched movies
- Updates automatically based on user search patterns
- Stored and managed through Appwrite backend

### Movie Cards
- Displays movie poster, title, and other relevant information
- Responsive grid layout
- Optimized for different screen sizes

## Tech Stack

- **Frontend Framework:** React 19
- **Styling:** Tailwind CSS 4
- **Backend:** Appwrite
- **API Integration:** TMDB (The Movie Database)
- **Build Tool:** Vite 6
- **Package Manager:** npm/yarn

## Prerequisites

Before you begin, ensure you have the following:
- Node.js (Latest LTS version recommended)
- TMDB API Key
- Appwrite Account and Project Setup

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URI=your_tmdb_base_uri
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── MovieCard.jsx    # Movie card component
│   ├── Search.jsx       # Search input component
│   └── Spinner.jsx      # Loading spinner component
├── assets/             # Static assets
├── App.jsx            # Main application component
├── appwrite.js        # Appwrite configuration and functions
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request