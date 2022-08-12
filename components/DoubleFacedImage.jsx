import Image from "next/dist/client/image";
import { useEffect, useState } from "react";
import ImageFallbacks from "./ImageFallbacks";

export default function DoubleFacedImage({
    cardName,
    images,
    isRotated,
    hasLoaded = () => {},
}) {
    const srcFront = images.front.png;
    const srcBack = images.back.png;

    const [isBackLoaded, setIsBackLoaded] = useState(false);
    const [isFrontLoaded, setIsFrontLoaded] = useState(false);

    const [imageHasLoaded, setImageHasLoaded] = useState(false);
    const [loadingError, setLoadingError] = useState(false);

    useEffect(() => {
        if (isBackLoaded && isFrontLoaded) {
            setImageHasLoaded(true);
        }
    }, [isBackLoaded, isFrontLoaded]);

    return (
        <>
            <div
                className={`absolute w-full h-full transform-preserve transition-all duration-500 ${
                    isRotated ? "rotate-y-180" : ""
                }`}>
                <div className="absolute w-full h-full back-hidden">
                    <Image
                        priority={true}
                        layout="fill"
                        objectFit="contain"
                        src={srcFront}
                        alt={cardName ?? "Error"}
                        onLoadingComplete={() => {
                            setIsFrontLoaded(true);
                            hasLoaded(true);
                        }}
                        onError={() => {
                            setLoadingError(true);
                            hasLoaded(true);
                        }}
                    />
                </div>

                <div className="absolute w-full h-full back-hidden rotate-y-180">
                    <Image
                        priority={true}
                        layout="fill"
                        objectFit="contain"
                        src={srcBack}
                        alt={cardName ?? "Error"}
                        onLoadingComplete={() => {
                            setIsBackLoaded(true);
                            hasLoaded(false);
                        }}
                        onError={() => {
                            setLoadingError(true);
                            hasLoaded(false);
                        }}
                    />
                </div>
            </div>

            {!imageHasLoaded && <ImageFallbacks loadingError={loadingError} />}
        </>
    );
}
