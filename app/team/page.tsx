'use client'
import { useEffect, useState } from "react";
import { supabase } from "../supabase.config";
import { toast } from "sonner"
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface TeamData {
    name: string;
    rollno: string;
    image: string;
    position: string;
    tagline: string;
}

export default function Page() {

    const [teamData, setTeamData] = useState<TeamData[]>();

    useEffect(() => {
        const fetchData = async () => {
            const { data , error } = await supabase 
                .from('team')
                .select(`name, rollno, image, position, tagline`)
                .returns<TeamData[]>();

            if (error) {
                console.log('Error fetching data:', error);
                toast.error('Error fetching data');
                return;
            }
            else {
                console.log('Data fetched successfully:', data);
                setTeamData(data );
                toast.success('Data fetched successfully');
            }
        };

        fetchData();
    }, []);

    return (
        <main className="w-screen min-h-screen h-full flex flex-col bg-[#0E0E0E] overflow-auto">
            {/* Navbar */}
            <section>
                {/* Add a hero image section here */}
            </section>
            <h1 className=" font-lato text-white font-semibold text-4xl">Our Team</h1>
            <section className=" grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
                {teamData && teamData.map((teamMember) => (
                    <Card className="flex flex-col container m-2 my-4 gap-2 bg-[#262626]">
                        <Image src={teamMember.image} alt={teamMember.name} width={100} height={100} className=" w-auto h-auto rounded-lg my-6" />
                        <h1></h1>
                        <p></p>
                    </Card>
                
                ))}
            </section>
            {/* footer */}
        </main>
    );
}
