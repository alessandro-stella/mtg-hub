import Image from "next/dist/client/image";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function CustomImage({
    cardName,
    imageData,
    large = false,
}) {
    return (
        <>
            <Image
                src={large ? imageData.png : imageData}
                alt={cardName}
                layout="fill"
            />
        </>
    );
}
