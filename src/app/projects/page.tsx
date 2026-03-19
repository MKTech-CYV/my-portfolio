import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work, newsletter } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Mailchimp } from "@/components";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
  
  return {
    ...metadata,
    alternates: {
      canonical: `${baseURL}${work.path}`,
    },
  };
}

export default function Work() {
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Projects />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
