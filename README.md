# Smallseyss.ink - Tattoo Artist Website

A modern, single-page website for Anna Seyss, a tattoo artist. Built with React, Tailwind CSS, and EmailJS.

## Features

- Responsive hero section with background image
- Booking form with email integration
- Modern, clean design
- Mobile-friendly layout

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure EmailJS:
   - Sign up for an account at [EmailJS](https://www.emailjs.com/)
   - Create an email service
   - Create an email template
   - Get your public key
   - Update the following in `src/App.jsx`:
     - `YOUR_SERVICE_ID`
     - `YOUR_TEMPLATE_ID`
     - `YOUR_PUBLIC_KEY`

3. Add your hero image:
   - Place your hero image in the `public` folder as `hero-image.jpg`

## Development

Run the development server:
```bash
npm run dev
```

## Building for Production

Build the project:
```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment to Cloudflare Pages.
