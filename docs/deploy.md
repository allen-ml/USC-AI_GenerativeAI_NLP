# Build & Deploy

## Production Build

```bash
npm run build
```

This runs `tsc -b` (type-check) followed by `vite build`. Output goes to
`dist/`. The build will fail if there are any TypeScript errors.

Preview the built output locally before deploying:

```bash
npm run preview
```

---

## Static Hosting

`dist/` is a fully static site with no server-side requirements. Deploy it to
any static host.

Because the site uses client-side routing (React Router), the host must serve
`index.html` for all routes rather than returning a 404.

### Netlify

Add `public/_redirects`:

```txt
/* /index.html 200
```

### Vercel

Add `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Apache

Add a `.htaccess` in the deploy root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Checking Before Deploying

```bash
npx tsc --noEmit   # catch type errors
npm run lint       # catch lint issues
npm run build      # full build
npm run preview    # manual smoke test
```
