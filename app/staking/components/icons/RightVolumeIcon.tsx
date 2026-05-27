import { LeftVolumeIcon } from "./LeftVolumeIcon";

type IconProps = {
  className?: string;
};

export function RightVolumeIcon({ className }: IconProps) {
  const combinedClassName = ["rotate-180", className].filter(Boolean).join(" ");
  return <LeftVolumeIcon className={combinedClassName} />;
}
