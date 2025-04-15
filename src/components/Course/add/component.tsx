import React, { ReactNode } from "react";

interface ComponentsProps {
    children: ReactNode;
}

export default function AddCourseComponents({ children }: ComponentsProps) {
    return (
        <div className="flex-1 w-full h-full">
            {children}
        </div>
    );
}