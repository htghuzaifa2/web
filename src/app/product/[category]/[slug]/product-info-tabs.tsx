
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductInfoTabsProps {
    description?: string;
    specifications?: Record<string, string>;
}

export default function ProductInfoTabs({ description, specifications }: ProductInfoTabsProps) {
    const hasDescription = description && description.trim() !== "";
    const hasSpecifications = specifications && Object.keys(specifications).length > 0;
    
    // Determine the default tab. If there's a description, it's the default.
    // If not, but there are specifications, they become the default.
    const defaultTab = hasDescription ? "description" : hasSpecifications ? "specifications" : "";

    if (!hasDescription && !hasSpecifications) {
        return null;
    }

    return (
        <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                {hasDescription && <TabsTrigger value="description">Description</TabsTrigger>}
                {hasSpecifications && <TabsTrigger value="specifications">Specifications</TabsTrigger>}
            </TabsList>
            {hasDescription && (
                <TabsContent value="description">
                    <div className="prose prose-lg max-w-none mx-auto mt-6 text-muted-foreground">
                        <p>{description}</p>
                    </div>
                </TabsContent>
            )}
            {hasSpecifications && (
                 <TabsContent value="specifications">
                    <div className="max-w-2xl mx-auto mt-6">
                        <ul className="space-y-3 text-muted-foreground">
                            {Object.entries(specifications).map(([key, value]) => (
                                <li key={key} className="flex justify-between border-b pb-3">
                                    <span className="font-semibold text-foreground">{key}</span>
                                    <span>{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </TabsContent>
            )}
        </Tabs>
    );
}
