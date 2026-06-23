import Index from "../components/client/Home/Index";

const page = async () => {
    const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, {
        next: { revalidate: 60 },
    });
    const data = await response.json();

    const solutionsResponse = await fetch(`${process.env.BASE_URL}/api/admin/service`, {
        next: { revalidate: 60 },
    });
    const solutionsData = await solutionsResponse.json();

    const projectsResponse = await fetch(`${process.env.BASE_URL}/api/admin/project`, {
        next: { revalidate: 60 },
    });
    const projectsData = await projectsResponse.json();

    const blogResponse = await fetch(`${process.env.BASE_URL}/api/admin/blog`, {
        next: { revalidate: 60 },
    });
    const blogsData = await blogResponse.json();

    const clientsResponse = await fetch(`${process.env.BASE_URL}/api/admin/clients`, {
        next: { revalidate: 60 },
    });
    const clientsData = await clientsResponse.json();

    return <Index
        data={data.data}
        solutionsRaw={solutionsData.data}
        projectsData={projectsData.data}
        blogsDataRaw={blogsData.data}
        clientsData={clientsData.data}
    />;
};

export default page;
