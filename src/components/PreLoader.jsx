import { Orbit } from "lucide-react";

export default function PreLoader() {
    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center bg-background text-center px-4">

            {/* Spinner */}
            <div className="flex items-center justify-center mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted flex items-center justify-center">
                    <Orbit className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-foreground" />
                </div>
            </div>

            {/* App Name */}
            <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
                OrbitHub
            </h1>

            {/* Loading Text */}
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 animate-pulse">
                Loading your workspace...
            </p>

        </div>
    );
}