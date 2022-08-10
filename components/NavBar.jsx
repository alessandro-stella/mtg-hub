import Image from "next/image";

export default function NavBar() {
    return (
        <div className="flex items-center justify-between w-full bg-gradient-to-r from-dark-violet to-purple-600">
            <div className="flex items-center justify-between h-full gap-2 p-4">
                <div className="h-full min-w-[2em] bg-logo aspect-square rounded-full bg-white"></div>

                <div className="text-2xl w-fit font-semibold text-white">MTG Hub</div>
            </div>
        </div>
    );
}
