import { ArrowRight, Orbit } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "../../components/theme-toggle";

export default function IndexPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">

            {/* Header */}
            <header className="w-full flex justify-end px-4 py-4 sm:px-6">
                <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6">

                <Card className="w-full max-w-sm sm:max-w-md shadow-xl border bg-card">
                    <CardContent className="p-6 sm:p-8 text-center">

                        {/* Icon */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 bg-muted rounded-2xl flex items-center justify-center">
                            <Orbit className="w-10 h-10 sm:w-12 sm:h-12 text-foreground hover:animate-spin transition" />
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 tracking-wide">
                            OrbitHub
                        </h1>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 max-w-xs sm:max-w-sm mx-auto leading-relaxed">
                            Take control of your day, sync your life, and stay focused on what matters.
                        </p>

                        {/* CTA */}
                        <Link to="/login" className="block">
                            <Button
                                className="w-full h-11 sm:h-12 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>

                    </CardContent>
                </Card>

            </main>
        </div>
    );
}