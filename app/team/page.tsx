'use client'
import { useEffect, useState } from "react";
import { supabase } from "../supabase.config";
import { toast } from "sonner"
import { Card } from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Skeleton } from "@/components/ui/skeleton"
  
import Image from "next/image";
import Navbar from "../Navbar";
import { Instagram, Linkedin, Mail } from "lucide-react";
import Footer from "../Footer";

interface TeamData {
    id: number;
    name: string;
    rollno: string;
    image: string;
    position: string;
    tagline: string;
    socials: {
        email: string;
        instagram: string;
        linkedin: string;
    };
}

export default function Page() {

    const [teamData, setTeamData] = useState<TeamData[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // setLoading(true);
            const { data , error } = await supabase 
                .from('team')
                .select(`name, rollno, image, position, tagline, socials`)
                .order('id', { ascending: true })
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
            setLoading(false);
        };

        fetchData();
            
    }, []);

    function processString(input : string) {
        return input.replace(/\s+/g, '').toLowerCase();
    }

    return (
        <main className="w-screen min-h-screen h-full flex flex-col  bg-[#0E0E0E] overflow-auto">
            <Navbar />
            <section className="w-full flex flex-col items-center">
                <section className=" w-11/12 my-28  grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 h-fit justify-center items-center">
                   { loading ? ( 
                        Array.from({ length: 9 }).map((_, index) => (
                            <div key={index} className={`flex flex-col w-full ${index === 0 && 'col-span-full w-full gap-12'} gap-3`}>
                                <Skeleton className={` ${ index == 0 ? 'h-[250px] w-[90vw]' : 'h-[150px] w-[250px]' } rounded-xl`} />
                                <div className="space-y-4">
                                    <Skeleton className={`${index === 0 ? 'h-full w-full col-span-full' : 'h-4 w-[250px]'}`} />
                                    <Skeleton className={`${index === 0 ? 'h-full w-full col-span-full' : 'h-4 w-[200px]'}`} />
                                </div>
                            </div>
                        ))
                        ) : (
                        teamData && teamData.sort((a, b) => a.id - b.id).map((teamMember) => (
                            <Card className={`flex flex-col items-center justify-between p-2 h-96 gap-2 bg-[#262626] text-white ${ teamMember.position === 'President' ? 'col-span-full w-full' : 'w-full md:w-[300px]'}`}>
                                <Image src={teamMember.image} alt={teamMember.name} width={300} height={300} className="w-[150px] h-[150px] flex rounded-full border border-white object-cover my-4" />
    
                                <div className="flex flex-col gap-2 text-center">
                                    <h1 className=" font-sans font-medium text-lg">{teamMember.name}</h1>
                                    <p className=" font-mono font-normal text-base">{teamMember.position}</p>
                                </div>
                                <HoverCard>
                                    <HoverCardTrigger className="my-2 font-light italic cursor-pointer">@{processString(teamMember.name)}</HoverCardTrigger>
                                    <HoverCardContent className=" bg-[#090909] text-white flex flex-col w-fit gap-4">
                                        <div className="flex justify-between items-center space-x-4">
                                            <Image src='/logo-white.png' width={25} height={25} alt="club logo" className="h-[32px] w-auto" />
                                            <div className="space-y-1 flex flex-col justify-between">
                                                <h4 className="text-sm font-medium w-fit text-left text-wrap italic my-1">{`"${teamMember.tagline}"`}</h4>
                                                <div className="flex flex-row w-full gap-2 justify-around">
                                                    <Mail className="hover:text-blue-600 cursor-pointer hover:scale-125 transition-all 250ms ease-in-out" onClick={() => window.open(`mailto:${teamMember.socials.email}`)} />
                                                    <Instagram className=" hover:text-purple-600  cursor-pointer hover:scale-125 transition-all 250ms ease-in-out" onClick={() => window.open(teamMember.socials.instagram)} />
                                                    <Linkedin className=" hover:text-blue-600 cursor-pointer hover:scale-125 transition-all 250ms ease-in-out" onClick={() => window.open(teamMember.socials.linkedin)} />
                                                </div>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </Card>
                            ))
                        )
                    }
                </section>
            </section>
            <Footer />
        </main>
    );
}
