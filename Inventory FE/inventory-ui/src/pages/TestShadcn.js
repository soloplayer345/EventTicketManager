import React from "react";
import { Button } from "../components/ui/button";

const TestShadcn = () => {
    return (
        <div style={{ padding: "48px", maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ marginBottom: "32px" }}>shadcn/ui Test Page</h1>
            <p style={{ marginBottom: "24px", color: "var(--color-text-muted)" }}>
                Nếu bạn thấy các button bên dưới có style đẹp, nghĩa là shadcn/ui đã hoạt động!
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <Button variant="default">Default Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                </div>
                
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                </div>
                
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <Button disabled>Disabled</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
            </div>
            
            <div style={{ marginTop: "48px", padding: "24px", background: "hsl(var(--card))", borderRadius: "8px", border: "1px solid hsl(var(--border))" }}>
                <h2 style={{ marginBottom: "16px" }}>Card Test</h2>
                <p style={{ color: "hsl(var(--muted-foreground))" }}>
                    Đây là một card sử dụng shadcn/ui CSS variables. Nếu bạn thấy border và background đẹp, 
                    nghĩa là Tailwind CSS đã hoạt động đúng!
                </p>
            </div>
        </div>
    );
};

export default TestShadcn;

