import Image from "next/dist/client/image";
import { useState } from "react";
import Loader from "./Loader";

export default function CustomImage({ cardName, imageData, large = false }) {
    const [imageHasLoaded, setImageHasLoaded] = useState(false);

    return (
        <>
            <div className="absolute h-full aspect-card center-absolute">
                <Image
                    src={large ? imageData.png : imageData}
                    alt={cardName}
                    layout="fill"
                    onLoadingComplete={() => setImageHasLoaded(true)}
                />
            </div>

            {!imageHasLoaded && (
                <div className="absolute h-full aspect-card center-absolute bg-placeholder rounded-2xl grid place-content-center">
                    <Loader />
                </div>
            )}
        </>
    );
}
