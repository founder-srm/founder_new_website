"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Navbar from "../Navbar"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { supabase } from "../supabase.config"
import { useState } from "react"
import Footer from "../Footer"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
    
  }),
  phonenumber:z.string().min(9 ,{
    message:"Phone number must be at least 9 digits.",
    }).max(11,{
      message:"Phone number must be at most 11 digits.",
    }),
  email:z.string().min(2, {
    message: "please enter a valid email address.",
    
  }).email({
    message:"please enter a valid email address.",
    }),
  subject: z.string().min(10, {
    message: "please mention the idea",
    
  }).max(30, {
    message: "Please enter a subject less than 30 characters.",
  }),
  description: z.string().min(10, {
    message: "please enter the description of your idea.",
  }).max(500, {
    message: "Please enter a description less than 500 characters.",
  })

})

export default function Page() {

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phonenumber: "",
      email:"",
      subject:"",
      description:""
    },
  })

  const router = useRouter();
 
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const { data, error } = await supabase
    .from('contactentries')
    .insert([
      { 
        name: values.name,
        phone: values.phonenumber,
        email: values.email,
        subject: values.subject,
        description: values.description
      },
    ])
    .select()
    
    if (error) {
      console.error('Error inserting data:', error)
      toast.error('Error inserting data');
      return
    }
    else{
      // console.log(values)
      toast.success('Idea submitted 🚀🚀'); 
      setLoading(false);
      router.push('/')
    }
  }
  

  return (
    <main className="flex min-h-full flex-1 flex-col justify-center items-center px-6 lg:px-8 bg-[#090909]">
      <Navbar />
      <div className="flex flex-col justify-center items-center my-12">
        <h2 className="mt-10 text-center  text-2xl font-bold leading-9 trackng-tight text-white">
          Get in touch with us
        </h2>
        <h4 className= "  ">{`We'd love to hear from you! Please fill out the form below.`}</h4>
      </div>
      <section className="w-full flex flex-col justify-center items-center my-4 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 justify-center ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-10 text-center text-l font-bold leading-9 tracking-tight text-white" >
                    Name    </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Enter your name" {...field} className="mx-auto w-96" />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
                  )}
            />
            

            <FormField
            control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-10 text-center text-l font-bold leading-9 tracking-tight text-white" >
                  Email   </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Please enter your Email Address" {...field}  className="mx-auto w-96 "/>
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
                  )}
            
            />
            <FormField
            control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-10 text-center text-l font-bold leading-9 tracking-tight text-white" >
                    Phone Number   </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Please enter your phone number" {...field}  className="mx-auto w-96"/>
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
                  )}
            
            />
      

            <FormField
            control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-10 text-center text-l font-bold leading-9 tracking-tiht text-white" >
                  What do you have in mind?   </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="share your idea" {...field} className="mx-auto w-96"/>
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
                  )}
            
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mt-10 text-center text-l fot-bold leading-9 tracking-tight text-white" >
                    Describe your idea.
                  </FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="describe your idea in 100 words" {...field} className="mx-auto w-96 h-32 min-w-96 text-balance overflow-auto text-clip whitespace-nowrap "/>
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
                  )}
            />
            <Button type="submit" variant='default' disabled={loading} className="w-full">Submit</Button>
          </form>
        </Form>
      </section>
      <Footer />
    </main>
  )
}

