import React from "react";
import { FaPerson } from "react-icons/fa6";

function ConnecterList({ data, setSelectedId, navigate }) {
  return (
    <div className="list-item">
      {data.map((currentData) => (
        <div
          className="list-box"
          key={currentData.id}
          onClick={() => setSelectedId(currentData.id)}
        >
          <div className="list-box-icon">
            <FaPerson icon="true" size={30} />
          </div>
          <div
            className="list-box-item"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${currentData.id}`);
            }}
          >
            <p>Name: {currentData.name}</p>
            <p>Content: {currentData.content}</p>
            <p>Location: {currentData.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConnecterList;
