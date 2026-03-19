import { redirect } from "next/navigation";

type WorkSlugRedirectPageProps = {
  params: Promise<{ slug: string | string[] }>;
};

export default async function WorkSlugRedirectPage({ params }: WorkSlugRedirectPageProps) {
  const routeParams = await params;
  const slug = Array.isArray(routeParams.slug) ? routeParams.slug.join("/") : routeParams.slug;

  redirect(`/projects/${slug}`);
}

