
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
        filterType: "Industry",
        array: ["Frontend", "Backend", "FullStack"],
    },
    {
        filterType: "Language",
        array: ["React", "Java", "DevOps", "Swift", "Flutter", "AWS"],
    },{
        filterType: "Salary (LPA)",
        array: ["1-10", "10-20", "20-30", "30-40", "40-50", "50-1000"],
    },
];

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: [],
        Industry: [],
        Language: [],
        "Salary (LPA)": [],

    });

    const { t } = useTranslation();
    const dispatch = useDispatch();

    // Handle selection of filters
    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => {
            const currentSelections = prevFilters[filterType];

            // Toggle selection
            const newSelections = currentSelections.includes(value)
                ? currentSelections.filter((item) => item !== value)
                : [...currentSelections, value];

            return {
                ...prevFilters,
                [filterType]: newSelections,
            };
        });
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedFilters({
            Location: [],
            Industry: [],
            Language: [],
            "Salary (LPA)": [],
        });
    };

    // Create a combined search query from the selected filters
    useEffect(() => {
        const searchQuery = Object.entries(selectedFilters)
            .flatMap(([filterType, values]) => {
                if (filterType === "Salary (LPA)") {
                    return values.map((value) => `salary:${value}`);
                }
                return values;
            })
            .join(" ")
            .trim();
         // Debug: Log searchQuery
        dispatch(setSearchedQuery(searchQuery));
    }, [selectedFilters, dispatch]);

    return (
        <motion.div
            className="w-full bg-transparent p-5 rounded-md shadow-md sm:w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="font-bold text-lg text-blue-500">{t("Filter Jobs")}</h1>
            <hr className="mt-4" />
            <div className="mt-6">
                <button
                    onClick={clearFilters}
                    className="w-fit bg-red-600 hover:bg-red-900 text-white font-bold px-1 rounded-md"
                >
                    Clear Filters
                </button>
            </div>
            {filterData.map((data, index) => (
                <div key={index} className="mt-3">
                    <h1 className="font-bold text-md text-blue-500">{data.filterType}</h1>
                    {data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        const isChecked = selectedFilters[data.filterType].includes(item);

                        return (
                            <div key={itemId} className="flex items-center space-x-2 my-2">
                                <input
                                    type="checkbox"
                                    id={itemId}
                                    checked={isChecked}
                                    onClick={() => window.scrollTo(0, 0)}
                                    onChange={() => handleFilterChange(data.filterType, item)}
                                    className="w-3 h-3 rounded-md border-2 border-blue-500 checked:bg-blue-500 checked:border-transparent"
                                />
                                <label htmlFor={itemId} className="text-white cursor-pointer">
                                    {item}
                                </label>
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* Clear Filters Button */}
            
        </motion.div>
    );
};

export default FilterCard;


