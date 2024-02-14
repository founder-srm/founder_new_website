'use client'
import Navbar from "@/app/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { string } from "zod";

export default function Page() {
    const params = useParams<{ tag: string; item: string }>();

    console.log(params);
    return (
        <main className="flex flex-col w-screen h-full min-h-screen bg-[#090909] text-white">
            <Navbar/>

        </main>
    );
}
