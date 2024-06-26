import React from "react";
import contactPhoto from "../../assets/contact-photo.jpg";

const ContactCard = ({ name, email, onDelete }) => {
  return (
    <li className="py-3 sm:py-4 contact-card">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="w-8 h-8 rounded-full" src={contactPhoto} alt={name} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
          <p className="text-sm text-gray-500 truncate">{email}</p>
        </div>
        <button
          onClick={() => onDelete(email)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ContactCard;
