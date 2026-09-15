import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Accordion, type AccordionItem } from "@/components/Accordion";

export const FAQ_ITEMS: AccordionItem[] = [
  {
    question: "Preciso ser faixa avançada para participar?",
    answer:
      "Não. O seminário é aberto para praticantes de diferentes níveis e faixas.",
  },
  {
    question: "Posso participar sendo de outra academia?",
    answer:
      "Sim. O evento é aberto para praticantes de Jiu-Jitsu independente de equipe ou academia.",
  },
  {
    question: "Onde acontecerá?",
    answer: "R. Itajaí, 3434 - Vorstadt, No SESI Blumenau - SC, 89015-201",
  },
  {
    question: "Quando será?",
    answer: "Dia 22 de outubro, às 19h.",
  },
  {
    question: "Como faço minha inscrição?",
    answer:
      "A inscrição pode ser feita através dos links de pagamento via PIX ou cartão.",
  },
  {
    question: "Posso pagar no cartão?",
    answer: "Sim. O pagamento poderá ser realizado em até 3 vezes sem juros.",
  },
  {
    question: "As vagas são limitadas?",
    answer:
      "Sim. As inscrições poderão ser encerradas assim que a capacidade do evento for atingida.",
  },
];

export function FaqSection() {
  return (
    <Section className="bg-graphite" width="narrow">
      <SectionHeading eyebrow="FAQ">Dúvidas frequentes</SectionHeading>
      <Reveal className="mt-10">
        <Accordion items={FAQ_ITEMS} />
      </Reveal>
    </Section>
  );
}
