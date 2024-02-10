"use client"

import { ThemeProvider } from "@/components/ui/themeprovider"
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
  subject: z.string().min(1, {
    message: "please mention the idea",
    
  }).max(30, {
    message: "Please enter a subject less than 30 characters.",
  }),
  description: z.string().max(100, {
    message: "Please enter a description less than 100 characters.",
    
  }).min(1, {
    message: "please enter the description of your idea.",
  })

})

export default function Page() {
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
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    
    console.log(values)
  }
  // ...

  return (


     <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
    <div >

      


    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Founders club"
          />
          <h2 className="mt-10 text-center  text-2xl font-bold leading-9 trackng-tight text-white">
           Get in touch
          </h2>
          <h4 className= " w-max  ">We’d love to hear from you! Please fill out the form below.</h4>
        </div>


      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-8 justify-center ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mt-10 text-center text-l font-bold leading-9 tracking-tight text-white" >
                Name    </FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} className="mx-auto w-96" />
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
                <Input placeholder="Please enter your Email Address" {...field}  className="mx-auto w-96 "/>
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
                <Input placeholder="Please enter your phone number" {...field}  className="mx-auto w-96"/>
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
               Your Idea   </FormLabel>
              <FormControl>
                <Input placeholder="share your idea" {...field} className="mx-auto w-96"/>
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
               Description   </FormLabel>
              <FormControl>
                <Input placeholder="describe your idea in 100 words" {...field} className="mx-auto w-96 h-32 min-w-96 text-balance overflow-auto text-clip whitespace-nowrap "/>
              </FormControl>
             
              <FormMessage />
            </FormItem>
              )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>  
    </div>
    </div>
    </ThemeProvider>
  )
}

