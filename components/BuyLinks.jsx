export default function BuyLinks({ data }) {
    console.log(data);

    return (
        <div className="bg-red-400">
            {data.map((singleLink, index) => (
                <div key={index}>
                    <a
                        href={singleLink.link}
                        rel="noreferrer noopener"
                        target="_blank">
                        {singleLink.site}
                    </a>
                </div>
            ))}
        </div>
    );
}
