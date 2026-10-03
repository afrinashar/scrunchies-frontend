# tuk tails storefront

## Local setup

1. Start the backend using the steps in `../scrunchies-backend-main/README.md`.
2. Copy `.env.example` to `.env`. Set `VITE_ADMIN_WHATSAPP` to the shop's international WhatsApp number using digits only.
3. Install dependencies with `npm install` and start the frontend with `npm run dev`.

# tuk tails storefront

## Local setup

1. Start the backend using the steps in `../scrunchies-backend-main/README.md`.
2. Copy `.env.example` to `.env`. Set `VITE_ADMIN_WHATSAPP` to the shop's international number using digits only, `VITE_INSTAGRAM_URL` to its profile, and `VITE_SITE_URL` to the address that should appear on visiting cards.
3. Install dependencies with `npm install` and start the frontend with `npm run dev`.

The storefront expects products from `GET /items` with a `category` of `Scrunchies` or `Dress`. Orders are saved by the API before the customer is sent to WhatsApp. The admin portal is available at `/admin`.

## Admin guide

- **Orders**: review incoming orders and update their status.
- **Products**: add or edit Scrunchies and Dress products, choose Blouse/Chudithar/Gown for dresses, upload a photo or add a direct video URL, and choose Most wanted or Upcoming placement.
- **Feedback**: read customer submissions.
- **Visiting card**: enter the seller's recipient name and services, check the preview, and download a PNG. The tuk tails mark and Instagram, website, and WhatsApp details come from the storefront configuration and are not editable in the card form.

On the storefront, **How it works** in the footer expands the short order guide. The feedback form is available from the compact **Leave a note** prompt.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
