/**
 * Seed Sanity with the v3.1 content.
 *
 * Usage:
 *   1. Create a free Sanity project at https://www.sanity.io/manage
 *   2. Get your projectId, dataset name (default: production)
 *   3. Create a write token: sanity.io/manage → API → Tokens → Add token (Editor)
 *   4. Add to .env:
 *        PUBLIC_SANITY_PROJECT_ID=xxx
 *        PUBLIC_SANITY_DATASET=production
 *        SANITY_API_WRITE_TOKEN=xxx
 *   5. Run: npm run seed
 *
 * This script has the v3.1 content inline so it doesn't need a TS build step.
 * If you edit src/lib/fallback.ts, mirror the change here.
 */

import { createClient } from '@sanity/client';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
});

// ─── CONTENT (mirror of src/lib/fallback.ts) ────────────────────────────

const esContent = {
  _id: 'siteContent-es',
  _type: 'siteContent',
  language: 'es',
  hero: {
    eyebrow: 'Bienvenida',
    headline: 'Vive tu práctica,',
    headlineItalic: 'respira el mar.',
    subheadline:
      'Vinyasa flow y yoga de playa al amanecer en la Costa del Sol. Conecta cuerpo, respiración y Mediterráneo.',
    ctaText: 'Reserva tu primera clase',
    ctaLink: '#contacto',
  },
  about: {
    eyebrow: 'Sobre Connie',
    headline: 'El yoga como vuelta',
    headlineItalic: 'a lo esencial.',
    body: 'Connie te invita a descubrir el yoga en su forma más auténtica — fluir con la respiración, conectar con el cuerpo y dejarse llevar por el ritmo del mar.',
    stats: [
      { _type: 'stat', _key: 's1', value: '+5', label: 'años enseñando' },
      { _type: 'stat', _key: 's2', value: 'ES · EN', label: 'clases bilingües' },
      { _type: 'stat', _key: 's3', value: 'Todos', label: 'los niveles' },
    ],
  },
  classes: [
    {
      _key: 'c1',
      id: 'vinyasa',
      eyebrow: 'Estudio',
      title: 'Vinyasa',
      titleItalic: 'Flow.',
      body: 'Secuencias dinámicas vinculadas con la respiración. Un espacio para construir fuerza, flexibilidad y presencia. Todos los niveles bienvenidos — desde principiante hasta práctica avanzada de invertidas.',
      details: ['60 minutos', 'Jueves 9:30 AM', 'Evolve Studio, Estepona'],
      ctaText: 'Reservar',
    },
    {
      _key: 'c2',
      id: 'beach',
      eyebrow: 'Playa',
      title: 'Beach',
      titleItalic: 'Yoga.',
      body: 'Vinyasa suave al amanecer frente al Mediterráneo. La arena bajo los pies, la luz dorada, el sonido del mar. Una experiencia que recordarás.',
      details: ['75 minutos', 'Horarios según temporada y mareas', 'Costa de Estepona'],
      ctaText: 'Reservar',
    },
  ],
  schedule: {
    eyebrow: 'Horario semanal',
    headline: 'Reserva tu momento.',
    rows: [
      { _key: 'd1', day: 'Lunes', time: '—', class: 'consultar WhatsApp' },
      { _key: 'd2', day: 'Martes', time: '—', class: 'consultar WhatsApp' },
      { _key: 'd3', day: 'Miércoles', time: '—', class: 'consultar WhatsApp' },
      { _key: 'd4', day: 'Jueves', time: '09:30 — 10:30', class: 'Vinyasa Flow · Evolve Studio, Estepona', highlight: true },
      { _key: 'd5', day: 'Viernes', time: '—', class: 'consultar WhatsApp' },
      { _key: 'd6', day: 'Sábado', time: '—', class: 'consultar WhatsApp' },
      { _key: 'd7', day: 'Domingo', time: 'descanso', class: '—' },
    ],
    footer: 'Las sesiones de playa se confirman cada mañana por WhatsApp según mareas y meteorología. Clases privadas disponibles bajo petición.',
  },
  pricing: {
    eyebrow: 'Precios',
    headline: 'Pago por práctica,',
    headlineItalic: 'sin ataduras.',
    tiers: [
      { _key: 't1', name: 'Clase suelta', price: '15€', subtitle: 'para probar', features: ['1 clase (60-75 min)', 'Esterilla proporcionada', 'Sin compromiso'], ctaText: 'Reservar', popular: false },
      { _key: 't2', name: 'Bono 10 clases', price: '120€', subtitle: '12€ por clase', features: ['10 clases', 'Válido 3 meses', 'Estudio o playa', 'Esterilla incluida'], ctaText: 'Comprar bono', popular: true, popularLabel: 'Más popular' },
      { _key: 't3', name: 'Mensual', price: '90€', subtitle: 'ilimitado', features: ['Clases ilimitadas', 'Válido 30 días', 'Estudio + playa', 'Prioridad reservas'], ctaText: 'Suscribirme', popular: false },
    ],
    footer: 'Pago en efectivo, Bizum o transferencia. Primera clase siempre a 10€.',
  },
  contact: {
    eyebrow: 'Contacto',
    headline: 'Reserva o pregúntame',
    headlineItalic: 'lo que quieras.',
    subheadline: 'Te respondo en menos de 24h. Si es para hoy, mejor WhatsApp.',
    whatsapp: { label: 'WhatsApp', value: '+34 XXX XXX XXX', href: 'https://wa.me/34XXXXXXXXX' },
    email: { label: 'Email', value: 'hola@vivayogaconnie.com', href: 'mailto:hola@vivayogaconnie.com' },
    instagram: { label: 'Instagram', value: '@vivayogaconnie', href: 'https://www.instagram.com/vivayogaconnie/' },
    whereLabel: 'Dónde',
    where: [
      { _key: 'w1', title: 'Evolve Studio', subtitle: 'Estepona, Costa del Sol' },
      { _key: 'w2', title: 'Playa', subtitle: 'Costa de Estepona, Marbella' },
    ],
  },
  footer: {
    tagline: 'Vinyasa & beach yoga en la Costa del Sol',
    copyright: '© 2026 Viva Yoga con Connie',
  },
};

const enContent = {
  _id: 'siteContent-en',
  _type: 'siteContent',
  language: 'en',
  hero: {
    eyebrow: 'Welcome',
    headline: 'Live your practice,',
    headlineItalic: 'breathe the sea.',
    subheadline: 'Vinyasa flow and sunrise beach yoga on the Costa del Sol. Connect body, breath, and the Mediterranean.',
    ctaText: 'Book your first class',
    ctaLink: '#contact',
  },
  about: {
    eyebrow: 'About Connie',
    headline: 'Yoga as a return',
    headlineItalic: 'to what matters.',
    body: 'Connie invites you to discover yoga in its most authentic form — flow with your breath, connect with your body, and let the rhythm of the sea carry you.',
    stats: [
      { _type: 'stat', _key: 's1', value: '+5', label: 'years teaching' },
      { _type: 'stat', _key: 's2', value: 'ES · EN', label: 'bilingual classes' },
      { _type: 'stat', _key: 's3', value: 'All', label: 'levels welcome' },
    ],
  },
  classes: [
    {
      _key: 'c1',
      id: 'vinyasa',
      eyebrow: 'Studio',
      title: 'Vinyasa',
      titleItalic: 'Flow.',
      body: 'Dynamic breath-linked sequences. A space to build strength, flexibility, and presence. All levels welcome — from beginner to advanced inversions practice.',
      details: ['60 minutes', 'Thursday 9:30 AM', 'Evolve Studio, Estepona'],
      ctaText: 'Book',
    },
    {
      _key: 'c2',
      id: 'beach',
      eyebrow: 'Beach',
      title: 'Beach',
      titleItalic: 'Yoga.',
      body: 'Soft sunrise Vinyasa facing the Mediterranean. Sand under your feet, golden light, the sound of the sea. An experience to remember.',
      details: ['75 minutes', 'Times vary by season and tides', 'Estepona coastline'],
      ctaText: 'Book',
    },
  ],
  schedule: {
    eyebrow: 'Weekly schedule',
    headline: 'Find your moment.',
    rows: [
      { _key: 'd1', day: 'Monday', time: '—', class: 'ask on WhatsApp' },
      { _key: 'd2', day: 'Tuesday', time: '—', class: 'ask on WhatsApp' },
      { _key: 'd3', day: 'Wednesday', time: '—', class: 'ask on WhatsApp' },
      { _key: 'd4', day: 'Thursday', time: '09:30 — 10:30', class: 'Vinyasa Flow · Evolve Studio, Estepona', highlight: true },
      { _key: 'd5', day: 'Friday', time: '—', class: 'ask on WhatsApp' },
      { _key: 'd6', day: 'Saturday', time: '—', class: 'ask on WhatsApp' },
      { _key: 'd7', day: 'Sunday', time: 'rest', class: '—' },
    ],
    footer: 'Beach sessions are confirmed each morning via WhatsApp based on tides and weather. Private classes available on request.',
  },
  pricing: {
    eyebrow: 'Pricing',
    headline: 'Pay per practice.',
    headlineItalic: 'No lock-in.',
    tiers: [
      { _key: 't1', name: 'Drop-in', price: '€15', subtitle: 'to try it out', features: ['1 class (60-75 min)', 'Mat provided', 'No commitment'], ctaText: 'Book', popular: false },
      { _key: 't2', name: '10-class pack', price: '€120', subtitle: '€12 per class', features: ['10 classes', 'Valid 3 months', 'Studio or beach', 'Mat included'], ctaText: 'Buy pack', popular: true, popularLabel: 'Most popular' },
      { _key: 't3', name: 'Monthly', price: '€90', subtitle: 'unlimited', features: ['Unlimited classes', 'Valid 30 days', 'Studio + beach', 'Priority booking'], ctaText: 'Subscribe', popular: false },
    ],
    footer: 'Pay in cash, Bizum, or bank transfer. First class always €10.',
  },
  contact: {
    eyebrow: 'Contact',
    headline: 'Book a class or',
    headlineItalic: 'ask anything.',
    subheadline: "I reply within 24h. If it's for today, WhatsApp is fastest.",
    whatsapp: { label: 'WhatsApp', value: '+34 XXX XXX XXX', href: 'https://wa.me/34XXXXXXXXX' },
    email: { label: 'Email', value: 'hola@vivayogaconnie.com', href: 'mailto:hola@vivayogaconnie.com' },
    instagram: { label: 'Instagram', value: '@vivayogaconnie', href: 'https://www.instagram.com/vivayogaconnie/' },
    whereLabel: 'Where',
    where: [
      { _key: 'w1', title: 'Evolve Studio', subtitle: 'Estepona, Costa del Sol' },
      { _key: 'w2', title: 'Beach', subtitle: 'Estepona coastline, Costa del Sol' },
    ],
  },
  footer: {
    tagline: 'Vinyasa & beach yoga on the Costa del Sol',
    copyright: '© 2026 Viva Yoga with Connie',
  },
};

// ─── MAIN ────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding ES content...');
  await client.createOrReplace(esContent);
  console.log('Seeding EN content...');
  await client.createOrReplace(enContent);
  console.log('Done. Open Sanity Studio to verify.');
}

seed().catch((e) => {
  console.error('Seed failed:', e.message);
  process.exit(1);
});
