import Image from "next/dist/client/image";
import { useState } from "react";
import loading from "../assets/loading.png";
import fallback from "../assets/error.png";

export default function CustomImage({
    cardName,
    imageData,
    large,
    isDoubleFaced,
}) {
    const [src, setSrc] = useState(loading);

    return (
        <Image
            priority={large || false}
            layout="fill"
            objectFit="contain"
            src={src}
            alt={cardName || "Error"}
            onLoadingComplete={() =>
                setSrc(
                    large
                        ? imageData.png
                        : isDoubleFaced
                        ? imageData
                        : imageData.small
                )
            }
            onError={() => setSrc(fallback)}
        />
    );
}
