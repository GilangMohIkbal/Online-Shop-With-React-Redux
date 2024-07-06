import PropTypes from "prop-types";
export const ContactMeButton = ({ children = "" }) => {
  return (
    <button className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-700">
      {children}
    </button>
  );
};

ContactMeButton.propTypes = {
  children: PropTypes.string,
};
