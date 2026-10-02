# tuk tails storefront

## Local setup

1. Start the backend using the steps in `../scrunchies-backend-main/README.md`.
2. Copy `.env.example` to `.env`. Set `VITE_ADMIN_WHATSAPP` to the shop's international WhatsApp number using digits only.
3. Install dependencies with `npm install` and start the frontend with `npm run dev`.

The storefront expects products from `GET /items` with a `category` of `Scrunchies` or `Dress`. Orders are saved by the API before the customer is sent to WhatsApp. The admin order desk is available at `/admin`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
