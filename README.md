# Contentstack Next.js Blog Builder

A modern, high-performance blog platform built with Next.js (App Router), Tailwind CSS, and Contentstack headless CMS. 

## Features

- **Next.js App Router**: Utilizes the latest Next.js features including React Server Components and Server Actions for optimal performance.
- **Contentstack Delivery SDK**: Seamless integration with Contentstack's v3 Delivery SDK to fetch highly structured content.
- **Dynamic Routing**: Automatic route generation for blog posts, supporting multiple locales (`en`, `hi`, etc.).
- **Contentstack Live Preview**: Real-time drafting experience! Edit your content in the Contentstack dashboard and see it instantly reflected without reloading, powered by the `@contentstack/live-preview-utils` SDK and Next.js Draft Mode.
- **Advanced Pagination & Search**: Server-side pagination and regex-based case-insensitive live search, ensuring the frontend stays lightning-fast even with thousands of blogs.
- **Tailwind CSS**: Fully responsive, beautifully styled UI out of the box with dark mode support.
- **Rich Text Rendering**: Parses and safely renders Contentstack's JSON Rich Text Editor fields natively to React HTML elements.

## Getting Started

### Prerequisites

You need a Contentstack account with your stack credentials (API Key, Delivery Token, and Environment).

### 1. Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key
NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN=your_preview_token
NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment
NEXT_PUBLIC_CONTENTSTACK_REGION=NA
NEXT_PUBLIC_CONTENTSTACK_PREVIEW=true

# Secret for Next.js draft mode preview URL
CONTENTSTACK_PREVIEW_SECRET=your_secure_random_secret
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live Preview Configuration

To enable real-time Live Preview and Next.js Draft mode, configure your Live Preview settings in the Contentstack Dashboard:

1. Navigate to **Settings** > **Environments** > Your Environment.
2. Ensure **Live Preview** is enabled.
3. For the **Preview URL** setting on your `blog_landing_page` Content Type, use:
   ```text
   {{environment.url}}/api/preview?secret=your_secure_random_secret&slug=/en/blog/{{entry.url}}
   ```
4. Set the preview mode to **Server-side Rendering (SSR)**.

## Project Structure

- `/app`: Next.js App Router pages, layout, and API routes (including the `/api/preview` endpoint).
- `/components/contentstack`: Reusable React components that map directly to Contentstack Content Types and global blocks.
- `/lib/contentstack`: Core Contentstack SDK initialization, types, and data-fetching server actions.
- `/types`: TypeScript interfaces auto-generated or manually typed for Contentstack responses.
