import Index from "@/app/components/client/Contact-us/Index";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { headers } from "next/headers";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
  const response = await fetch(`${process.env.BASE_URL}/api/admin/contact`, {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  if (data.seo) {
    return buildMetadata(data.seo, pathname);
  }
}

const page = async () => {

  const response = await fetch(`${process.env.BASE_URL}/api/admin/contact`, {

    next: { revalidate: 60 },

  });
  const data = await response.json();

  const systemResponse = await fetch(`${process.env.BASE_URL}/api/admin/system`, {

    next: { revalidate: 60 },

  });

  const systemData = await systemResponse.json();

  return (
    <>
      {data?.data?.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.data.seo.schema }}
        />
      )}
      <Index data={data.data} systemData={systemData.data} />
    </>
  )

};

export default page;
