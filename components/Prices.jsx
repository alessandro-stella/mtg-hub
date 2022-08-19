export default function Prices({ data }) {
    console.log(data);

    return (
        <div className="bg-sky-400 flex-1">
            {data.map((singlePrice, index) => (
                <div key={index} className="flex gap-2">
                    <div>{singlePrice.version}</div>
                    <div>{singlePrice.price}</div>
                </div>
            ))}
        </div>
    );
}
