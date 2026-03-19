import { ArrowRight, Orbit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../../components/theme-toggle";

export default function IndexPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">

            {/* Header */}
            <header className="w-full px-4 sm:px-6 py-4 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-2 font-bold text-lg">
                    <Orbit className="w-6 h-6 animate-spin" />
                    OrbitHub
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <ThemeToggle />

                    <Link to="/login">
                        <Button variant="ghost" className="text-sm">
                            Login
                        </Button>
                    </Link>
                </div>

            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6">

                {/* Icon */}
                <div className="mb-6 sm:mb-8">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-muted rounded-2xl flex items-center justify-center">
                        <Orbit className="w-12 h-12 sm:w-14 sm:h-14 text-foreground hover:animate-spin" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
                    Organize Your Life
                    <br />
                    <span className="text-primary">Effortlessly</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-md sm:max-w-xl mb-8 leading-relaxed">
                    Tasks, notes, reminders, and events - all in one place.
                    Stay focused, stay productive, and never miss what matters.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-md justify-center">
                    <Link to="/login" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto h-11 sm:h-12 px-6 text-sm sm:text-base flex items-center gap-2 group">
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        className="w-full sm:w-auto h-11 sm:h-12 px-6 text-sm sm:text-base"
                    >
                        Learn More
                    </Button>
                </div>

            </main>

            {/* Footer */}
            <footer className="text-center text-xs sm:text-sm text-muted-foreground py-4 px-4">
                © {new Date().getFullYear()} OrbitHub. All rights reserved.
            </footer>

        </div>
    );
}