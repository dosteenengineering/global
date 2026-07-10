import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/app/models/Service";
import System from "@/app/models/System";
import Resource from "@/app/models/Resource";
import Project from "@/app/models/Project";
import Blog from "@/app/models/Blog";
import Gallery from "@/app/models/Gallery";
import Capability from "@/app/models/Capability";
import Csi from "@/app/models/Csi";
import Award from "@/app/models/Award";
import Contact from "@/app/models/Contact";
import About from "@/app/models/About";
import Faq from "@/app/models/Faq";

// Escape regex metacharacters so user input can't break or hijack the pattern
function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(req: NextRequest) {
  try {
    const { searchQuery } = await req.json();

    if (!searchQuery || typeof searchQuery !== "string" || !searchQuery.trim()) {
      return NextResponse.json({ success: true, data: [] });
    }

    await connectDB();

    const safeQuery = escapeRegex(searchQuery.trim());
    const regex = { $regex: safeQuery, $options: "i" };

    // --- SERVICES (top-level page) ---
    const serviceResults = await Service.find({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "firstSection.title": regex },
        { "firstSection.description": regex },
        { "secondSection.title": regex },
        { "secondSection.description": regex },
        { "thirdSection.title": regex },
      ],
    })
      .select("firstSection.title thirdSection.title")
      .lean();

    const formattedServices = serviceResults.map((item: any) => ({
      type: "service",
      item: {
        title: item.firstSection?.title || item.thirdSection?.title || "Service",
        slug: "solutions", // adjust if you have a dedicated top-level services page slug
      },
    }));

    // --- INDIVIDUAL SERVICE ITEMS (thirdSection.items subdocuments) ---
    const serviceItemDocs = await Service.aggregate([
      { $unwind: "$thirdSection.items" },
      {
        $match: {
          $or: [
            { "thirdSection.items.title": regex },
            { "thirdSection.items.homeTitle": regex },
            { "thirdSection.items.description": regex },
            { "thirdSection.items.metaTitle": regex },
            { "thirdSection.items.metaDescription": regex },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          type: { $literal: "service-item" },
          item: {
            title: {
              $ifNull: [
                "$thirdSection.items.homeTitle",
                "$thirdSection.items.title",
              ],
            },
            slug: "$thirdSection.items.slug",
          },
        },
      },
    ]);

    // --- SYSTEMS ---
    // System documents don't know their own parent service slug — that
    // relationship lives on the Service side, via
    // thirdSection.items.systemSection.items (an array of System ObjectIds).
    // So: 1) find matching Systems, 2) build a map of systemId -> parent
    // service-item slug by scanning Service, 3) join the two.

    const matchedSystems = await System.find({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "firstSection.title": regex },
        { "firstSection.shortTitle": regex },
        { "firstSection.subTitle": regex },
        { "firstSection.firstDescription": regex },
        { "firstSection.secondDescription": regex },
        { "firstSection.shortDescription": regex },
        { "secondSection.title": regex },
        { "secondSection.description": regex },
      ],
    })
      .select("_id slug firstSection.title firstSection.shortTitle")
      .lean();

    let systemResults: { type: string; item: { title: string; slug: string } }[] = [];

    if (matchedSystems.length > 0) {
      const matchedSystemIds = matchedSystems.map((s: any) => s._id);

      // Build systemId -> parent service-item slug map
      const parentLookup = await Service.aggregate([
        { $unwind: "$thirdSection.items" },
        {
          $match: {
            "thirdSection.items.systemSection.items": { $in: matchedSystemIds },
          },
        },
        {
          $project: {
            _id: 0,
            serviceItemSlug: "$thirdSection.items.slug",
            systemIds: "$thirdSection.items.systemSection.items",
          },
        },
      ]);

      const systemIdToParentSlug = new Map<string, string>();
      for (const entry of parentLookup) {
        for (const systemId of entry.systemIds ?? []) {
          systemIdToParentSlug.set(String(systemId), entry.serviceItemSlug);
        }
      }

      systemResults = matchedSystems
        .map((system: any) => {
          const parentSlug = systemIdToParentSlug.get(String(system._id));
          if (!parentSlug || !system.slug) return null; // skip orphaned systems, no valid route

          return {
            type: "system",
            item: {
              title:
                system.firstSection?.shortTitle ||
                system.firstSection?.title ||
                "System",
              slug: `solutions/${parentSlug}/${system.slug}`,
            },
          };
        })
        .filter((r): r is { type: string; item: { title: string; slug: string } } => r !== null);
    }

    // --- RESOURCES ---
    // Resource is a singleton page (no per-item slug field anywhere in the
    // schema), so individual matches route back to the /resources page
    // rather than a dedicated URL. We match at the category-item level
    // (secondSection.items, one per "type": technicalDocuments, videosDemos,
    // etc.) so results are still meaningful, using each category's own
    // "type" as an anchor (#type) — adjust if you render these differently.
    const resourceCategoryDocs = await Resource.aggregate([
      { $unwind: "$secondSection.items" },
      {
        $match: {
          $or: [
            { "secondSection.items.title": regex },
            { "secondSection.items.description": regex },
            { "secondSection.items.columnItems.title": regex },
            { "secondSection.items.columnItems.subItems.title": regex },
            { "secondSection.items.columnItems.subItems.subTitle": regex },
            { "secondSection.items.columnItems.subItems.tags": regex },
            { "secondSection.items.videoItems.title": regex },
            { "secondSection.items.videoItems.tags": regex },
            { "secondSection.items.brochureItems.title": regex },
            { "secondSection.items.brochureItems.tags": regex },
            { "secondSection.items.certificationItems.title": regex },
            { "secondSection.items.certificationItems.description": regex },
            { "secondSection.items.installItems.title": regex },
            { "secondSection.items.installItems.description": regex },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          type: { $literal: "resource" },
          item: {
            title: "$secondSection.items.title",
            slug: { $concat: ["resource"] },
          },
        },
      },
    ]);

    // Top-level page fields (banner, other sections) not tied to a specific category
    const resourcePageMatch = await Resource.exists({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "bannerSection.title": regex },
        { "secondSection.title": regex },
        { "secondSection.description": regex },
      ],
    });

    const resourceResults = [
      ...(resourcePageMatch
        ? [{ type: "resource", item: { title: "Resources", slug: "resource" } }]
        : []),
      ...resourceCategoryDocs,
    ];

    // --- PROJECTS (individual project subdocuments, each with its own slug) ---
    const projectDocs = await Project.aggregate([
      { $unwind: "$projects" },
      {
        $lookup: {
          from: "locations",
          localField: "projects.firstSection.location",
          foreignField: "_id",
          as: "projects.location",
        },
      },
      { $unwind: { path: "$projects.location", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "sectors",
          localField: "projects.firstSection.sector",
          foreignField: "_id",
          as: "projects.sector",
        },
      },
      { $unwind: { path: "$projects.sector", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [
            { "projects.firstSection.title": regex },
            { "projects.firstSection.status": regex },
            { "projects.firstSection.client": regex },
            { "projects.firstSection.consultant": regex },
            { "projects.firstSection.contractor": regex },
            { "projects.location.name": regex },
            { "projects.sector.name": regex },
            { "projects.secondSection.title": regex },
            { "projects.secondSection.description": regex },
            { "projects.thirdSection.title": regex },
            { "projects.fourthSection.title": regex },
            { "projects.fourthSection.items.title": regex },
            { "projects.fourthSection.items.description": regex },
            { "projects.scopeSection.items.title": regex },
            { "projects.metaTitle": regex },
            { "projects.metaDescription": regex },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          type: { $literal: "project" },
          item: {
            title: "$projects.firstSection.title",
            slug: "$projects.slug",
          },
        },
      },
    ]);

    // --- BLOGS (individual blog subdocuments, each with its own slug) ---
    const blogDocs = await Blog.aggregate([
      { $unwind: "$blogs" },
      {
        $lookup: {
          from: "categories",
          localField: "blogs.category",
          foreignField: "_id",
          as: "blogs.category",
        },
      },
      { $unwind: { path: "$blogs.category", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [
            { "blogs.title": regex },
            { "blogs.content": regex },
            { "blogs.category.name": regex },
            { "blogs.metaTitle": regex },
            { "blogs.metaDescription": regex },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          type: { $literal: "blog" },
          item: {
            title: "$blogs.title",
            slug: "$blogs.slug",
          },
        },
      },
    ]);

    const galleryItemMatch = await Gallery.exists({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "firstSection.title": regex },
        { "firstSection.description": regex },
        { "secondSection.items.title": regex },
        { "secondSection.items.date": regex },
      ],
    });

    const galleryResults = galleryItemMatch
      ? [{ type: "gallery", item: { title: "Gallery", slug: "gallery" } }]
      : [];


    const bimItemMatch = await Capability.exists({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "firstSection.title": regex },
        { "firstSection.description": regex },
        { "secondSection.title": regex },
        { "secondSection.description": regex },
        { "thirdSection.title": regex },
        { "thirdSection.description": regex },
        { "fourthSection.title": regex },
        { "fifthSection.title": regex },
        { "fifthSection.description": regex },
        { "sixthSection.title": regex },
        { "seventhSection.title": regex },
        { "eighthSection.title": regex },
        { "ninethSection.title": regex },
        { "tenthSection.title": regex },
      ],
    });

    const bimResults = bimItemMatch
      ? [{ type: "bimcapability", item: { title: "Bim Capabilities", slug: "bim-capability" } }]
      : [];


    const csiItemMatch = await Csi.exists({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "firstSection.title": regex },
        { "firstSection.description": regex },
        { "secondSection.title": regex },
        { "thirdSection.title": regex },
        { "thirdSection.description": regex },
        { "fourthSection.title": regex },
        { "fifthSection.title": regex },
        { "sixthSection.title": regex },
        { "seventhSection.title": regex },
        { "seventhSection.description": regex },
        { "eighthSection.title": regex },
        { "eighthSection.description": regex },
        { "ninethSection.title": regex },
        { "tenthSection.title": regex },
      ],
    });

    const csiResults = csiItemMatch
      ? [{ type: "csi", item: { title: "CSI Specifications", slug: "csi-specifications" } }]
      : [];


    // --- BLOGS (individual blog subdocuments, each with its own slug) ---
    const awardDocs = await Award.aggregate([
      { $unwind: "$awards" },
      {
        $lookup: {
          from: "categories",
          localField: "awards.category",
          foreignField: "_id",
          as: "awards.category",
        },
      },
      { $unwind: { path: "$awards.category", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [
            { "awards.title": regex },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          type: { $literal: "award" },
          item: {
            title: "$awards.title",
            slug: "about/recognitions",
          },
        },
      },
    ]);


    const contactMatch = await Contact.exists({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "firstSection.title": regex },
        { "firstSection.description": regex },
        { "secondSection.items.title": regex },
        { "thirdSection.title": regex },
      ],
    });

    const contactResults = contactMatch
      ? [{ type: "contact", item: { title: "Contact", slug: "contact-us" } }]
      : [];


    const aboutMatch = await About.exists({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "firstSection.title": regex },
        { "firstSection.description": regex },
        { "secondSection.title": regex },
        { "secondSection.description": regex },
        { "thirdSection.title": regex },
        { "fourthSection.title": regex },
        { "fourthSection.description": regex },
        { "sixthSection.title": regex },
        { "seventhSection.title": regex },
        { "eighthSection.title": regex },
        { "ninethSection.title": regex },
      ],
    });

    const aboutResults = aboutMatch
      ? [{ type: "about", item: { title: "Company Overview", slug: "about" } }]
      : [];


    const faqMatch = await Faq.exists({
      $or: [
        { metaTitle: regex },
        { metaDescription: regex },
        { "bannerSection.title": regex },
        { "firstSection.title": regex },
        { "secondSection.items.question": regex },
      ],
    });

    const faqResults = faqMatch
      ? [{ type: "faq", item: { title: "Faq", slug: "about/faq" } }]
      : [];

    const combined = [
      ...formattedServices,
      ...serviceItemDocs,
      ...systemResults,
      ...resourceResults,
      ...projectDocs,
      ...blogDocs,
      ...galleryResults,
      ...bimResults,
      ...csiResults,
      ...awardDocs,
      ...contactResults,
      ...aboutResults,
      ...faqResults
    ];




    return NextResponse.json({ success: true, data: combined });
  } catch (error: unknown) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}