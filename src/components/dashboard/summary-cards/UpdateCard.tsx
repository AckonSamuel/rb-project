/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDate } from "@/lib/utils";
import { FC } from "react";

interface UpdateData {
    data?: any;
}

const UpdateCard: FC<UpdateData> = ({ data }) => {
    // Prepare data for the Revenue Breakdown chart

    return (
        <div className="flex flex-col justify-between bg-green-900 text-white p-4 rounded-lg w-30 h-24 pb-36">
            <div className="flex items-center mb-2">
                <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Update</span>
            </div>
            <div>
            <div className="mb-1 text-gray-400 text-xs mt-2">{formatDate(data.date)}</div>
            <div className="text-sm font-semibold leading-snug">
                Sales revenue increased{" "}
                <span className="text-green-400">{data.percentage_change}</span> in 1 week
            </div>
            </div>
            <a
                href="#"
                className="mt-6 block text-gray-400 text-xs underline mb-4 hover:text-white"
            >
                See Statistics
            </a>
        </div>
    );
};

export default UpdateCard;
