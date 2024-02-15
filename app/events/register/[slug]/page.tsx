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
    name_lead: z.string().min(2, {
      message: "your name must be at least 2 characters.",
    }),
    name_first: z.string().min(2, {
      message: "your name must be at least 2 characters.",
    }),
    name_second: z.string().min(2, {
      message: "your name must be at least 2 characters.",
    }).nullable(),
    name_third: z.string().min(2, {
      message: "your name must be at least 2 characters.",
    }).nullable(),
    name_fourth: z.string().min(2, {
      message: "your name must be at least 2 characters.",
    }).nullable(),
    phone_lead: z.number().min(10, {
      message: "your phone number must be at least 10 characters.",
    }),
    phone_first: z.number().min(10, {
      message: "your phone number must be at least 10 characters.",
    }),
    email_lead: z.string().email({
      message: "your email must be a valid email.",
    }).includes('@srmist.edu.in', {
        message: "your email must be a valid SRMIST email.",
    }),
    email_first: z.string().email({
      message: "your email must be a valid email.",
    }).includes('@srmist.edu.in', {
        message: "your email must be a valid SRMIST email.",
    }),
    registration_lead: z.string().min(2, {
      message: "your registration number must be at least 2 characters.",
    }).max(15, {
        message: "your registration number must be at most 15 characters."
    }),
    registration_first: z.string().min(2, {
      message: "your registration number must be at least 2 characters.",
    }).max(15, {
        message: "your registration number must be at most 15 characters."
    }),
    registration_second: z.string().min(2, {
      message: "your registration number must be at least 2 characters.",
    }).max(15, {
        message: "your registration number must be at most 15 characters."
    }).nullable(),
    registration_third: z.string().min(2, {
      message: "your registration number must be at least 2 characters.",
    }).max(15, {
        message: "your registration number must be at most 15 characters."
    }).nullable(),
    registration_fourth: z.string().min(2, {
      message: "your registration number must be at least 2 characters.",
    }).max(15, {
        message: "your registration number must be at most 15 characters."
    }).nullable(),
    track_name: z.string(),
    idea_desc: z.string().min(15, {
      message: "your idea description must be at least 15 characters.",
    }),
    gender_lead: z.string(),
    gender_first: z.string(),
    gender_second: z.string().nullable(),
    gender_third: z.string().nullable(),
    gender_fourth: z.string().nullable(),
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
            name_lead: '',
            phone_lead: 0,
            email_lead: '',
            registration_lead: '',
            name_first: '',
            phone_first: 0,
            email_first: '',
            registration_first: '',
            name_second: '',
            registration_second: '',
            name_third: '',
            registration_third: '',
            name_fourth: '',
            registration_fourth: '',
            track_name: '',
            idea_desc: '', 
            gender_lead: '',
            gender_first: '',
            gender_second: '',
            gender_third: '',
            gender_fourth: '',
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
            <section className="flex flex-col items-center justify-evenly w-full my-6 md:my-12 lg:my-24 ">
                <h2 className=" font-mono font-medium text-3xl w-full text-center text-white my-2">Registering for {params.slug}</h2>
                <Form {...form}>
                    <form className="space-y-8 w-8/12 grid  md:grid-cols-2 gap-6 border border-white rounded-lg p-2 bg-[#0E0E0E]">
                        <FormField
                        control={form.control}
                        name="name_lead"
                        render={({ field }) => (
                            <FormItem className="mt-8">
                                <FormLabel>Name of Team Lead</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="phone_lead"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number of Team Lead</FormLabel>
                                <FormControl>
                                    <Input className="text-black" placeholder="Phone Number" type='number' {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email_lead"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email of Team Lead</FormLabel>
                                <FormControl>
                                    <Input className="text-black" placeholder="@srmist.edu.in" type='email' {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="registration_lead"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registration No. of Team Lead</FormLabel>
                                <FormControl>
                                    <Input className="text-black" placeholder="RA..." {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="name_first"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name of First Member</FormLabel>
                                <FormControl>
                                    <Input className="text-black" placeholder="Name" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="phone_first"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number of First Member</FormLabel>
                                <FormControl>
                                    <Input className="text-black" placeholder="Phone no." type="number" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email_first"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email of First Member</FormLabel>
                                <FormControl>
                                    <Input className="text-black" placeholder="@srmist.edu.in" type="email" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="registration_first"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Registration No. of First member</FormLabel>
                                <FormControl>
                                    <Input className="text-black" placeholder="RA.." {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className=" grid grid-cols-2 gap-6 md:col-span-2 border border-white m-2 border-dashed p-2 rounded-lg">
                            <h3 className="col-span-2 font-semibold text-lg w-full text-center">Optional Info</h3>
                            <FormField
                            control={form.control}
                            name="name_second"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Second Member</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="Name" value={field.value ? field.value : ''} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="registration_second"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration No. of Second member</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="RA.." value={field.value ? field.value : ''} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="name_third"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Third Member</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="Name" value={field.value ? field.value : ''} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="registration_third"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration No. of Third member</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="RA.." value={field.value ? field.value : ''} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="name_fourth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of First Member</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="Name" value={field.value ? field.value : ''} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="registration_fourth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration No. of Fourth member</FormLabel>
                                    <FormControl>
                                        <Input className="text-black" placeholder="RA.." value={field.value ? field.value : ''} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        
                        <Dialog>
                            <DialogTrigger type="button" className="col-span-2">Submit</DialogTrigger>
                            <DialogContent className=" bg-[#0E0E0E] text-white">
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will your final Submission. Changes will not be allowed
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-row w-full gap-2 my-4">
                                    <DialogClose className="flex-1 w-full"><Button type="button" variant='outline'  className="w-full text-black">Make some Changes</Button></DialogClose>
                                    <Button variant='destructive' className=" flex-shrink" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </form>
                </Form>
            </section>
        </main>
    );
}
