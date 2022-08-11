export default function SetIcon({ iconLink }) {
    return (
        <div
            className="min-h-[1em] aspect-square"
            style={{ backgroundImage: `url(${iconLink})` }}></div>
    );
}
