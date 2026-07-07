import Index from "@/app/components/client/Contact-us/Index";

const page = async () => {

  const response = await fetch(`${process.env.BASE_URL}/api/admin/contact`, {

    next: { revalidate: 60 },

  });
  const data = await response.json();

  const systemResponse = await fetch(`${process.env.BASE_URL}/api/admin/system`, {

    next: { revalidate: 60 },

  });

  const systemData = await systemResponse.json();

  return <Index data={data.data} systemData={systemData.data} />;
  
};

export default page;
