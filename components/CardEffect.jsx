import Symbol from "./Symbol";

export default function CardEffect({ data }) {
    function formatText(string) {
        let splitData = string.match(/\{.*?\}/g);

        if (!splitData) {
            return [string];
        }

        let tempString = string.replace(/\n/g, "\n\n");
        let output = [];

        splitData.forEach((symbol) => {
            output.push(tempString.split(symbol)[0]);
            tempString = tempString.replace(output[output.length - 1], "");

            output.push(symbol);
            tempString = tempString.replace(symbol, "");
        });

        output.push(tempString);

        return [...output.filter((element) => element)];
    }

    const splitData = formatText(data);

    return (
        <>
            {splitData.map((element, index) =>
                element[0] === "{" ? (
                    <Symbol symbol={element} key={index} inline={true} />
                ) : (
                    <div key={index} className="text">
                        {element}
                    </div>
                )
            )}
        </>
    );
}
