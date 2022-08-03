import Image from "next/dist/client/image";
import { useEffect, useState } from "react";
import fallback from "../assets/error.png";
import Loader from "./Loader";

export default function CustomImage({
    cardName,
    imageData,
    large = false,
    isDoubleFaced = false,
}) {
    const [src, setSrc] = useState(fallback);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div
                className={`relative  flex-1 bg-green-500 grid place-content-center`}>
                <Loader />
            </div>

            <Image
                priority={large ?? false}
                layout="fill"
                objectFit="contain"
                src={src}
                alt={cardName ?? "Error"}
                onLoadingComplete={() => {
                    setIsLoading(false);

                    if (isDoubleFaced) {
                        setSrc(imageData);
                        return;
                    }

                    setSrc(large ? imageData.png : imageData);
                }}
                onError={() => setSrc(fallback)}
            />
        </>
    );
}
