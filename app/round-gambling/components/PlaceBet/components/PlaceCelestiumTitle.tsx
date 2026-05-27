import Image from "next/image";
import celestiumChartIcon from "../../../assets/celestium-chart-icon.svg";

export const PlaceCelestiumTitle = () => {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase">
        PLACE A CELESTIUM
      </h1>
      <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 shrink-0">
        <Image
          src={celestiumChartIcon}
          alt="CELESTIUM"
          width={80}
          height={80}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
};

