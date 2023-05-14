import { UserButton } from "@clerk/nextjs";

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
            <div className="text-2xl font-bold">Muiscol</div>
            <div className="px-4 py-2 focus:bg-gray-100">
                <UserButton />
            </div>
      </nav>
    );
}