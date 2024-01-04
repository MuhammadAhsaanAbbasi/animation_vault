"use client"
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";
import { useEffect, useState } from "react";
import { fetchAnime } from "@/app/action";

export type AnimeCard = JSX.Element
let page = 2
function LoadMore() {
  const {ref, inView} = useInView()
  const [data, setdata] = useState<AnimeCard[]>([])
  
  useEffect(()=>{
    if(inView){
      fetchAnime(page).then((res:any)=>{
        setdata([...data,...res])
        page++
      })
    }
  },[inView,data])
  return (
    <>
          <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
