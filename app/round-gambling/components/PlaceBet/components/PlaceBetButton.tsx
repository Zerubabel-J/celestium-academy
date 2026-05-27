import Image from "next/image";
import { Button } from "@/components/ui/button";
import coinIcon from "../../../assets/coin.svg";

interface PlaceBetButtonProps {
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
}

export const PlaceBetButton = ({
  onClick,
  disabled,
  isPending,
}: PlaceBetButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-base md:text-lg font-bold py-4 md:py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:grayscale disabled:pointer-events-none"
      size="lg"
    >
      {isPending ? (
        <div className="animate-spin">⏳</div>
      ) : (
        <>
          <span>CELESTIUM</span>
          <Image
            src={coinIcon}
            alt=""
            width={20}
            height={20}
            className="ml-2 invert"
          />
        </>
      )}
    </Button>
  );
};

