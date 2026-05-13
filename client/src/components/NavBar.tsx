import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="h-nav bg-base-300 not-dark:bg-card z-10">
      <div className="mx-auto max-w-[90%] py-2 px-1">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-primary tracking-tight shrink-0">Note App</h1>
          <p className="text-primary font-bold text-xs tracking-tight text-center leading-tight">
            MADE BY LINDOKUHLE MTHOMBENI
          </p>
          <Link
            to="/create"
            className="btn btn-primary btn-sm rounded-full shrink-0"
          >
            <PlusIcon className="size-4" />
            <span className="hidden sm:inline">New Note</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
