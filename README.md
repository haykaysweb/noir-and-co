# NOIR & CO

An online store for clothes, bags and watches. I built it to learn Next.js, and I kept going until it covered the parts of a shop that matter: browsing, a cart, checkout, and a real database behind the forms.

**Live demo:** [noir-and-co.vercel.app](https://noir-and-co.vercel.app)

![Home page](./screenshots/home.png)
![Shop page with filters applied](./screenshots/shop.png)



## What it does

- **Browse and filter.** Shop by category, filter by price, size and color, and sort the results.
- **Filters live in the URL.** A filtered page can be bookmarked or sent to someone, and the back button works.
- **Product pages.** Photo gallery, color options and a size picker.
- **Cart and wishlist.** A slide-out cart drawer, a full cart page and a wishlist. Both survive a page refresh.
- **Forms that save.** Checkout, the contact form and the newsletter signup are validated on the server and stored in Postgres.

---

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS v4
- Prisma 7 with PostgreSQL (hosted on Neon)
- Zod for validation
- Server Actions for the forms
- Deployed on Vercel

---

## How it works

### Server and client components

Pages and most components run on the server. I only used `"use client"` where something needs state or a click handler, and I tried to keep those parts small. The product card is the clearest example: the card is a server component, and only the wishlist button and the quick-add button inside it run in the browser.

### Filters in the URL

The shop page reads its filters from the URL on the server, so the browser receives finished HTML. The filter buttons are a small client component that only changes the URL.

### The cart and checkout

The cart is saved in localStorage, and it stores only product ids, sizes, colors and quantities, never prices. At checkout the browser sends that list to a Server Action, which looks up the real prices in the product catalog on the server. That way a price can't be changed from the browser.

localStorage doesn't exist on the server, which caused hydration mismatches at first. I solved that with `useSyncExternalStore`.

### Validation

Every form has a Zod schema that runs on the server, and `useActionState` shows the error message under each field. Browser-side checks like `required` only help the user, so the server is the one that actually validates.

### Database

An order is split across two tables, `orders` and `order_items`. Each item copies the product name and price at the moment of purchase, so an old order doesn't change if the catalog changes later. The contact form and newsletter each have their own table.

---

## What isn't included

- **Payments.** The checkout is a demo and says so. A real version would use Stripe or Paystack.
- **User accounts and an admin page.** Checkout is guest-only.
- **A products table.** The catalog is plain data in `src/data/products.ts`, because nothing in the app edits it.
- **My own photos.** The images come from Pexels.

---

## Running it locally

You need Node.js 20.9 or newer and a PostgreSQL database. I used a free one from Neon.

1. Clone the repo and install the dependencies:

```bash
   git clone https://github.com/haykaysweb/noir-and-co.git
   cd noir-and-co
   npm install
```

2. Create a `.env` file in the project root:

```env
   DATABASE_URL="your_postgres_connection_string"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

3. Create the database tables:

```bash
   npx prisma migrate dev
```

4. Start the dev server:

```bash
   npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

---

## What I learned

- **Start on the server.** I used to make everything a client component out of habit. Here I went the other way and added `"use client"` only when I had to.
- **The server can't see the browser's data.** That's why checkout sends ids and quantities, and the server works out the prices itself.
- **Browser validation isn't validation.** Anyone can skip the `required` attribute, so the real checks have to run on the server.
- **Postgres is different from MongoDB.** I had always used Mongo, where an order's items would sit inside the order document. In Postgres they're a second table linked by an id.
- \*\*Check versions before
