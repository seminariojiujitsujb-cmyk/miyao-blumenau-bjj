import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  CreditCard,
  Lock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { eventConfig, REGISTRATION_SECTION_ID } from "@/config/eventConfig";
import {
  openExternal,
  trackPaymentClick,
  trackViewRegistration,
  trackWhatsappClick,
  type PaymentMethod,
} from "@/lib/analytics";
import qrCode from "@/assets/pix-qrcode.jpeg";

const TRUST_ITEMS = [
  { icon: MapPin, label: "Evento presencial" },
  { icon: Lock, label: "Pagamento seguro" },
  { icon: ShieldCheck, label: "Vagas limitadas" },
  { icon: Users, label: "Aberto para todas as equipes" },
];

const CARD_PAYMENT: {
  method: PaymentMethod;
  label: string;
  helper: string;
  url: string;
  icon: typeof CreditCard;
} = {
  method: "card",
  label: "Cartão em até 3x sem juros",
  helper: "Parcelamento sem juros",
  url: eventConfig.cardPaymentUrl,
  icon: CreditCard,
};

/** Main conversion section with PIX QR code, card payment and WhatsApp groups. */
export function RegistrationSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          trackViewRegistration();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleCardPayment = () => {
    trackPaymentClick(CARD_PAYMENT.method);
    openExternal(CARD_PAYMENT.url);
  };

  const handleCopyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(eventConfig.pixCopyPasteKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* fallback: do nothing, user can select the text manually */
    }
  };

  const handleWhatsappGroup = () => {
    trackWhatsappClick();
    const text = encodeURIComponent(eventConfig.whatsappGroupText);
    openExternal(`${eventConfig.whatsappUrl}?text=${text}`);
  };

  return (
    <section
      ref={sectionRef}
      id={REGISTRATION_SECTION_ID}
      aria-labelledby="registration-title"
      className="bg-primary/10 border-primary/40 tatami-texture scroll-mt-16 border-y px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <h2 id="registration-title" className="text-4xl sm:text-5xl lg:text-6xl">
            Garanta sua vaga
          </h2>
          <div className="belt-line mx-auto mt-6" />
          <p className="text-muted-foreground mt-6 text-base sm:text-lg">
            Escolha como deseja fazer sua inscrição.
          </p>
        </Reveal>

        {/* PIX: QR code + copy-paste key */}
        <Reveal delay={80}>
          <div className="bg-background/60 border-border mt-10 rounded-sm border p-6 sm:p-8">
            <p className="font-display text-xl uppercase tracking-wide sm:text-2xl">
              Pagar com PIX
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Escaneie o QR code ou copie a chave abaixo
            </p>

            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <img
                src={qrCode}
                alt="QR Code para pagamento via PIX"
                width={200}
                height={200}
                className="bg-white rounded-sm p-2"
                loading="lazy"
              />
              <div className="w-full max-w-sm text-left">
                <label
                  htmlFor="pix-key"
                  className="text-muted-foreground mb-2 block text-xs font-medium uppercase tracking-wide"
                >
                  Chave PIX (código copia e cola)
                </label>
                <textarea
                  id="pix-key"
                  readOnly
                  value={eventConfig.pixCopyPasteKey}
                  rows={4}
                  className="bg-background text-foreground border-border w-full resize-none rounded-sm border p-3 font-mono text-xs leading-relaxed focus:outline-none"
                />
                <div>
                  <button
                    type="button"
                    onClick={handleCopyPixKey}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 mt-3 inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        Chave copiada
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        Copiar chave PIX
                      </>
                    )}
                  </button>

                  <a href="https://forms.gle/e9b5EuFrjVYECDW99" target="_blank">
                    <button
                      type="button"
                      className="bg-[#00E85A] text-primary-foreground hover:bg-[#00B846] mt-3 inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-medium transition-colors"
                    >Enviar Comprovante</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Credit card payment */}
        <Reveal delay={120}>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleCardPayment}
              className="bg-primary text-primary-foreground shadow-cta font-display flex min-h-20 w-full flex-col items-center justify-center gap-1 rounded-sm px-5 py-5 text-lg tracking-wide uppercase transition-all duration-200 hover:bg-primary/90 active:scale-[0.99] sm:min-h-24 sm:text-xl"
            >
              <span className="flex items-center gap-3">
                <CARD_PAYMENT.icon className="h-6 w-6" aria-hidden="true" />
                {CARD_PAYMENT.label}
              </span>
              <span className="font-sans text-xs font-medium tracking-normal normal-case opacity-85">
                {CARD_PAYMENT.helper}
              </span>
            </button>
          </div>
        </Reveal>

        {/* WhatsApp group button */}
        <Reveal delay={160}>
          <div className="bg-primary text-primary-foreground shadow-cta font-display flex min-h-20 w-full flex-col items-center justify-center gap-1 rounded-sm px-5 py-5 text-lg tracking-wide uppercase transition-all duration-200 hover:bg-primary/90 active:scale-[0.99] sm:min-h-24 sm:text-xl mt-6">
            <p className="font-display text-lg uppercase tracking-wide sm:text-xl">
              Grupos à partir de 5 pessoas
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Tire dúvidas e faça sua reserva para grupos pelo WhatsApp.
            </p>

            <a href="https://wa.me/5547999940464">
              <button
                type="button"

                // className="border-border text-foreground hover:border-primary hover:text-primary mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border px-5 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.99] sm:w-auto"

                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-3 inline-flex w-fit items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                clique aqui
              </button>
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-white mt-8 text-sm font-bold">
            R. Itajaí, 3434 - Vorstadt, Blumenau - SC, 89015-201
          </p>
          <p className="text-muted-foreground mt-8 text-sm">
            Inscrição confirmada após a aprovação do pagamento.
          </p>
          <p className="font-display text-gold mt-1 text-base">Vagas limitadas.</p>

          <ul className="text-muted-foreground mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            {TRUST_ITEMS.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <item.icon className="text-primary h-4 w-4" aria-hidden="true" />
                {item.label}
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground mt-6 text-xs leading-relaxed">
            Pagamento seguro. Confirmação rápida. Vaga garantida após confirmação do pagamento.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
