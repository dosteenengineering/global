import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import ResidentialPage from "@/app/components/client/Services/ResidentialBuildings/Index";
import DefaultServicePageIndex from "@/app/components/client/Services/CommercialBuildings/Index";
import ServiceIndex from "@/app/components/client/GarageDoors";

async function resolveSlug(slug: string) {
  const url = `${process.env.BASE_URL}/api/admin/slug-resolve?slug=${slug}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
  const resolved = await resolveSlug(slug);
  if (resolved?.data?.seo) return buildMetadata(resolved.data.seo, pathname);
}

export default async function SolutionOrServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolved = await resolveSlug(slug);
  if (!resolved) return notFound();

  const schema = resolved.data?.seo?.schema;
  const SchemaScript = schema ? (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
  ) : null;

  if (resolved.type === "solution") {
    const projectsResponse = await fetch(`${process.env.BASE_URL}/api/admin/project`, {
      next: { revalidate: 60 },
    });
    const projectsData = await projectsResponse.json();

    return resolved.data.slug === "residential" ? (
      <>{SchemaScript}<ResidentialPage data={resolved.data} projectsData={projectsData.data.projects} /></>
    ) : (
      <>{SchemaScript}<DefaultServicePageIndex data={resolved.data} projectsData={projectsData.data.projects} /></>
    );
  }

  return <>{SchemaScript}<ServiceIndex data={resolved.data} /></>;
}