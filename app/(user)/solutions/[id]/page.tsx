import ResidentialPage from "@/app/components/client/Services/ResidentialBuildings/Index";
import DefaultServicePageIndex from "@/app/components/client/Services/CommercialBuildings/Index";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/service?slug=${id}`,
    { next: { revalidate: 60 } },
  );

  const data = await response.json();

    const projectsResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/project`,
    { next: { revalidate: 60 } },
  );

  const projectsData = await projectsResponse.json();

  if (id === "residential-developments") {
    return <ResidentialPage data={data.data} projectsData={projectsData.data.projects}/>;
  }

  return <DefaultServicePageIndex data={data.data} projectsData={projectsData.data.projects}/>;
}   
