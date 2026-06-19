import Index from "@/app/components/client/GarageDoors";
const Page = async({ params }: { params: Promise<{ service: string }> }) => {
    
    const slug = (await params).service;
    const response = await fetch(
        `${process.env.BASE_URL}/api/admin/system?slug=${slug}`,
        { next: { revalidate: 60 } },
    );

    const data = await response.json();

    return <Index data={data.data}/>
};
export default Page;