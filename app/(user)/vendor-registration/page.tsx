import Index from "@/app/components/client/BecomePartner";
import { headers } from 'next/headers';
import { buildMetadata } from '@/lib/seo/buildMetadata';

export async function generateMetadata() {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") ?? headersList.get("x-invoke-path") ?? "/";
    const response = await fetch(`${process.env.BASE_URL}/api/admin/become-a-partner`, {
        next: { revalidate: 60 },
    });
    const { data } = await response.json();
    if (data.seo) {
        return buildMetadata(data.seo, pathname);
    }
}

const Page = async() => {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/become-a-partner`, {
        next: { revalidate: 60 },
    });
    const data = await response.json();
    return (
        <Index data={data.data}/>
    )
}

export default Page;