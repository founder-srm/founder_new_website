import Link from "next/link";
import Navbar from "../Navbar";
import Footer from "../Footer";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from "next/image";

export default function Page() {
    return (
        <main className="w-screen h-full flex flex-col bg-[#090909]">
            <Navbar />
            <section className="w-full min-h-screen flex flex-col items-center justify-center my-12">
                <Card className="bg-[#0E0E0E] p-4 text-white shadow-md shadow-gray-400 ">
                    <CardHeader>
                        <CardTitle>Under Construction</CardTitle>
                        <CardDescription>We Are Working on this Page</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Image src="/dj_construction.gif" alt="under construction" width={400} height={400} className="h-[500px] w-auto"  />
                    </CardContent>
                    <CardFooter>
                        <p>We appreciate your patience</p>
                    </CardFooter>
                </Card>
            </section>
            <Footer />
        </main>
    );
}
