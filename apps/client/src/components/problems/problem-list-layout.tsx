"use client";

import { Grid, List } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function ListLayout() {
    const [layout, setLayout] = useState<"grid" | "list" >("grid");

    useEffect(() => {
        if (layout === "list") {
            document.getElementById("problems__list")?.classList.add("md:grid-cols-1!");
        } else {
            document.getElementById("problems__list")?.classList.remove("md:grid-cols-1!");
        }
    }, [layout]);

    return (
        <section role="toolbar" aria-label="Layout options for desktop" className="hidden md:flex justify-center items-center gap-2">
            <Button 
                aria-label="Grid layout" 
                variant={layout === "grid" ? "default" : "outline"} 
                onClick={() => setLayout("grid")}
                className="size-9 rounded-full flex items-center justify-center"
            >
                <Grid className="size-4" />
            </Button>
            <Button aria-label="List layout" variant={layout === "list" ? "default" : "outline"} onClick={() => setLayout("list")} className="size-9 rounded-full flex items-center justify-center"> 
                <List className="size-4" />
            </Button>
        </section>
    );
}