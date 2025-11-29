import app from './web/app';

// Default port set to 3005, can be overridden via ENV PORT
const PORT = process.env.PORT ? Number(process.env.PORT) : 3005;
app.listen(PORT, () => {
  console.log(`[atlantis] backend running on http://localhost:${PORT}`);
});
