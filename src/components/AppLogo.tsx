
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-2 font-semibold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9333ea"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 5v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
        <path d="M12 13V7" />
        <path d="M9 10h6" />
        <path d="M9 17h6" />
      </svg>
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Scale<sup>+</sup> Caption
      </span>
    </Link>
  );
};

export default AppLogo;
