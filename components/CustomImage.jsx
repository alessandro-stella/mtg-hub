import Image from "next/dist/client/image";
import { useState } from "react";
import loading from "../public/loading.png";
import fallback from "../public/error.png";

export default function CustomImage({ imageData }) {
    const [src, setSrc] = useState(loading);
    /* const [errorSrc, setErrorSrc] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false); */

    return (
        <Image
            priority={true}
            layout="fill"
            src={src}
            alt={imageData.name}
            className="h-96"
            onLoadingComplete={() => setSrc(imageData.image_uris.png)}
            onError={() => setSrc(fallback)}
        />
    );
}
