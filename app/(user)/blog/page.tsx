import Index from "@/app/components/client/Blog";

const Page = async() => {
    
    const response = await fetch(`${process.env.BASE_URL}/api/admin/blog`, {
        next: { revalidate: 60 },
    });
    const data = await response.json();

    return <Index data={data.data}/>;
}

export default Page;