# Start Where We Are Festival

A modern, responsive website for the Start Where We Are music festival in Boston, MA. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Hero Section** with seamless looping video background
- **Artist Carousel** showcasing featured bands with Swiper.js
- **Interactive Location Map** using Google Maps integration
- **Animated Statistics** with counting animations
- **Progress Bars** for ticket sales tracking
- **Responsive Design** optimized for all devices
- **Modern UI Components** using shadcn/ui

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Carousel:** Swiper.js
- **Maps:** Google Maps via @next/third-parties

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Maps API key (for the location section)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/start-where-you-are.git
cd start-where-you-are
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
start-where-you-are/
├── app/
│   ├── page.tsx          # Main homepage component
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── counter.tsx      # Animated counter component
│   └── progress-bar.tsx # Progress bar component
├── public/
│   ├── videos/          # Background videos
│   └── *.webp           # Optimized images
└── lib/
    └── utils.ts         # Utility functions
```

## Key Sections

1. **Hero Section** - Full-screen video background with festival branding
2. **Featured Artists** - Interactive carousel of performing bands
3. **Experience Section** - Festival highlights and features
4. **Ticket Sales** - Live progress tracking of ticket availability
5. **Festival Stats** - Animated counters showing attendance metrics
6. **About Section** - Story and community focus
7. **Location Map** - Interactive Google Maps embed with venue details
8. **Instagram CTA** - Social media engagement banner

## Development

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables
4. Deploy

## Environment Variables

Required environment variables for production:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Your Google Maps API key

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Contact

For questions about the festival website, contact: info@swwafestival.com