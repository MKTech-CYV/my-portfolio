import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX, Breadcrumbs, ProjectSchema } from "@/components";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "work", "projects"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const metadata = Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
  
  return {
    ...metadata,
    alternates: {
      canonical: `${baseURL}${work.path}/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseURL}${work.path}/${post.slug}`,
      siteName: person.name,
      images: post.metadata.images?.map(image => ({
        url: `${baseURL}${image}`,
        width: 1200,
        height: 630,
        alt: post.metadata.title,
      })) || [],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.summary,
      images: post.metadata.images?.[0] ? [`${baseURL}${post.metadata.images[0]}`] : [],
      creator: '@tranminhkhoi',
      site: '@tranminhkhoi',
    },
    keywords: [
      'portfolio',
      'web development',
      'mobile development',
      'react native',
      'react js',
      'nextjs',
      'UI/UX design',
      'vietnam developer',
      'software engineer',
      'frontend developer',
      'backend developer',
      post.metadata.title.toLowerCase().split(' ').join(', '),
    ].join(', '),
    authors: [{ name: person.name, url: baseURL }],
    creator: person.name,
    publisher: person.name,
    applicationName: `${person.name} Portfolio`,
    category: 'Portfolio',
    classification: 'Business',
    other: {
      'article:author': person.name,
      'article:published_time': post.metadata.publishedAt,
      'article:modified_time': post.metadata.publishedAt,
      'article:section': 'Portfolio',
      'article:tag': 'software development, web development, mobile development',
    },
  };
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <ProjectSchema
        title={post.metadata.title}
        description={post.metadata.summary}
        images={post.metadata.images || []}
        publishedAt={post.metadata.publishedAt}
        slug={post.slug}
        team={post.metadata.team}
        link={post.metadata.link}
      />
      <Column maxWidth="xs" gap="16">
        <Breadcrumbs />
        <Button data-border="rounded" href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={`${post.metadata.title} - Project showcase image showing main features and interface`}
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
