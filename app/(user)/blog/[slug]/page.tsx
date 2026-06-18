import Index from "@/app/components/client/BlogDetails";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/blog?slug=${slug}`,
    { next: { revalidate: 60 } },
  );

  const data = await response.json();

  const allBlogResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/blog`,
    { next: { revalidate: 60 } },
  );

  const allBlogData = await allBlogResponse.json();

  return <Index data={data.data} allBlogData={allBlogData.data}/>;
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  

export default page;                                                                                                                                                                                                                                                                                                                                                                                        