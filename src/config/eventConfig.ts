/**
 * Central event configuration.
 * All event data and external URLs must be read from here — never hardcoded in components.
 */
export const eventConfig = {
  eventName: "Seminário João Miyao",
  eventDate: "22 de outubro",
  eventDateISO: "2026-10-22T19:00:00-03:00",
  eventEndISO: "2026-10-22T22:00:00-03:00",
  eventTime: "19h",
  venue: "SESI Blumenau",
  city: "Blumenau",
  state: "SC",
  stateName: "Santa Catarina",
  country: "BR",
  pixPaymentUrl: "", // PIX is now handled via QR code + copy-paste key
  pixCopyPasteKey:
    "00020126580014br.gov.bcb.pix01369520929a-cbc6-4328-929f-492128402fa15204000053039865406200.005802BR5924Bruno Pellegrino Rojtenb6009Sao Paulo62220518daqr8165234667664763047CA4",
  cardPaymentUrl:
    "https://loja.infinitepay.io/eventosrojt/smt3476-seminario-joao-miyao",
  instagramUrl: "",
  whatsappUrl: "https://wa.me/5547999940464",
  whatsappGroupText: "Olá! Tenho interesse no seminário do João Miyao para grupos.",
  mapsEmbedUrl: "", // Google Maps embed URL (optional, added later)
} as const;

export const REGISTRATION_SECTION_ID = "inscricao";
