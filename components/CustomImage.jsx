import Image from "next/dist/client/image";
import { useState } from "react";
import ImageFallbacks from "./ImageFallbacks";

export default function CustomImage({
    cardName,
    imageData,
    large = false,
    rotate = false,
    isRotated = false,
    hasLoaded = () => {},
}) {
    const [imageHasLoaded, setImageHasLoaded] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    const rotateClass = `custom-${rotate}`;

    return (
        <>
            <div
                className={`absolute h-full aspect-card ${
                    isRotated ? rotateClass : "center-absolute"
                }`}>
                <Image
                    priority={large ? true : false}
                    src={large ? imageData.png : imageData}
                    alt={cardName}
                    layout="fill"
                    onLoadingComplete={() => {
                        setImageHasLoaded(true);
                        hasLoaded(false);
                    }}
                    onError={() => {
                        setLoadingError(true);
                        hasLoaded(false);
                    }}
                />
            </div>

            {!imageHasLoaded && <ImageFallbacks loadingError={loadingError} />}
        </>
    );
}
