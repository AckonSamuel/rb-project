/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";

interface NetIncomeData {
    data: any;
}

const NetIncomeCard: FC<NetIncomeData> = ({ data }) => {
    // Prepare data for the Revenue Breakdown chart

    return (
        <div className="flex flex-col justify-between bg-white border border-gray-800 rounded-lg pt-4 px-4 pb-36 w-30 h-24 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-medium text-gray-500">Net Income</span>
                <div className="text-gray-400 text-lg font-semibold cursor-pointer">...</div>
            </div>
            <div className="text-xl font-bold text-black flex mb-6">
                <span className="text-xs mr-1">{data.currency || ""}</span>
                <p className="text-2xl">{data.amount || 0}</p> 
            </div>
            <div className="flex items-center gap-1 text-sm text-green-500">
                <svg width="8pt" height="8pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <path d="m132 1068v-1068h-132v1200h1200v-132z" fill="#47d754" />
                    <path d="m852.37 283.31 91.898 70.582-191.73 230.98-215.12-170.7-307.74 358.97 77.062 66.07 244.04-284.78 216.27 171.68 257.56-309.61 91.391 71.074v-270.78z" fill="#47d754" />
                </svg>

                <p className="text-xs"> +{data.percentage_change || 0}</p> <p className="text-gray-500 ml-1 text-xs">from last month</p>
            </div>
        </div>
    );
};

export default NetIncomeCard;
