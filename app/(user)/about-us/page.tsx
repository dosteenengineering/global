import Index from '@/app/components/client/About/Index'
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
  const response = await fetch(`${process.env.BASE_URL}/api/admin/about`, {
    next: { revalidate: 60 },
  });
  const { data } = await response.json();
  if (data.seo) {
    return buildMetadata(data.seo, pathname);
  }
}

const page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/about`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return (
    <>
      {data?.data?.seo?.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.data.seo.schema }}
        />
      )}
      <Index data={data.data} />
    </>
  )
}

export default page