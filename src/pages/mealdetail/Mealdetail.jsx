import React from "react";
import "./Mealdetail.scss";
import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";

const Mealdetail = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <Header title="Détail du repas" />
            <div className="meal-detail-container content">
                <h2>Détails du repas : {id}</h2>
            </div>
        </>
    );
};

export default Mealdetail;
