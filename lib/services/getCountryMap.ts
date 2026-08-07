import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import CountryMap from "@/app/models/CountryMap";
import MapCategory from "@/app/models/MapCategory";

export interface CountryMapItem {
    _id: string;
    title: string;
    xValue: number;
    yValue: number;
    category: {
        _id: string;
        title: string;
    };
}

export interface CategoryWithCountries {
    _id: string;
    title: string;
    count: string;
    countries: CountryMapItem[];
}

interface MapCategoryLean {
    _id: mongoose.Types.ObjectId;
    title: string;
    count: string;
}

interface CountryMapLean {
    _id: mongoose.Types.ObjectId;
    title: string;
    xValue: number;
    yValue: number;
    category: {
        _id: mongoose.Types.ObjectId;
        title: string;
    } | null;
}

export const getCountryMapData = async (): Promise<CountryMapItem[]> => {
    await connectDB();

    const countries = await CountryMap.find({})
        .populate("category", "title")
        .sort({ createdAt: 1 })
        .lean();

    return JSON.parse(JSON.stringify(countries));
};

export const getGroupedCountryMapData = async (): Promise<CategoryWithCountries[]> => {
    await connectDB();

    const categories = await MapCategory.find({}).sort({ createdAt: 1 }).lean<MapCategoryLean[]>();
    const countries = await CountryMap.find({})
        .populate("category", "title")
        .sort({ createdAt: 1 })
        .lean<CountryMapLean[]>();

    const grouped = categories.map((category) => {
        const categoryCountries = countries.filter(
            (c) => c.category?._id?.toString() === category._id.toString()
        );

        return {
            _id: category._id.toString(),
            title: category.title,
            count: category.count,
            countries: categoryCountries,
        };
    });

    return JSON.parse(JSON.stringify(grouped));
};