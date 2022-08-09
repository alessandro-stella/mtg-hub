import Loader from "./Loader";

export default function ImageFallbacks({ loadingError }) {
    return (
        <>
            <div
                className={`absolute h-full aspect-card center-absolute ${
                    !loadingError
                        ? "bg-placeholder grid place-content-center"
                        : ""
                } rounded-2xl overflow-hidden `}>
                {loadingError ? (
                    <div className="w-full h-full bg-white">
                        <div className="grid w-full h-full border-2 border-black bg-error place-content-center">
                            <div className="w-2/3 p-2 m-auto font-semibold text-center bg-white border-2 border-black rounded-md shadow-xl">
                                An error occurred while loading the image,
                                please try again later
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
}
