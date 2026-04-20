'use client';

import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@once-ui-system/core";
import { person, contact, social, newsletter, baseURL } from "@/resources";
import { Mailchimp } from "@/components";
import { trackContactForm, trackExternalLink } from "@/utils/analytics";

const sanitizePhoneNumber = (phone: string) => phone.replace(/[^+0-9]/g, "");

const formatPhoneNumber = (phone: string) => {
  const cleaned = sanitizePhoneNumber(phone);
  if (cleaned.startsWith("+84") && cleaned.length === 12) {
    return `+84 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
  }
  return cleaned;
};

export function ContactForm() {
  const linkedInUrl = social.find((item) => item.name === "LinkedIn")?.link;
  const phoneRaw = social.find((item) => item.name === "Phone")?.link?.replace("tel:", "") || "";
  const phone = sanitizePhoneNumber(phoneRaw);
  const phoneDisplay = formatPhoneNumber(phoneRaw);

  const handleSaveContact = () => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${person.name}`,
      `N:${person.lastName};${person.firstName};;;`,
      `TITLE:${person.role}`,
      `EMAIL;TYPE=INTERNET:${person.email}`,
      phone ? `TEL;TYPE=CELL:${phone}` : "",
      `ADR;TYPE=WORK:;;${person.location};;;;`,
      `URL:${baseURL}`,
      "END:VCARD",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${person.name.toLowerCase().replace(/\s+/g, "-")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    trackContactForm("email");
  };

  // FAQ Schema for better SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Tran Minh Khoi offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I offer Mobile App Development (React Native), Web Development (React.js, Next.js, Vue.js), Backend Development (Node.js, Laravel), UI/UX Design (Figma), Database Design & Optimization (MySQL, PostgreSQL), SEO Optimization, IT Support, Office 365 Administration, and Graphic Design (Photoshop, Illustrator, After Effects, Canva)."
        }
      },
      {
        "@type": "Question", 
        "name": "How can I contact Tran Minh Khoi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact me via email at contact@tranminhkhoi.dev, connect on LinkedIn, or call me directly. I typically respond within 1-2 business days."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Tran Minh Khoi located?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "I'm based in Ho Chi Minh City, Vietnam (GMT+7) and am open to remote work and international collaborations."
        }
      },
      {
        "@type": "Question",
        "name": "Is Tran Minh Khoi available for new projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, I'm currently available for freelance projects and full-time opportunities. I typically respond within 1-2 business days to discuss potential opportunities."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Column gap="xl" marginBottom="xl">
        <Column
          className="contact-hero-card"
          gap="m"
          border="neutral-alpha-weak"
          background="page"
          radius="l"
          padding="l"
          shadow="m"
        >
          <Flex fillWidth vertical="center" wrap gap="m">
            <Avatar src={person.avatar} size="xl" />
            <Column gap="4">
              <Heading variant="display-strong-s">{person.name}</Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {person.role}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {person.location}
              </Text>
            </Column>
          </Flex>

          {contact.intro.display && (
            <Text variant="body-default-l" onBackground="neutral-weak">
              {contact.intro.description}
            </Text>
          )}

          <Column gap="s">
            <Text variant="label-default-s" onBackground="neutral-weak">
              EMAIL
            </Text>
            <Flex gap="s" vertical="center">
              <Icon name="email" size="s" onBackground="neutral-weak" />
              <Text variant="body-default-l">
                <a href={`mailto:${person.email}`} onClick={() => trackContactForm("email")}>
                  {person.email}
                </a>
              </Text>
            </Flex>
          </Column>

          {phone && (
            <Column gap="s">
              <Text variant="label-default-s" onBackground="neutral-weak">
                PHONE
              </Text>
              <Flex gap="s" vertical="center">
                <Icon name="phone" size="s" onBackground="neutral-weak" />
                <Text variant="body-default-l">
                  <a href={`tel:${phone}`} onClick={() => trackContactForm("phone")}>
                    {phoneDisplay}
                  </a>
                </Text>
              </Flex>
            </Column>
          )}

          <Column gap="s">
            <Text variant="label-default-s" onBackground="neutral-weak">
              WEB & SOCIAL
            </Text>
            <Flex wrap gap="s">
              {social
                .filter((item) => !["Email", "Phone"].includes(item.name))
                .map((item) => (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    variant="secondary"
                    size="s"
                    tooltip={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackExternalLink(item.link, item.name);
                      if (item.name.toLowerCase().includes("linkedin")) trackContactForm("linkedin");
                    }}
                  />
                ))}
            </Flex>
          </Column>

          <Flex direction="column" gap="s">
            <Button
              variant="tertiary"
              size="m"
              prefixIcon="person"
              fillWidth
              onClick={handleSaveContact}
            >
              Save Contact (.vcf)
            </Button>
            <Button
              href={linkedInUrl}
              variant="secondary"
              size="m"
              prefixIcon="linkedin"
              fillWidth
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactForm("linkedin")}
            >
              Connect on LinkedIn
            </Button>
          </Flex>
        </Column>

        <Column gap="l" border="neutral-alpha-weak" background="surface" radius="l" padding="l">
          {contact.location.display && (
            <Column gap="xs">
              <Flex gap="s" vertical="center">
                <Icon name="globe" size="s" onBackground="accent-weak" />
                <Heading variant="heading-strong-s">{contact.location.title}</Heading>
              </Flex>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {contact.location.description}
              </Text>
            </Column>
          )}

          {contact.availability.display && (
            <Column gap="xs">
              <Flex gap="s" vertical="center">
                <Icon name="calendar" size="s" onBackground="accent-weak" />
                <Heading variant="heading-strong-s">{contact.availability.title}</Heading>
              </Flex>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {contact.availability.description}
              </Text>
            </Column>
          )}

        </Column>
      </Column>

      {newsletter.display && <Mailchimp newsletter={newsletter} />}

      <style jsx>{`
        .contact-hero-card {
          display: flex;
          justify-content: space-between;
        }

        @media (max-width: 767px) {
          .contact-hero-card {
            min-height: 100dvh;
            padding-top: 1.25rem;
            padding-bottom: 1.25rem;
          }
        }
      `}</style>
    </>
  );
} 