import { baseURL, person } from "@/resources";

interface ProjectSchemaProps {
  title: string;
  description: string;
  images: string[];
  publishedAt: string;
  slug: string;
  team?: Array<{
    name: string;
    role: string;
    avatar: string;
    linkedIn?: string;
  }>;
  link?: string;
}

export function ProjectSchema({ 
  title, 
  description, 
  images, 
  publishedAt, 
  slug, 
  team, 
  link 
}: ProjectSchemaProps) {
  const projectUrl = `${baseURL}/work/${slug}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${projectUrl}/#webpage`,
        "url": projectUrl,
        "name": title,
        "description": description,
        "datePublished": publishedAt,
        "dateModified": publishedAt,
        "author": {
          "@type": "Person",
          "name": person.name,
          "url": baseURL,
          "image": `${baseURL}${person.avatar}`,
        },
        "publisher": {
          "@type": "Organization",
          "name": person.name,
          "url": baseURL,
          "logo": {
            "@type": "ImageObject",
            "url": `${baseURL}${person.avatar}`,
          },
        },
        "mainEntity": {
          "@id": `${projectUrl}/#project`
        },
        "image": images.map(image => `${baseURL}${image}`),
        "inLanguage": "en",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseURL}/#website`
        }
      },
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}/#project`,
        "name": title,
        "description": description,
        "url": projectUrl,
        "dateCreated": publishedAt,
        "datePublished": publishedAt,
        "creator": team?.map(member => ({
          "@type": "Person",
          "name": member.name,
          "jobTitle": member.role,
          "image": `${baseURL}${member.avatar}`,
          "url": member.linkedIn,
        })) || [{
          "@type": "Person",
          "name": person.name,
          "jobTitle": person.role,
          "image": `${baseURL}${person.avatar}`,
          "url": baseURL,
        }],
        "image": images.map(image => ({
          "@type": "ImageObject",
          "url": `${baseURL}${image}`,
          "description": `${title} project screenshot`,
        })),
        "genre": "Software Development",
        "keywords": [
          "Web Development",
          "Mobile Development", 
          "React",
          "React Native",
          "UI/UX Design",
          "Frontend",
          "Backend",
          "Portfolio Project"
        ],
        "audience": {
          "@type": "Audience",
          "audienceType": "Developers, Clients, Recruiters"
        },
        "about": {
          "@type": "Thing",
          "name": "Software Development Project",
          "description": "Professional software development project showcasing technical skills and capabilities"
        },
        "workExample": link ? {
          "@type": "WebApplication",
          "name": title,
          "url": link,
          "description": description,
          "applicationCategory": "WebApplication",
          "operatingSystem": "Web Browser, iOS, Android"
        } : undefined
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": baseURL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Projects",
            "item": `${baseURL}/work`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": projectUrl
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
} 