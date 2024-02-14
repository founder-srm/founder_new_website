'use client'
import Navbar from "@/app/Navbar";
import { supabase } from "@/app/supabase.config";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"
import { Router } from "lucide-react";



interface EventRegistration {
    name_lead: string;
    phone_lead: number;
    email_lead: string;
    registration_lead: string;
    name_first: string;
    phone_first: number;
    email_first: string ;
    registration_first: string ;
    name_second: string | null;
    registration_second: string | null;
    name_third: string | null;
    registration_third: string | null;
    name_fourth: string | null;
    registration_fourth: string | null;
    track_name: string;
    idea_desc: string;
    eventid: string | null;
    gender_lead: string;
    gender_first: string;
    gender_second: string;
    gender_third: string;
    gender_fourth: string;
}

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

export default function Page() {
    const params = useParams<{ tag: string; item: string, slug: string }>();
    const [eventid, setEventid] = useState('');

    const router = useRouter();

    useEffect(() => {
        //get event id from params
        const getEventId = async () => {
            let { data: eventslistid, error } = await supabase
            .from('eventslist')
            .select('id')
            .eq('name', params.slug);

            if (error) {
                console.log(error);
                return;
            }

            else {
                if (eventslistid) {
                    toast.success('Form fetched successfully');
                    setEventid(eventslistid[0].id || '');
                    console.log(eventslistid)
                }
            }
        }

        getEventId();
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
        console.log(values)
        toast.success('Registered successfully');
        router.push('/');
    }

    return (
        <main className="flex flex-col w-screen h-full min-h-screen bg-[#090909] text-white">
            <Navbar/>
            <section className="flex flex-col items-center justify-evenly w-full my-6 md:my-12 lg:my-24">
                <h2 className=" font-mono font-medium text-3xl w-full text-center text-white my-2">Registering for {params.slug}</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-8/12">
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <Dialog>
                            <DialogTrigger><Button>Submit</Button></DialogTrigger>
                            <DialogContent className=" bg-[#0E0E0E] text-white">
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will your final Submission. Changes will not be allowed
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-row w-full gap-2 my-4">
                                    <DialogClose className="flex-1 w-full"><Button type="button" variant='outline'  className="w-full text-black">Make some Changes</Button></DialogClose>
                                    <Button type="submit" variant='destructive' className=" flex-shrink">Submit</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </form>
                </Form>
            </section>
        </main>
    );
}
