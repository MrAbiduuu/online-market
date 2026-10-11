This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# বাজার দর (BazarDor)

**বাজার দর** is a web application for viewing and comparing the prices of everyday essential products in Bangladesh. It helps users explore product categories, check current prices, review historical prices, and compare prices across different markets.

## Technologies Used

- **Next.js** — React framework for building the application.
- **Next.js App Router** — File-based routing and page navigation.
- **TypeScript** — Type-safe application development.
- **Tailwind CSS** — Responsive UI styling.
- **DaisyUI** — Reusable UI components.
- **Better Auth** — User authentication and profile management.
- **MongoDB** — Database for authentication and user information.
- **REST API** — Fetching product and market price information.
- **Vercel** — Application deployment.

## Key Features

1. **Product Categories** — Browse essential products by category, such as rice, lentils, oil, vegetables, and fish.

2. **Price Sorting and Filtering** — Sort products by price and filter them according to the selected price range.

3. **Product Details** — View today's price, yesterday's price, weekly and monthly price history, and price changes.

4. **Market Price Comparison** — Compare the minimum and maximum prices of products across different markets and divisions.

5. **Authentication and Profile Management** — Sign in using supported authentication providers and update your profile information securely.

## Getting Started

### Prerequisites

- Node.js
- npm
- A MongoDB database
- Better Auth and OAuth credentials, if using Google or GitHub sign-in

### Installation

Clone the repository:

```bash
git clone https://github.com/MrAbiduuu/online-market.git
cd online-market
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and configure the environment variables required by your application:

```env
MONGODB_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Add the actual values locally. Do not commit secrets to GitHub.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The application can be deployed to Vercel or another compatible hosting platform. Configure the required environment variables in the hosting provider's project settings before deployment.

## Project

**Name:** বাজার দর (BazarDor)

**Purpose:** Make everyday market prices easier to explore and compare.

