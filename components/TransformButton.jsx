import {
    BsArrowClockwise,
    BsArrowCounterclockwise,
    BsArrowRepeat,
} from "react-icons/bs";

export default function TransformButton({ buttonLabel, rotate }) {
    const selectIcon = () => {
        if (buttonLabel === "flip" || buttonLabel === "rotate180")
            return <BsArrowRepeat />;

        return buttonLabel.charAt(buttonLabel.length - 1) === "a" ? (
            <BsArrowCounterclockwise />
        ) : (
            <BsArrowClockwise />
        );
    };

    return (
        <div
            className="p-2 text-2xl border-2 border-dark-violet w-fit hover:cursor-pointer flex items-center justify-center gap-2"
            onClick={() => rotate()}>
            {selectIcon()}

            <div>{buttonLabel === "flip" ? "Flip" : "Rotate"}</div>
        </div>
    );
}
