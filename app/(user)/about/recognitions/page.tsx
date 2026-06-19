import Index from "@/app/components/client/recognitions/Index";

const Page = async() => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/award`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return <Index data={data.data}/>;
};

export default Page;
