import { ChevronDown, User } from "lucide-react";
import { Button } from "../ui/button";

// TODO: Implement user profile dropdown and integrate with the authentication

export default function UserProfile() {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-max p-5"
        >
            <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-lg text-muted-foreground">User</span>
            </div>
            <ChevronDown size={24} />
        </Button>
    )
}