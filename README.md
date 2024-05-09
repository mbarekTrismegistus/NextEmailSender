This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You should link the project to a postgres DB 
you can do so by put your connection string in .env file and run the migrations

```
npx prisma migrate dev

```

also set AUTH_SECRET variables, generate a key with openssl
as well as MAIN_MAIL and the cron job password and resend API key 

To use resend API you should verify your domain, see more at [Resend Docs](https://resend.com/docs/dashboard/domains/introduction)






