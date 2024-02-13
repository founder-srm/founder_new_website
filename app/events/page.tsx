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
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";

export default function Page() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {

            let { data: Events, error } = await supabase
                .from('eventslist')
                .select('*');
            
            if(error) console.log(error)
            else {
                // setEvents(Events ? Events.map(event => ({
                //     ...event,
                //     start_date: event.start_date ? new Date(event.start_date).toLocaleString() : null
                // })) : []);    
                setEvents(Events);         
                setLoading(false);
            }


            //      TESTING DATA
            //
            // const Events = [
            //     { id: 1, name: "Event 1", description: "Description for Event 1"},
            //     { id: 2, name: "Event 2", description: "Description for Event 2"},
            //     { id: 3, name: "Event 3", description: "Description for Event 3"},
            //     { id: 4, name: "Event 4", description: "Description for Event 4"},
            //     { id: 5, name: "Event 5", description: "Description for Event 5"},
            //     { id: 6, name: "Event 6", description: "Description for Event 6"},
            //     { id: 7, name: "Event 7", description: "Description for Event 7"},
            //     { id: 8, name: "Event 8", description: "Description for Event 8"}
            // ];
            // setEvents(Events);
            // setLoading(false);


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
    

    return (
        <main className="w-screen h-screen flex flex-col overflow-auto bg-[#090909]">
            <section className="flex-grow py-6">
                <h1 className="font-light text-center text-white font-bold text-4xl mt-5 mb-10 py-5">Events</h1>
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
                                    
                                    <DrawerContent className="bg-gray-400 flex flex-col gap-3 h-3/5 overflow-scroll" style={{scrollbarWidth: "thin", scrollbarColor: "rgba(255, 255, 255, 0.5) transparent" }}>
                                        <div className="flex justify-end">
                                            <DrawerClose asChild>
                                                <Button variant="outline" className="flex justify-center mr-10 bg-[#555555] text-white ">Close</Button>
                                            </DrawerClose>
                                        </div>
                                        <div>
                                            <DrawerHeader>
                                                <DrawerTitle className="text-3xl mt-5 mb-8 flex justify-center">{event.name}</DrawerTitle>
                                            </DrawerHeader>
                                            <DrawerDescription className="flex items-center justify-center text-center text-black">{event.description}</DrawerDescription>
                                            <DrawerDescription className="m-5 flex items-center justify-center text-black">VENUE: {event.venue}</DrawerDescription>
                                            <DrawerDescription className="m-5 flex items-center justify-center text-black">START DATE: {event.start_date}</DrawerDescription>
                                        </div>
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
