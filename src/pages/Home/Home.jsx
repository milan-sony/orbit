import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { userAuthStore } from "../../store/userAuthStore";
import { menuItems } from "../../utils/constants";
import { Link } from "react-router-dom";

function Home() {
    const { user } = userAuthStore();

    return (
        <>
            <div className="p-4 sm:p-6 lg:p-8 space-y-6">

                {/* Greeting */}
                <h1 className="text-xl sm:text-2xl font-semibold">
                    Hi {user?.firstName} 👋🏻
                </h1>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                    {menuItems.map((item, index) => (
                        <Card key={index} className="w-full">
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>
                                    {item.smallDesc}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p>
                                    {item.desc}
                                </p>
                            </CardContent>

                            <CardFooter>
                                <Button size="sm" className="w-full" asChild>
                                    <Link to={item.to}>
                                        Set {item.name}
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;