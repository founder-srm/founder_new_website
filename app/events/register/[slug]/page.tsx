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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea";




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
    }).optional().or(z.literal('')),
    name_third: z.string().min(2, {
      message: "your name must be at least 2 characters.",
    }).optional().or(z.literal('')).or(z.literal('')),
    name_fourth: z.string().min(2, {
      message: "your name must be at least 2 characters.",
    }).optional().or(z.literal('')).or(z.literal('')),
    phone_lead: z.string().min(10, {
      message: "your phone number must be at least 10 characters.",
    }).transform(Number),
    phone_first: z.string().min(10, {
      message: "your phone number must be at least 10 characters.",
    }).transform(Number),
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
    registration_second: z.string().max(15, {
        message: "your registration number must be at most 15 characters."
    }).optional().or(z.literal('')),
    registration_third: z.string().max(15, {
        message: "your registration number must be at most 15 characters."
    }).optional().or(z.literal('')),
    registration_fourth: z.string().max(15, {
        message: "your registration number must be at most 15 characters."
    }).optional().or(z.literal('')),
    track_name: z.string(),
    idea_desc: z.string().min(15, {
      message: "your idea description must be at least 15 characters.",
    }),
    gender_lead: z.string(),
    gender_first: z.string(),
    gender_second: z.string().optional().or(z.literal('')),
    gender_third: z.string().optional().or(z.literal('')),
    gender_fourth: z.string().optional().or(z.literal('')),
  })

export default function Page() {
    const params = useParams<{ tag: string; item: string, slug: string }>();
    const [eventid, setEventid] = useState('');
    const [loading, setLoading] = useState(false);
    const [File, setFile] = useState<File | null>(null);
    const [Url , setUrl] = useState('');
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

    const onUpload = async () => {

        // const randomName = Math.random().toString(36).substring(7);
        toast.success('Uploading file...');
        if (!File) {
            toast.error('No file selected');
            return;
        }
        const { data, error } = await supabase
            .storage
            .from('presentation')
            .upload(`registrations/${File.name}.pptx`, File, {
                cacheControl: '3600',
                upsert: false
            })
        if (error) {
            toast.error(`Error in uploading file: ${error.message}`);
            return;
        }
        if (data) {
            toast.success('Retrieving Url...');
            console.log(data);
        }
        const { data : fileData } = supabase
            .storage
            .from('presentatioin')
            .getPublicUrl(`registrations/${File.name}.pptx`)
        if (fileData) {
            setUrl(fileData.publicUrl )
            console.log(fileData.publicUrl);
            toast.success('File uploaded successfully \n Please submit the form now!');
        }
    } 
    
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
            .from('eventsregistration')
            .insert([
                {
                    name_lead: values.name_lead,
                    phone_lead: values.phone_lead,
                    email_lead: values.email_lead,
                    registration_lead: values.registration_lead,
                    name_first: values.name_first,
                    phone_first: values.phone_first,
                    email_first: values.email_first,
                    registration_first: values.registration_first,
                    name_second: values.name_second,
                    registration_second: values.registration_second,
                    name_third: values.name_third,
                    registration_third: values.registration_third,
                    name_fourth: values.name_fourth,
                    registration_fourth: values.registration_fourth,
                    track_name: values.track_name,
                    idea_desc: values.idea_desc,
                    // eventid: eventid,
                    presentation_link: Url,
                    gender_lead: values.gender_lead,
                    gender_first: values.gender_first,
                    gender_second: values.gender_second,
                    gender_third: values.gender_third,
                    gender_fourth: values.gender_fourth,  
                },
            ])
            .select()
            
            console.log(data)
            console.log(error)
            if(error){
                toast.error(`Error in registering: ${error.message}`);    
            }
            if( !error ) {
                console.log(values)
                toast.success('Registered successfully');
                router.push('/');
            }

        } catch (error) {
           console.log(error)
           toast.error('Error in registering');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex flex-col w-screen h-full min-h-screen bg-[#090909] text-white">
            <Navbar/>
            <section className="flex flex-col items-center justify-evenly w-full my-6 md:my-12 lg:my-24 ">
                <h2 className=" font-mono font-medium text-3xl w-full text-center text-white my-2">Registering for {params.slug}</h2>
                <Form {...form}>
                    <form className="space-y-8 w-11/12 md:w-10/12 lg:w-8/12 grid  md:grid-cols-2 lg:grid-cols-3 gap-6 border border-white rounded-lg p-2 bg-[#0E0E0E]">
                        <FormField
                        control={form.control}
                        name="name_lead"
                        render={({ field }) => (
                            <FormItem className="mt-8">
                                <FormLabel>{`Name of First member (Team Lead) `}</FormLabel>
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
                        name="phone_lead"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`Phone number of First member (Team Lead)`}</FormLabel>
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
                            name="gender_lead"
                            render={({ field }) => (
                            <FormItem className="text-black">
                                <FormLabel className="text-white">{`First member (Team Lead)'s Gender`}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your Gender " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="email_lead"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{`Email of First member (Team Lead)`}</FormLabel>
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
                                <FormLabel>{`Registration No. of First member (Team Lead)`}</FormLabel>
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
                                <FormLabel>Name of Second Member</FormLabel>
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
                                <FormLabel>Phone Number of Second Member</FormLabel>
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
                            name="gender_first"
                            render={({ field }) => (
                            <FormItem className="text-black">
                                <FormLabel className="text-white">Second Member's Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your Gender " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="email_first"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email of Second Member</FormLabel>
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
                                <FormLabel>Registration No. of Second member</FormLabel>
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
                            name="track_name"
                            render={({ field }) => (
                            <FormItem className="text-black">
                                <FormLabel className="text-white">Track</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a Track " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Ecommerce">Ecommerce</SelectItem>
                                    <SelectItem value="HealthTech">HealthTech</SelectItem>
                                    <SelectItem value="CyberSecurity">CyberSecurity</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="idea_desc"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Idea Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us a little bit about your idea"
                                    className="resize-none text-black"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" col-span-full">
                            <FormLabel>{`Presentation link (.pptx) `}</FormLabel>
                            <div className="flex flex-row gap-1">
                                <Input
                                    type="file"
                                    accept=".pptx"
                                    className="text-black"
                                    required
                                    onChange={(e) => setFile(e.target.files![0])}
                                />
                                <Button disabled={loading} variant='secondary' type="button" onClick={() => onUpload()}>Submit file</Button>
                            </div>
                            <FormDescription className=" ml-4 mt-2">{`Name the File as the Team lead's Registration Number`}</FormDescription>
                        </div>

                        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-full border border-white m-2 border-dashed p-2 rounded-lg">
                            <h3 className="col-span-full font-semibold text-lg w-full text-center">Optional Info</h3>
                            <FormField
                            control={form.control}
                            name="name_second"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Third Member</FormLabel>
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
                            name="registration_second"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration No. of Third member</FormLabel>
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
                            <FormField
                            control={form.control}
                            name="gender_second"
                            render={({ field }) => (
                            <FormItem className="text-black">
                                <FormLabel className="text-white">Third Member's Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your Gender " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="name_third"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Fourth Member</FormLabel>
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
                            name="registration_third"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration No. of Fourth member</FormLabel>
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
                            <FormField
                            control={form.control}
                            name="gender_third"
                            render={({ field }) => (
                            <FormItem className="text-black">
                                <FormLabel className="text-white">Fourth Member's Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your Gender " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="name_fourth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Fifth Member</FormLabel>
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
                            name="registration_fourth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration No. of Fifth member</FormLabel>
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
                            <FormField
                            control={form.control}
                            name="gender_fourth"
                            render={({ field }) => (
                            <FormItem className="text-black">
                                <FormLabel className="text-white">Fifth Member's Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select your Gender " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Male">Male</SelectItem>
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                            />
                        </div>
                        
                        <Dialog>
                            <DialogTrigger type="button" className="col-span-full border-white border rounded-lg p-2 hover:bg-white hover:text-black transition-all duration-300 ease-in-out ">Submit</DialogTrigger>
                            <DialogContent className=" bg-[#0E0E0E] text-white">
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will your final Submission. Changes will not be allowed
                                </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex flex-row w-full gap-2 my-4">
                                    <DialogClose className="flex-1 w-full"><Button disabled={loading} type="button" variant='outline'  className="w-full text-black">Make some Changes</Button></DialogClose>
                                    <Button disabled={loading} variant='destructive' className=" flex-shrink" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </form>
                </Form>
            </section>
        </main>
    );
}
