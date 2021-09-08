import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const ListItem = ({ items, editItem, removeItem }) => {
  return (
    <>
      {items.map((item) => {
        const { id, name } = item;
        return (
          <div className="list" key={id} id={id}>
            <div className="item">{name}</div>
            <div className="icons">
              <FontAwesomeIcon
                icon={faEdit}
                className="edit"
                onClick={() => editItem(id)}
              />
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="delete"
                onClick={() => removeItem(id)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListItem;
