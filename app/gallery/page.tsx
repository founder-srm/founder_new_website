'use client'

import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase.config";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Spinner from "@/components/spinner/spinner";
import Navbar from "../Navbar";
import Autoplay from "embla-carousel-autoplay";
import Footer from "../Footer";


export default function Page() {
    const [images, setImages] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(13);

    useEffect(() => {
        async function listFiles() {
            setLoading(true);
            let { data, error } = await supabase.storage.from('gallery').list('our past events')
            setProgress(50);
            if (error) {
              console.error('Error listing files:', error)
              setProgress(99);
              toast.error('Error listing files');
              return
            }
            if (data) {
                // console.log(data);
                let newImages = [];
                for (let file of data) {
                  if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.JPG') || file.name.endsWith('.jpeg')) {
                    const { data: publicURL } = supabase.storage.from('gallery').getPublicUrl(`our past events/${file.name}`);
          
                    if (error) {
                      console.error('Error getting public URL:', error);
                      continue;
                    }
          
                    // console.log(publicURL);
                    newImages.push(publicURL.publicUrl);
                    }
                }
                setProgress(100);
                setLoading(false);
                setImages(newImages);
            }
        }
        listFiles();
          
    }, []);

    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )

    return (
        <main className="w-screen min-h-screen flex  justify-center flex-col overflow-auto bg-[#090909]">
            <Navbar />
            <section className="w-full h-full mb-12">
                {/* <h1 className=" font-mono w-full text-center text-white font-semibold text-4xl ">Gallery</h1> */}
                {loading ? (
                    <Progress value={progress} className="w-full my-28" />
                ) : (
                    <section className="w-full h-full text-white flex justify-center items-center mt-24 mb-4 scroll-smooth ">
                        <Carousel
                            plugins={[plugin.current]}
                            className="w-fit max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-6xl"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                            
                        >
                            <CarouselContent className="flex items-center gap-1 cursor-grab active:cursor-grabbing">
                                {images.slice(1).map((imageURL, index) => (
                                    <CarouselItem key={index} className="bg-[#262626] flex flex-row justify-center items-center w-fit h-fit ">
                                        <Image src={ imageURL } alt="Gallery Image" width={300} height={300} className="  h-auto w-[500px] md:w-[600px] lg:w-[900px] rounded-lg"  loading="lazy" />
                                    </CarouselItem>
                                ))}

                            </CarouselContent>
                            <CarouselPrevious className="text-white bg-[#090909]" />
                            <CarouselNext className="text-white bg-[#090909]"/>
                        </Carousel>
                    </section>
                )}
            </section>
            <Footer />
        </main>
    );
}
