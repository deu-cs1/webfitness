# Kinetic Launch

Expo tabanli React Native lansman sayfasi.

## Baslatma

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Build ciktisi `dist/` klasorune yazilir.
Build script'i Metro worker uyumlulugu icin `--max-workers 1` ile calisir.

## Vercel

Bu proje Vercel'de statik Expo web ciktisi olarak deploy edilecek sekilde ayarlanmistir.

- Build Command: `npm run build`
- Output Directory: `dist`
- Development Command: `npm run dev`
