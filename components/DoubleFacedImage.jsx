import Image from "next/dist/client/image";
import { useState } from "react";
import loading from "../assets/loading.png";
import fallback from "../assets/error.png";

export default function CustomImage({ cardName, images, large }) {
    const [src, setSrc] = useState(loading);

    return (
        <div className="bg-red-500 relative w-full h-full min-h-[30rem]">
            <div className="w-full h-full">
                <Image
                    priority={large || false}
                    layout="fill"
                    objectFit="contain"
                    src={src}
                    alt={cardName || "Error"}
                    onLoadingComplete={() =>
                        setSrc(large ? images.front.png : images.front.small)
                    }
                    onError={() => setSrc(fallback)}
                />
            </div>

            <div className="w-full h-full">
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
                />{" "}
            </div>
        </div>
    );
}
