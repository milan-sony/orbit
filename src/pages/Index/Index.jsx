import { PlayCircle, ArrowRight, AudioLines, Orbit } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "../../components/theme-toggle";

export default function IndexPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Header with Theme Toggle */}
            <div className="flex justify-end p-6 pt-6 max-w-full mx-auto w-full">
                <ThemeToggle />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-8">
                <Card className="w-full max-w-md shadow-xl border dark:border-border bg-card">
                    <CardContent className="p-8 text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto mb-8 bg-muted rounded-2xl flex items-center justify-center">
                            <Orbit className="w-12 h-12 text-foreground hover:animate-spin" />
                        </div>

                        {/* Title */}
                        <h1 className="text-xl md:text-4xl font-black mb-4 font-roboto uppercase tracking-wide">
                            orbit
                        </h1>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed font-roboto-mono">
                            Take control of your day, sync your life, and stay focused on what matters.
                        </p>

                        {/* Call to Action */}
                        <Link to="/login">
                            <Button className="w-full h-12 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group font-roboto-mono">
                                Get Started
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
