import Articleadder from "../../components/articleadder/articleadder";
import Header from "../../components/header/Header";
import "./courses.scss";
import { useState } from "react";

const Courses = () => {
    const [articleList, setArticleList] = useState([]);

    const addArticle = (newArticle) => {
        setArticleList([...articleList, newArticle]);
    };
    const deleteArticle = (name) => {
        console.log("btn clicked");
        const articleListCopy = [...articleList];
        const newArticleList = articleListCopy.filter((article) => article.name !== name);
        setArticleList(newArticleList);
    };

    return (
        <>
            <Header title="Courses" />
            <div className="content course-page">
                <Articleadder addArticle={addArticle} />
                <ul>
                    {articleList.map((article, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                name="isBuyedCheck"
                                onChange={(e) => console.log(e.target.checked)}
                            />{" "}
                            {article.qty} - {article.name}{" "}
                            <button onClick={() => deleteArticle(article.name)}>X</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Courses;
