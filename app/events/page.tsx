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

import Navbar from "../Navbar";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";


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
    
    function convertTimestampToDateAndTime(timestamp : Date) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[date.getMonth()]; // Months are 0-based in JavaScript
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
    
        // Format the date and time
        const formattedDate = `${day} ${month} ${year}`;
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <main className="w-screen h-screen flex flex-col overflow-auto bg-[#090909]">
            <Navbar />
            <section className="flex-grow py-6">
                <h1 className=" text-center text-white font-bold text-4xl mt-5 mb-10 py-5">Events</h1>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${numColumns} gap-5 md:gap-8 lg:gap-10 px-4`}>
                    {events && events.map((event, index) => (
                        <Card key={index} className="font-medium bg-[#4837ff] text-gray-100">
                            <CardHeader className="flex flex-col justify-between h-80">
                                <CardTitle className="p-5 flex items-center justify-center border rounded-xl border-gray-300">{event.name}</CardTitle>
                                <CardDescription className="mb-0 mt-auto text-white flex items-end font-normal">{event.venue}</CardDescription>
                                
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Button variant={"ghost"} className="text-black rounded-3xl flex bg-[#6349f8] mx-auto border border-[#9289f2]">Show More</Button>
                                    </DrawerTrigger>
                                    
                                    <DrawerContent className="bg-[#090909] flex flex-col gap-3 h-fit">
                                            <DrawerHeader>
                                                <DrawerTitle className="text-3xl mt-5 mb-4 flex justify-center text-white">{event.name}</DrawerTitle>
                                            </DrawerHeader>
                                            <DrawerDescription className="flex items-center justify-center text-center text-white">
                                                <ResizablePanelGroup
                                                    direction="horizontal"
                                                    className=" max-w-5xl rounded-lg border"
                                                >
                                                    <ResizablePanel defaultSize={50}>
                                                        <div className="flex h-[200px] items-center justify-center p-6">
                                                        <span className="font-semibold">{event.description}</span>
                                                        </div>
                                                    </ResizablePanel>
                                                    <ResizableHandle />
                                                    <ResizablePanel defaultSize={50}>
                                                        <ResizablePanelGroup direction="vertical">
                                                        <ResizablePanel defaultSize={25}>
                                                            <div className="flex h-full items-center justify-center p-6">
                                                            <span className="font-semibold">VENUE: <Badge variant="secondary" className="">{event.venue}</Badge></span>
                                                            </div>
                                                        </ResizablePanel>
                                                        <ResizableHandle />
                                                        <ResizablePanel defaultSize={75}>
                                                            <div className="flex flex-col h-full items-center justify-center p-6">
                                                                <span className="font-semibold">START DATE: {convertTimestampToDateAndTime(event.start_date)}</span>
                                                                <span className="font-semibold">End DATE: {convertTimestampToDateAndTime(event.end_date)}</span>
                                                            </div>
                                                        </ResizablePanel>
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
                    ))}
                </div>
            </section>
        </main>
    );
}
