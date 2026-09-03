import { headers } from "next/headers";
import { Metadata } from "next";
import Index from "../components/client/Home/Index";
import { buildMetadata } from "@/lib/seo/buildMetadata";
// import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
    // const headersList = await headers();
    // const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
    const pathname = "/";
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, {
        next: { revalidate: 60 },
    });
    const { data } = await response.json();
    return buildMetadata(data.seo, pathname);
}

const page = async () => {
    const headersList = await headers();
    const isMobile = /iPhone|Android|Mobile/i.test(headersList.get("user-agent") || "");

    const homeResponse = await fetch(`${process.env.BASE_URL}/api/admin/home`, { next: { revalidate: 60 } });
    const data = await homeResponse.json();

    // Don't await these yet — pass the promises down
    const solutionsPromise = fetch(`${process.env.BASE_URL}/api/admin/service`, { next: { revalidate: 60 } }).then(r => r.json()).then(r => r.data);
    const projectsPromise = fetch(`${process.env.BASE_URL}/api/admin/project`, { next: { revalidate: 60 } }).then(r => r.json()).then(r => r.data);
    const blogPromise = fetch(`${process.env.BASE_URL}/api/admin/blog`, { next: { revalidate: 60 } }).then(r => r.json()).then(r => r.data);
    const clientsPromise = fetch(`${process.env.BASE_URL}/api/admin/clients`, { next: { revalidate: 60 } }).then(r => r.json()).then(r => r.data);

    return (
        <>
            {data?.data?.seo?.schema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data.data.seo.schema }} />
            )}
            <meta name="google-site-verification" content="hZyAIQtKPqfRlekVS-u08KUWqOVWoHfxoc1D3HogB2E" />
            <Index
                data={data.data}
                solutionsPromise={solutionsPromise}
                projectsPromise={projectsPromise}
                blogsPromise={blogPromise}
                clientsPromise={clientsPromise}
                isMobile={isMobile}
            />
        </>
    );
};

export default page;
