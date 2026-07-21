import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/app/models/Service";
import { verifyAdmin } from "@/lib/verifyAdmin";
import Residential from "@/app/models/Residential";
import "@/app/models/System"


// export async function GET(request: NextRequest) {
//   try {
//     await connectDB();

//     const id = request.nextUrl.searchParams.get("id");
//     const slug = request.nextUrl.searchParams.get("slug");

//     const service = await Service.findOne().populate(
//       "thirdSection.items.systemSection.items"
//     );

//     if (!service) {
//       return NextResponse.json(
//         { message: "Service not found" },
//         { status: 404 }
//       );
//     }

//     // Return all services
//     if (!id && !slug) {
//       return NextResponse.json(
//         {
//           data: service,
//           message: "Service fetched successfully",
//         },
//         { status: 200 }
//       );
//     }

//     const itemIndex = service.thirdSection.items.findIndex((item: any) => {
//       if (id) {
//         return item._id.toString() === id;
//       }

//       return item.slug === slug;
//     });

//     if (itemIndex === -1) {
//       return NextResponse.json(
//         { message: "Service not found" },
//         { status: 404 }
//       );
//     }

//     const item = service.thirdSection.items[itemIndex];

//     // Residential page
//     if (
//       itemIndex === 0 ||
//       item.slug === "residential-developments"
//     ) {
//       const residential = await Residential.findOne().populate(
//         "systemSection.items"
//       );

//       return NextResponse.json(
//         {
//           data: residential,
//           type: "RESIDENTIAL",
//           message: "Residential service fetched successfully",
//         },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       {
//         data: item,
//         type: "NORMAL",
//         message: "Individual service fetched successfully",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(request: NextRequest) {
//     try {
//         const body = await request.json();

//         const isAdmin = await verifyAdmin(request);

//         if (!isAdmin) {
//             return NextResponse.json(
//                 { message: "Unauthorized" },
//                 { status: 401 }
//             );
//         }

//         await connectDB();

//         const id = request.nextUrl.searchParams.get("id");

//         if (!id) {
//             const service = await Service.findOneAndUpdate(
//                 {},
//                 body,
//                 {
//                     upsert: true,
//                     new: true,
//                     runValidators: true,
//                 }
//             );

//             return NextResponse.json(
//                 {
//                     data: service,
//                     message: "Service updated successfully",
//                 },
//                 { status: 200 }
//             );
//         }

//         const service = await Service.findOne();

//         if (!service) {
//             return NextResponse.json(
//                 { message: "Service not found" },
//                 { status: 404 }
//             );
//         }

//         const itemIndex = service.thirdSection.items.findIndex(
//             (item: any) => item._id.toString() === id
//         );

//         if (itemIndex === -1) {
//             return NextResponse.json(
//                 { message: "Service not found" },
//                 { status: 404 }
//             );
//         }

//         // FIRST SERVICE
//         if (itemIndex === 0) {
//             const residential = await Residential.findOneAndUpdate(
//                 {},
//                 body,
//                 {
//                     upsert: true,
//                     new: true,
//                     runValidators: true,
//                 }
//             );

//             return NextResponse.json(
//                 {
//                     data: residential,
//                     type: "RESIDENTIAL",
//                     message: "Residential service updated successfully",
//                 },
//                 { status: 200 }
//             );
//         }

//         // OTHER SERVICES
//         service.thirdSection.items[itemIndex] = {
//             ...service.thirdSection.items[itemIndex].toObject(),
//             ...body,
//         };

//         await service.save();

//         return NextResponse.json(
//             {
//                 data: service.thirdSection.items[itemIndex],
//                 type: "NORMAL",
//                 message: "Individual service updated successfully",
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.log(error);

//         return NextResponse.json(
//             { message: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

// api/admin/service/route.ts

export async function GET(request: NextRequest) {
    await connectDB();

    const id = request.nextUrl.searchParams.get("id");
    const slug = request.nextUrl.searchParams.get("slug");

    const service = await Service.findOne().populate(
        "thirdSection.items.systemSection.items"
    ).lean() as any;

    if (!service) {
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    if (!id && !slug) {
        return NextResponse.json({ data: service, message: "Service fetched successfully" }, { status: 200 });
    }


    const item = service.thirdSection.items.find((item: any) =>
        id ? item._id.toString() === id : item.slug === slug
    );

    console.log(item)

    if (!item) {
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ data: item, message: "Service fetched successfully" }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await request.json();
    const id = request.nextUrl.searchParams.get("id");

    // No id = update the top-level service document
    if (!id) {
        const service = await Service.findOneAndUpdate({}, body, { upsert: true, new: true });
        return NextResponse.json({ data: service, message: "Service updated successfully" }, { status: 200 });
    }

    // Update a specific item in thirdSection.items
    const service = await Service.findOne();
    if (!service) return NextResponse.json({ message: "Service not found" }, { status: 404 });

    const itemIndex = service.thirdSection.items.findIndex(
        (item: any) => item._id.toString() === id
    );

    if (itemIndex === -1) return NextResponse.json({ message: "Service not found" }, { status: 404 });

    service.thirdSection.items[itemIndex] = {
        ...service.thirdSection.items[itemIndex].toObject(),
        ...body,
    };

    await service.save();

    return NextResponse.json({
        data: service.thirdSection.items[itemIndex],
        message: "Service updated successfully"
    }, { status: 200 });
}