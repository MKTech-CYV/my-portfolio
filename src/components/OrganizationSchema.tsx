import Script from 'next/script';
import { person, social, baseURL } from "@/resources";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseURL}/#person`,
        "name": person.name,
        "url": baseURL,
        "email": person.email,
        "jobTitle": person.role,
        "description": `I'm ${person.name}, a Vietnam-based mobile and web developer passionate about crafting seamless, high-performance applications. I specialize in building intuitive user experiences, bridging design and technology across platforms with modern tools and frameworks like React Native, Laravel, and Node.js. I'm currently working as a Senior Software Engineer at VietnamWorks, where I lead a team of developers to build and maintain the company's core products.`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": person.location,
          "addressCountry": "VN"
        },
        "sameAs": social.map(item => item.link),
        "image": {
          "@type": "ImageObject",
          "url": `${baseURL}${person.avatar}`,
          "width": 400,
          "height": 400
        },
        "knowsAbout": [
          "Mobile App Development",
          "Web Development", 
          "React Native",
          "React.js",
          "Node.js",
          "Laravel",
          "UI/UX Design",
          "SEO",
          "Database Design"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Mobile & Web Developer",
          "occupationLocation": {
            "@type": "City",
            "name": "Ho Chi Minh City"
          },
          "skills": "React Native, React.js, Node.js, Laravel, MySQL, UI/UX Design"
        }
      },
      {
        "@type": "WebSite", 
        "@id": `${baseURL}/#website`,
        "url": baseURL,
        "name": `${person.name} Portfolio`,
        "description": `Portfolio website showcasing work by ${person.name}`,
        "publisher": {
          "@id": `${baseURL}/#person`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseURL}/projects?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        },
        "inLanguage": ["en", "vi"]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseURL}/#business`,
        "name": `${person.name} - Freelance Developer`,
        "description": "Professional mobile and web development services in Ho Chi Minh City, Vietnam",
        "url": baseURL,
        "telephone": "+84988204060",
        "email": person.email,
        "founder": {
          "@id": `${baseURL}/#person`
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": person.location,
          "addressCountry": "VN",
          "addressRegion": "Ho Chi Minh City"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "10.8231",
          "longitude": "106.6297"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Vietnam"
        },
        "serviceArea": {
          "@type": "Country", 
          "name": "Global"
        },
        "priceRange": "$$",
        "currenciesAccepted": "USD, VND",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, PayPal",
        "openingHours": "Mo-Fr 09:00-18:00",
        "sameAs": social.map(item => item.link)
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseURL}/#service`,
        "name": `${person.name} - Mobile & Web Development Services`,
        "provider": {
          "@id": `${baseURL}/#person`
        },
        "serviceType": "Software Development",
        "areaServed": {
          "@type": "Country",
          "name": "Vietnam"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile App Development",
                "description": "Cross-platform mobile app development using React Native"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Web Development",
                "description": "Modern web applications using React.js, Next.js, and Node.js"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "UI/UX Design",
                "description": "User interface and experience design using Figma"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 
 