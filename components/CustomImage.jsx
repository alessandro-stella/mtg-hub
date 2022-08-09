import Image from "next/dist/client/image";
import { useState } from "react";
import ImageFallbacks from "./ImageFallbacks";

export default function CustomImage({ cardName, imageData, large = false }) {
    const [imageHasLoaded, setImageHasLoaded] = useState(false);
    const [loadingError, setLoadingError] = useState(false);

    return (
        <>
            <div className="absolute h-full aspect-card center-absolute">
                <Image
                    priority={large ? true : false}
                    src={large ? imageData.png : imageData}
                    alt={cardName}
                    layout="fill"
                    onLoadingComplete={() => setImageHasLoaded(true)}
                    onError={() => setLoadingError(true)}
                />
            </div>

            {!imageHasLoaded && <ImageFallbacks loadingError={loadingError} />}
        </>
    );
}
