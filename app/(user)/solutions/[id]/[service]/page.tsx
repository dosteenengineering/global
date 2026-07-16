import Index from "@/app/components/client/GarageDoors";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { headers } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
    const slug = (await params).service;
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
    const response = await fetch(`${process.env.BASE_URL}/api/admin/system?slug=${slug}`, {
        next: { revalidate: 60 },
    });
    const { data } = await response.json();
    if (data.seo) {
        return buildMetadata(data.seo, pathname);
    }
}

const Page = async ({ params }: { params: Promise<{ service: string }> }) => {

    const slug = (await params).service;
    const response = await fetch(
        `${process.env.BASE_URL}/api/admin/system?slug=${slug}`,
        { next: { revalidate: 60 } },
    );

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
};
export default Page;