import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";


export default function ProblemCardSkeleton() {
  return (
    <Card className={cn(
        "group pb-0",
        "flex flex-col h-full"
      )}
      >
      <CardHeader>
        <section role="group" aria-label="Problem status and difficulty tags" className="flex items-center justify-start flex-wrap gap-2 -ml-2.5">
            <Skeleton className="rounded-full h-4 w-10"/>
        </section>
        <CardTitle>
            <Skeleton className="h-6 w-1/2"/>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 flex-1">
            <Skeleton className="w-full h-20" />
        </CardDescription>
        <section role="group" aria-label="Problem tags" className="flex flex-wrap gap-2">
           {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="rounded-full h-4 w-10"/>
          ))}
        </section>
      </CardContent>
      <CardFooter className="bg-accent text-accent-foreground/40 flex justify-between items-center py-2 rounded-b-xl mt-auto">
        <Skeleton className="h-4 w-15"/>
        <Skeleton className="h-4 w-15"/>
      </CardFooter>
    </Card>
  );
}