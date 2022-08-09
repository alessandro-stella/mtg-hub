import {
    BsArrowClockwise,
    BsArrowCounterclockwise,
    BsArrowRepeat,
} from "react-icons/bs";

export default function TransformButton({
    buttonLabel,
    rotate,
    isRotated = false,
}) {
    const flipLabels = ["rotate180", "flip"];

    const defaultIcon = selectIcon();
    const altIcon = !flipLabels.includes(buttonLabel)
        ? selectAltIcon()
        : undefined;

    function selectIcon() {
        if (flipLabels.includes(buttonLabel)) return <BsArrowRepeat />;

        return buttonLabel.charAt(buttonLabel.length - 1) === "a" ? (
            <BsArrowCounterclockwise />
        ) : (
            <BsArrowClockwise />
        );
    }

    function selectAltIcon() {
        return buttonLabel.charAt(buttonLabel.length - 1) === "a" ? (
            <BsArrowClockwise />
        ) : (
            <BsArrowCounterclockwise />
        );
    }

    return (
        <div
            className="p-2 text-2xl border-2 border-dark-violet w-fit hover:cursor-pointer flex items-center justify-center gap-2 select-none"
            onClick={() => rotate()}>
            {altIcon ? <>{isRotated ? altIcon : defaultIcon}</> : defaultIcon}

            {isRotated ? (
                <div>Reset</div>
            ) : (
                <div>{buttonLabel === "flip" ? "Flip" : "Rotate"}</div>
            )}
        </div>
    );
}
