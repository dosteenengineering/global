import ResidentialPage from "@/app/components/client/Services/ResidentialBuildings/Index";
import DefaultServicePageIndex from "@/app/components/client/Services/CommercialBuildings/Index";
import { headers } from "next/headers";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
  const response = await fetch(`${process.env.BASE_URL}/api/admin/service?slug=${id}`, {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  if (data.seo) {
    return buildMetadata(data.seo, pathname);
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/service?slug=${id}`,
    { next: { revalidate: 60 } },
  );

  const data = await response.json();

  const projectsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/project`,
    { next: { revalidate: 60 } },
  );

  const projectsData = await projectsResponse.json();

  if (id === "residential-developments") {
    return (
      <>
        {data?.data?.seo?.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: data.data.seo.schema }}
          />
        )}
        <ResidentialPage data={data.data} projectsData={projectsData.data.projects} />
      </>
    )
  }

  return (
    <>
      {data?.data?.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.data.seo.schema }}
        />
      )}
      <DefaultServicePageIndex data={data.data} projectsData={projectsData.data.projects} />
    </>
  )
}   
