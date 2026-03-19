import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig, gallery } from "@/resources";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    images: post.metadata.images?.map((image: string) => ({
      url: `${baseURL}${image}`,
      title: post.metadata.title,
      caption: post.metadata.summary
    })) || []
  }));

  const works = getPosts(["src", "app", "projects", "projects"]).map((post) => ({
    url: `${baseURL}/projects/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    images: post.metadata.images?.map((image: string) => ({
      url: `${baseURL}${image}`,
      title: post.metadata.title,
      caption: post.metadata.summary
    })) || []
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route as keyof typeof routesConfig]);

  const routes = activeRoutes.map((route) => {
    let priority = 0.5;
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'monthly';
    
    // Set priority and frequency based on route importance
    if (route === '/') {
      priority = 1.0;
      changeFrequency = 'weekly';
    } else if (route === '/projects') {
      priority = 0.9;
      changeFrequency = 'weekly';
    } else if (route === '/contact') {
      priority = 0.8;
      changeFrequency = 'monthly';
    }

    return {
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency,
      priority,
      images: route === '/gallery' ? gallery.images.map(image => ({
        url: `${baseURL}${image.src}`,
        title: image.alt,
        caption: `Gallery image from ${baseURL}`
      })) : []
    };
  });

  return [...routes, ...blogs, ...works];
}
