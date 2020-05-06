import React from "react";

const SingleFieldExpenseCard = (props) => {
  const { uniqueCards } = props;
  return (
    <div className="unique-cards">
      {uniqueCards.map((uniqueCard) => (
        <div key={uniqueCard.fieldName} className="unique-card">
          <p>Field Name: {uniqueCard.fieldName}</p>
          <p>Total Cost: {uniqueCard.totalCost}</p>
        </div>
      ))}
    </div>
  );
};

export default SingleFieldExpenseCard;
