import Index from '@/app/components/client/Services/Index'

const page = async() => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/service`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return (
    <>
      <Index data={data.data}/>
    </>
  )
}

export default page