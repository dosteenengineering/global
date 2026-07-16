import { Metadata } from "next";
import Index from "../components/client/Home/Index";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, {
        next: { revalidate: 60 },
    });
    const { data } = await response.json();
    return buildMetadata(data.seo, pathname);
}

const page = async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, {
        next: { revalidate: 60 },
    });
    const data = await response.json();

    const solutionsResponse = await fetch(`${process.env.BASE_URL}/api/admin/service`, {
        next: { revalidate: 60 },
    });
    const solutionsData = await solutionsResponse.json();

    const projectsResponse = await fetch(`${process.env.BASE_URL}/api/admin/project`, {
        next: { revalidate: 60 },
    });
    const projectsData = await projectsResponse.json();

    const blogResponse = await fetch(`${process.env.BASE_URL}/api/admin/blog`, {
        next: { revalidate: 60 },
    });
    const blogsData = await blogResponse.json();

    const clientsResponse = await fetch(`${process.env.BASE_URL}/api/admin/clients`, {
        next: { revalidate: 60 },
    });
    const clientsData = await clientsResponse.json();

    return (
        <>
            {data?.data?.seo?.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: data.data.seo.schema }}
                />
            )}
            <Index
                data={data.data}
                solutionsRaw={solutionsData.data}
                projectsData={projectsData.data}
                blogsDataRaw={blogsData.data}
                clientsData={clientsData.data}
            />;
        </>
    )
};

export default page;
