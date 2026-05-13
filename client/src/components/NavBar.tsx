import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="h-16 bg-base-300 not-dark:bg-card z-10">
      <div className="mx-auto my-auto max-w-[90%] py-2 px-1">
        <div className="flex items-center justify-between">
          <h1 className="text-primary tracking-tight">Note App</h1>
          <h3 className="text-primary font-bold text-sm tracking-tight">
            MADE BY LINDOKUHLE MTHOMBENI
          </h3>
          <div className="flex items-center">
            <Link to="/create" className="btn btn-primary rounded-full">
              <PlusIcon className="size-5" /> <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
