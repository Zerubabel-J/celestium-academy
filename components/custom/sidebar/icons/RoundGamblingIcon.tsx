export interface RoundGamblingIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const RoundGamblingIcon: React.FC<RoundGamblingIconProps> = ({
  size = 24,
  color = "#6A6F84",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      fill={color}
    />
    <path
      d="M12 2v4M12 18v4M22 12h-4M6 12H2"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M18.364 5.636l-2.828 2.828M8.464 15.536l-2.828 2.828M18.364 18.364l-2.828-2.828M8.464 8.464l-2.828-2.828"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export default RoundGamblingIcon;
