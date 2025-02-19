import NavBar from "@/components/header/Navbar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <div className="py-4 border-b bg-card shadow-md overflow-x-hidden">
                <NavBar />
            </div>
            {children}
        </section>
    );
}
