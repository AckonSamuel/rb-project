import {Button} from "../ui/button";
import {Card, CardContent} from "../ui/card";

const UpgradeCard = () => {
  return (
    <Card className="col-span-1 lg:col-span-3 bg-[#CDC7BA]">
      <CardContent className="flex flex-col items-center justify-between">
        <div className="mt-12">
          <p className="text-md font-semibold">Level up your sales management to the next level</p>
          <p className="text-gray-600 text-xs">
            An any way to manage sales with care and precision
          </p>
        </div>
        <Button color="success" className="mt-4 w-full text-white bg-[#296C30]">
          Upgrate to Siohioma+
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpgradeCard;
