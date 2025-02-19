import NavBar from "@/components/header/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
        <div className=" p-4 border-b bg-card shadow-md">
        <NavBar />
        </div>
   

      {children}
    </section>
  );
}
