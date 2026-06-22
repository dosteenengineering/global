import Index from "@/app/components/client/CsiSpecifications";

const Page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/csi`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return (
    <Index data={data.data}/>
  );
}

export default Page;