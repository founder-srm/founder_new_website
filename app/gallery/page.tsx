'use client'

import { useEffect, useState } from "react";
import { supabase } from "../supabase.config";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Spinner from "@/components/spinner/spinner";
import Navbar from "../Navbar";


export default function Page() {
    const [images, setImages] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(13)
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
          
    }, [])

    return (
        <main className="w-screen h-screen flex items-center justify-center flex-col overflow-hidden bg-[#090909]">
            <Navbar />
            <section className="w-full h-full py-2">
                <h1 className=" font-mono w-full text-center text-white font-semibold text-4xl my-4">Gallery</h1>
                {loading ? (
                    <Progress value={progress} className="w-[80%]" />
                ) : (
                    <section className="w-full h-full text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 justify-evenly items-center gap-4 py-12 overflow-y-auto scroll-smooth ">
                        {images.slice(1).map((imageURL, index) => (
                            <Card className="bg-[#262626] w-fit h-fit " key={index}>
                                <Image src={ imageURL } alt="Gallery Image" width={300} height={300} className=" w-max h-max rounded-lg"  loading="lazy" />
                            </Card>
                        ))}
                    </section>
                )}
            </section>
            {/* footer */}
        </main>
    );
}
