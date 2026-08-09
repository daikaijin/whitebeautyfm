# White Beauty

NFC landing page + small merch shop for White Beauty.

## Stack

- Next.js (App Router)
- Stripe Checkout (JPY, shipping address)
- Brand assets from `/Users/jamie/Projects/WB`

## Setup

1. Copy env file and add Stripe test keys:

```bash
cp .env.example .env.local
```

2. Install & run:

```bash
npm install
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Products

Edit `src/lib/products.ts` for names, prices (JPY), images, and sold-out state.

## NFC

Point the NFC card URL at your deployed site root (or `/` with UTM if you want tracking).
