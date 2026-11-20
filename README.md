# Si6teen storefront (Next.js + MUI + Carbon, plain JavaScript/JSX)

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env.local`, paste your Supabase anon (publishable) key
3. `npm run dev`, open http://localhost:3000

## Build for hosting
`npm run build` makes a static site in `out/` (Cloudflare Pages: build command `npm run build`, output `out`).
Pages are built from your database, so rebuild after adding products or changing descriptions.
Prices and stock on product pages are re-checked live in the browser.

## Where things are
- src/theme.js            brand colors + Poppins (change colors here)
- src/styles/carbon.scss  Carbon styles (add a line per new Carbon component)
- src/components/         Header, Footer, CartDrawer, ProductCard, Gallery, AddToCart...
- src/app/                pages: home, products/[slug], checkout, thank-you
- src/lib/                products, cart, checkout (Razorpay), states, money
- public/brand/           logos (logo.png, logo-header.png, monogram.png); favicon in src/app/icon.png
