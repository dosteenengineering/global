import Index from "@/app/components/client/BlogDetails";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { headers } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
  const response = await fetch(`${process.env.BASE_URL}/api/admin/blog?slug=${slug}`, {
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
    `${process.env.BASE_URL}/api/admin/blog?slug=${slug}`,
    { next: { revalidate: 60 } },
  );

  const data = await response.json();

  const allBlogResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/blog`,
    { next: { revalidate: 60 } },
  );

  const allBlogData = await allBlogResponse.json();

  return (
    <>
      {data?.data?.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.data.seo.schema }}
        />
      )}
      <Index data={data.data} allBlogData={allBlogData.data} />
    </>
  )
};

export default page;                                                                                                                                                                                                                                                                                                                                                                                        