# Orbit registration

## Install

```sh
npm install react-hook-form @hookform/resolvers zod lucide-react cloudinary server-only class-variance-authority clsx tailwind-merge @radix-ui/react-slot @radix-ui/react-label @radix-ui/react-popover react-day-picker date-fns sonner
npx shadcn@latest add form input button label card progress popover calendar sonner skeleton
```

The included UI components are customized. Keep them when the CLI asks to overwrite.

## Run

1. `cp .env.example .env.local` and fill in the three Cloudinary credentials.
2. `npm run dev`
3. Open http://localhost:3000.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

Submission uploads the image to Cloudinary first, then posts its public URL and profile details to `/api/register`. The server uploads the registration JSON directly from memory to Cloudinary as an authenticated raw asset under `registrations/<id>.json`. No registration files are created on the local filesystem. Passwords and confirmation passwords are excluded. The success screen appears only after Cloudinary saves the JSON. If saving fails, retrying reuses the uploaded image while the form stays open.

JSON persistence requires a writable, persistent Node.js filesystem. For serverless deployment, use durable database or object storage instead of the local filesystem. Start over clears browser progress; it does not delete server records or Cloudinary images.
