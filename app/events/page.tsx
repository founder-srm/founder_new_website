"use client"

import { useEffect, useState } from "react";
import { supabase } from "../supabase.config";

import { 
    Card,
    CardDescription,
    CardTitle,
    CardHeader
} from "@/components/ui/card";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"


import Navbar from "../Navbar";
import { Info, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Footer from "../Footer";


interface EventList {
    id: string;
    name: string;
    description: string;
    venue: string;
    start_date: Date;
    end_date: Date;
    updated_at: string;
    banner_url: string;
    moreinfo: string;
    isfeatured: boolean;
}

export default function Page() {
    const [events, setEvents] = useState<EventList[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {

            let { data: Events, error } = await supabase 
                .from('eventslist')
                .select('*')
                .returns<EventList[]>();

            if (error) {
                toast.error('Error fetching data');
            } else {
                console.log(Events);
                setEvents(Events || []);         
                setLoading(false);
            }
        }
        fetchEvents();
    }, []);

    const numEvents = events.length;
    let numColumns;
    if (numEvents === 1) {
        numColumns = 2;
    } else if (numEvents === 2 || numEvents === 3) {
        numColumns = 3;
    }

    function ellipsisAfter25Words(text : string) {
        const words = text.split(' ');
        if (words.length > 25) {
            return words.slice(0, 25).join(' ') + '.....';
        } else {
            return text;
        }
    }
    
    function convertTimestampToDateAndTime(timestamp : Date) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getMonth()]; 
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
    
        // Format the date and time
        const formattedDate = `${day}${getDaySuffix(day)} of ${month} ${year}`;

        function getDaySuffix(day: number) {
            if (day >= 11 && day <= 13) {
                return "th";
            }

            switch (day % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        }
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'pm' : 'am'}`;
        
        // return `${formattedTime} on the ${formattedDate}`;
        return `${formattedDate}`;
    }

    return (
        <main className="w-screen h-screen flex flex-col justify-start overflow-auto bg-[#090909]">
            <Navbar />
            <section className="flex flex-col justify-start min-h-screen ">
                <h1 className=" text-center text-white font-bold text-4xl mt-5 mb-10 py-5">Events</h1>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${numColumns} gap-5 md:gap-8 lg:gap-10 mx-2 md:mx-24`}>
                    {loading? ( 
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        ))
                    ):(
                        events && events.map((event, index) => ( 
                            <Card key={index} className={`font-medium bg-[#4837ff] h-fit w-full ${ event.isfeatured ? 'col-span-full' : ''} text-gray-100 shadow-md shadow-[#8E2DE2]`} style={{ backgroundImage: `url(${event.banner_url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <CardHeader className="flex flex-col justify-between h-fit">
                                    <CardTitle className="p-5 flex items-center justify-center border rounded-xl border-gray-300 backdrop-blur-md">{event.name}</CardTitle>
                                    <CardDescription className="mx-4  flex items-end font-normal backdrop-blur-md border border-white border-dashed rounded-md">
                                        <p className="text-white text-center w-full">
                                            {ellipsisAfter25Words(event.description)}
                                        </p>
                                    </CardDescription>
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button variant={"ghost"} className="text-white rounded-3xl flex bg-[#6349f8] bg-opacity-45 backdrop-blur-md mx-auto border border-[#9289f2]">Know More</Button>
                                        </DrawerTrigger>
                                        
                                        <DrawerContent className="bg-[#0E0E0E] flex flex-col gap-3 h-fit">
                                                <DrawerHeader>
                                                    <DrawerTitle className="text-3xl mt-5 mb-4 flex justify-center text-white">{event.name}</DrawerTitle>
                                                </DrawerHeader>
                                                <DrawerDescription className="flex items-center justify-center text-center text-white">
                                                    <ResizablePanelGroup
                                                        direction="horizontal"
                                                        className=" max-w-6xl md:max-w-5xl rounded-lg border"
                                                    >
                                                        <ResizablePanel defaultSize={50}>
                                                            <div className="flex flex-col h-[200px] items-center justify-center p-6 gap-2">
                                                                <h3 className="font-bold text-xl">About {event.name}:</h3>
                                                                <p className="font-semibold">{event.description}</p>
                                                            </div>
                                                        </ResizablePanel>
                                                        <ResizableHandle withHandle className="text-black" />
                                                        <ResizablePanel defaultSize={50}>
                                                            <ResizablePanelGroup direction="vertical">
                                                            <ResizablePanel defaultSize={25}>
                                                                <div className="flex h-full items-center justify-center p-6">
                                                                <span className="font-semibold">VENUE: <Badge variant="secondary" className="">{event.venue}</Badge></span>
                                                                </div>
                                                            </ResizablePanel>
                                                            <ResizableHandle disabled />
                                                            <ResizablePanel defaultSize={50}>
                                                                <div className="flex flex-col h-full items-center justify-center p-6 gap-2">
                                                                    <span className="font-semibold text-left">START DATE: {convertTimestampToDateAndTime(event.start_date)}</span>
                                                                    <span className="font-semibold text-left">End DATE: {convertTimestampToDateAndTime(event.end_date)}</span>
                                                                </div>
                                                            </ResizablePanel>
                                                            <ResizableHandle disabled />
                                                            {/* <ResizablePanel defaultSize={25}>
                                                                <span className="flex flex-row h-full items-center justify-center p-6 gap-2 font-semibold">
                                                                    Know More: <Info onClick={() => window.open(event.moreinfo)} className=" text-white hover:bg-gray-300 hover:text-black rounded-lg transition-all duration-200 ease-in-out cursor-pointer"/>
                                                                </span>
                                                            </ResizablePanel> */}
                                                            </ResizablePanelGroup>
                                                        </ResizablePanel>
                                                    </ResizablePanelGroup>
                                                </DrawerDescription>
                                                <DrawerFooter className="flex flex-row gap-4 mx-2">
                                                    <Button className="text-black flex-1" variant='secondary'  onClick={() => router.push(`/events/register/${event.name}`)}>
                                                        Register Now
                                                    </Button>
                                                    <DrawerClose asChild>
                                                        <Button variant="destructive" className="flex flex-1 justify-center mr-10 bg-[#555555] text-white "><XCircle /></Button>
                                                    </DrawerClose>
                                                </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                </CardHeader>
                            </Card>
                        ))
                    )}
                </div>
            </section>
            <Footer />
        </main>
    );
}
