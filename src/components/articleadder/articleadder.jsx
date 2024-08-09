import { useState } from "react";

const Articleadder = ({ addArticle }) => {
    const [articleName, setArticleName] = useState("");
    const [qty, setQty] = useState(1);

    const handleSubmitArticle = (e) => {
        e.preventDefault();
        const newArticle = {
            name: articleName,
            qty: qty,
        };
        addArticle(newArticle);
        setArticleName("");
        setQty(1);
    };

    return (
        <div>
            <form onSubmit={(e) => handleSubmitArticle(e)}>
                <input
                    type="text"
                    placeholder="Article Name"
                    value={articleName}
                    onChange={(e) => setArticleName(e.target.value)}
                />
                <input
                    type="range"
                    min={1}
                    max={10}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                />
                <span>{qty}</span>
                <button type="submit">Add Article</button>
            </form>
        </div>
    );
};

export default Articleadder;
