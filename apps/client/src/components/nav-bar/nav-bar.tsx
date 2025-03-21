import { NavigationMenuList, NavigationMenu } from "../ui/navigation-menu";
import { 
  Code2, 
  Trophy, 
  BarChart, 
  Settings,
  LogOut,
} from 'lucide-react';
import NavItem from "./nav-bar-link";
import { ThemeToggle } from "../theme-toggle";
import UserProfile from "./user-profile";

const navItems = [
    {
        title: "Problems",
        url: "/problems",
        icon: Code2
    },
    {
        title: "Contests",
        url: "/contests",
        icon: Trophy
    }
]

export default function NavBar() {

    return (
        <header className="sticky top-0 z-50 w-screen h-16 border-b border-border/40 bg-background/80 backdrop-blur-md mb-12">
            <NavigationMenu className="container h-16 flex items-center justify-between px-8 max-w-full">
                <NavigationMenuList className="flex items-center justify-center flex-1">
                    <NavItem href="/" className="hover:bg-transparent" >
                            <BarChart size={24} />
                            <span className="text-primary!">OnlineJudge</span>
                    </NavItem>
                    {navItems.map((item) => (
                        <NavItem key={item.title} href={item.url}>
                                <item.icon size={24} />
                                <span>{item.title}</span>
                        </NavItem>
                    ))}
                </NavigationMenuList>
                <NavigationMenuList>
                    <ThemeToggle />
                    <UserProfile />
                </NavigationMenuList>
            </NavigationMenu>
        </header>

    )
}