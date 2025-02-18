import NavBar from "@/components/header/Navbar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            <NavBar />
            {children}
        </section>
    );
}
