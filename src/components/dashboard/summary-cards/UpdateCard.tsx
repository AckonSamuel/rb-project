/* eslint-disable @typescript-eslint/no-explicit-any */
import {formatDate} from "@/lib/utils";
import {ChevronRight} from "lucide-react";
import {FC} from "react";

interface UpdateData {
  data?: any;
}

const UpdateCard: FC<UpdateData> = ({data}) => {
  // Prepare data for the Revenue Breakdown chart

  return (
    <div className="flex flex-col justify-between bg-[#002606] text-white p-4 rounded-lg w-30 h-24 pb-36">
      <div className="flex items-center mb-2">
        <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
        <span className="text-sm font-medium">Update</span>
      </div>
      <div>
        <div className="mb-1 text-gray-400 text-xs mt-2">{formatDate(data.date)}</div>
        <div className="text-sm font-semibold leading-snug">
          Sales revenue increased <span className="text-green-400">{data.percentage_change}</span>{" "}
          in 1 week
        </div>
      </div>
      <a
        href="#"
        className=" flex mt-6 block text-gray-400 text-xs underline-none mb-4 hover:text-white"
      >
        See Statistics <ChevronRight size={15} className="my-auto" />
      </a>
    </div>
  );
};

export default UpdateCard;
