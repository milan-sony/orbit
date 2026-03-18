import { Button } from "@/components/ui/button";
import { LogOut, Menu, Orbit, X } from "lucide-react";
import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { userAuthStore } from "../store/userAuthStore";

const navbarLinks = [
    { name: "Home", to: "/home" },
    { name: "Profile", to: "/profile" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logout } = userAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const handleLogout = () => logout(navigate);

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">

                <div className="flex h-14 items-center justify-between px-4 sm:px-6">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold">
                        <Orbit className="h-6 w-6 hover:animate-spin" />
                        <span className="hidden sm:inline">OrbitHub</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navbarLinks.map((link) => {
                                    const isActive = location.pathname === link.to;

                                    return (
                                        <NavigationMenuItem key={link.name}>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    to={link.to}
                                                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-md
                                                            ${isActive
                                                            ? "bg-accent text-accent-foreground"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                                        }`}
                                                >
                                                    {link.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    );
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>

                        <ThemeToggle />

                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMobileMenu}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen
                    ? "bg-black/40 backdrop-blur-sm opacity-100"
                    : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div
                    className={`fixed top-0 left-0 h-full w-72 bg-background shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 font-bold">
                            <Orbit className="h-6 w-6" />
                            OrbitHub
                        </Link>

                        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col p-4 space-y-2">
                        {navbarLinks.map((link) => {
                            const isActive = location.pathname === link.to;

                            return (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition
                                            ${isActive
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="pt-4 flex items-center justify-between">
                            <ThemeToggle />

                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}