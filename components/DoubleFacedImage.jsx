import Image from "next/dist/client/image";
import { useState } from "react";
import loading from "../assets/loading.png";
import fallback from "../assets/error.png";

export default function CustomImage({ cardName, images, large }) {
    console.log(images);
    const [src, setSrc] = useState(loading);
    const [isRotated, setIsRotated] = useState(false);

    return (
        <div className="bg-red-500 relative w-full h-full min-h-[30rem]">
            <div
                className={`absolute w-full h-full transform-preserve transition-all duration-200 ${
                    isRotated ? "rotate-y-180" : ""
                }`}>
                <div className="absolute w-full h-full back-hidden ">
                    <Image
                        priority={large || false}
                        layout="fill"
                        objectFit="contain"
                        src={src}
                        alt={cardName || "Error"}
                        onLoadingComplete={() =>
                            setSrc(large ? images.back.png : images.back.small)
                        }
                        onError={() => setSrc(fallback)}
                    />
                </div>

                <div className="absolute w-full h-full back-hidden bg-yellow-300 rotate-y-180">
                    {/* <Image
                        priority={large || false}
                        layout="fill"
                        objectFit="contain"
                        src={src}
                        alt={cardName || "Error"}
                        onLoadingComplete={() =>
                            setSrc(
                                large ? images.front.png : images.front.small
                            )
                        }
                        onError={() => setSrc(fallback)}
                    /> */}
                </div>
            </div>

            <div
                className="absolute w-full h-full opacity-0 hover:opacity-30 transform-all cursor-pointer bg-slate-900 text-white"
                onClick={() => {
                    setIsRotated(!isRotated);
                }}>
                Click to rotate
            </div>
        </div>
    );
}
