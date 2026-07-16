import Index from "@/app/components/client/ProjectDetails/Index";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { headers } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
  const response = await fetch(`${process.env.BASE_URL}/api/admin/project?slug=${slug}`, {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  if (data.seo) {
    return buildMetadata(data.seo, pathname);
  }
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/project?slug=${slug}`,
    { next: { revalidate: 60 } },
  );

  const data = await response.json();

  const allProjectResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/project`,
    { next: { revalidate: 60 } },
  );

  const allProjectData = await allProjectResponse.json();

  return (
    <>
      {data?.data?.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.data.seo.schema }}
        />
      )}
      <Index data={data.data} allProjectData={allProjectData.data} />
    </>
  )
};

export default page;
