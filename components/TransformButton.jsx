import {
    BsArrowClockwise,
    BsArrowCounterclockwise,
    BsArrowRepeat,
} from "react-icons/bs";

export default function TransformButton({ buttonLabel }) {
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
        <div className="border-2 border-dark-violet w-fit p-2 text-2xl">
            {selectIcon()}

            <div>{buttonLabel === "flip" ? "Flip" : "Rotate"}</div>
        </div>
    );
}