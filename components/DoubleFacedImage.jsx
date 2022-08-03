import Image from "next/dist/client/image";
import { useState } from "react";
import loading from "../assets/loading.png";
import fallback from "../assets/error.png";
import { BsArrowRepeat } from "react-icons/bs";

export default function CustomImage({ cardName, images }) {
    const [srcFront, setSrcFront] = useState(loading);
    const [srcBack, setSrcBack] = useState(loading);
    const [isRotated, setIsRotated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div
                className={`${
                    isLoading ? "hidden" : ""
                } relative w-full h-full min-h-[30rem]`}>
                <div
                    className={`absolute w-full h-full transform-preserve transition-all duration-500 ${
                        isRotated ? "rotate-y-180" : ""
                    }`}>
                    <div className="absolute w-full h-full back-hidden ">
                        <Image
                            priority={true}
                            layout="fill"
                            objectFit="contain"
                            src={srcFront}
                            alt={cardName ?? "Error"}
                            onLoadingComplete={() =>
                                setSrcFront(images.front.png)
                            }
                            onError={() => setSrcFront(fallback)}
                        />
                    </div>

                    <div className="absolute w-full h-full back-hidden rotate-y-180">
                        <Image
                            priority={true}
                            layout="fill"
                            objectFit="contain"
                            src={srcBack}
                            alt={cardName ?? "Error"}
                            onLoadingComplete={() =>
                                setSrcBack(images.back.png)
                            }
                            onError={() => setSrcBack(fallback)}
                        />
                    </div>
                </div>

                <div className="absolute w-full h-full transform-all">
                    <div className="h-full aspect-[10/14] m-auto rounded-xl flex items-center justify-end text-2xl select-none">
                        <div
                            className={`${
                                isRotated
                                    ? "text-white border-white bg-dark-violet"
                                    : "text-dark-violet border-dark-violet bg-white"
                            } p-1 text-4xl border-2 rounded-full cursor-pointer  mr-4`}
                            onClick={() => {
                                setIsRotated(!isRotated);
                            }}>
                            <BsArrowRepeat />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${isLoading ? "" : "hidden"}`}>aaaaaaaaa</div>
        </>
    );
}
