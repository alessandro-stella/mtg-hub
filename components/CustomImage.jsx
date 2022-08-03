import Image from "next/dist/client/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function CustomImage({
    cardName,
    imageData,
    large = false,
    isDoubleFaced = false,
}) {
    const [isLoading, setIsLoading] = useState(true);

    const getSrc = () => {
        if (isDoubleFaced) {
            if (large) {
                return imageData.front.png;
            }

            return imageData.front;
        }

        return large ? imageData.png : imageData;
    };

    return (
        <>
            <Image src={getSrc()} alt={cardName} layout="fill" />
        </>
    );
}
