import Link from "next/link";
import SearchBar from "./SearchBar";

export default function NavBar({ startLoading }) {
    return (
        <div className="flex items-center justify-between w-full bg-gradient-to-r from-dark-violet to-purple-600 overflow-x-hidden">
            <Link href="/">
                <div className="flex items-center justify-between h-full gap-2 p-4 cursor-pointer">
                    <div className="h-6 bg-logo aspect-square rounded-full bg-white"></div>

                    <div className="text-2xl font-semibold text-white">
                        MTG Hub
                    </div>
                </div>
            </Link>

            <SearchBar startLoading={startLoading} />
        </div>
    );
}
