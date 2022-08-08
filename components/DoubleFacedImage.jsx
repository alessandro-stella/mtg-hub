import Image from "next/dist/client/image";

export default function DoubleFacedImage({ cardName, images, isRotated }) {
    const srcFront = images.front.png;
    const srcBack = images.back.png;

    return (
        <>
            <div
                className={`absolute w-full h-full transform-preserve transition-all duration-500 ${
                    isRotated ? "rotate-y-180" : ""
                }`}>
                <div className="absolute w-full h-full back-hidden ">
                    <Image
                        priority={true}
                        layout="fill"
                        objectFit="contain"
                        src={srcFront}
                        alt={cardName ?? "Error"}
                    />
                </div>

                <div className="absolute w-full h-full back-hidden rotate-y-180">
                    <Image
                        priority={true}
                        layout="fill"
                        objectFit="contain"
                        src={srcBack}
                        alt={cardName ?? "Error"}
                    />
                </div>
            </div>
        </>
    );
}
