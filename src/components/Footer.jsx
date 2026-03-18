import { Heart, Orbit } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const formatted = now.toLocaleString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });

            setDateTime(formatted);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="border-t mt-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Top */}
                <div className="flex items-center justify-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2 font-semibold">
                        <Orbit className="h-5 w-5" />
                        <span>OrbitHub <span className="text-muted-foreground text-xs">v1.0.0</span>
                        </span>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 text-xs text-muted-foreground">

                    {/* Copyright */}
                    <div>
                        © {new Date().getFullYear()} OrbitHub. All rights reserved.
                    </div>

                    {/* Version + DateTime */}
                    <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 font-mono tabular-nums">
                        <span>{dateTime}</span>
                    </div>

                </div>

            </div>
        </footer>
    );
}