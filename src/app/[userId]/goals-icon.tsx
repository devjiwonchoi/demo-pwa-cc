export function GoalsIcon({isActive}: {isActive: boolean}) {
  const fill = isActive ? "#015BFA" : undefined;
  const stroke = isActive ? "#015BFA" : "#292929";

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66797 3.25L8.66797 5.41667M8.66797 22.75L8.66797 14.0833M8.66797 5.41667L21.668 5.41667L19.5013 9.75L21.668 14.0833L8.66797 14.0833M8.66797 5.41667L8.66797 14.0833"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
