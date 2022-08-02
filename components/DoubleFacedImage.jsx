import Image from "next/dist/client/image";
import { useState } from "react";
import loading from "../assets/loading.png";
import fallback from "../assets/error.png";

export default function CustomImage({ cardName, images, large }) {
    console.log(images);

    const [srcFront, setSrcFront] = useState(loading);
    const [srcBack, setSrcBack] = useState(loading);
    const [isRotated, setIsRotated] = useState(false);

    return (
        <div className="relative w-full h-full min-h-[30rem]">
            <div
                className={`absolute w-full h-full  transform-preserve transition-all duration-200 ${
                    isRotated ? "rotate-y-180" : ""
                }`}>
                <div className="absolute w-full h-full back-hidden ">
                    <Image
                        priority={large || false}
                        layout="fill"
                        objectFit="contain"
                        src={srcFront}
                        alt={cardName || "Error"}
                        onLoadingComplete={() =>
                            setSrcFront(
                                large ? images.front.png : images.front.small
                            )
                        }
                        onError={() => setSrcFront(fallback)}
                    />
                </div>

                <div className="absolute w-full h-full back-hidden rotate-y-180">
                    <Image
                        priority={large || false}
                        layout="fill"
                        objectFit="contain"
                        src={srcBack}
                        alt={cardName || "Error"}
                        onLoadingComplete={() =>
                            setSrcBack(
                                large ? images.back.png : images.back.small
                            )
                        }
                        onError={() => setSrcBack(fallback)}
                    />
                </div>
            </div>

            <div className="absolute w-full h-full text-white  transform-all">
                <div
                    className=" h-full aspect-[10/14] m-auto rounded-xl bg-slate-900 cursor-pointer opacity-0 hover:opacity-30 grid place-content-center text-2xl select-none"
                    onClick={() => {
                        setIsRotated(!isRotated);
                    }}>
                    Click to flip
                </div>
            </div>
        </div>
    );
}
