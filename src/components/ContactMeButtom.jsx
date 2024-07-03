export const ContactMeButton = (props) => {
  return (
    <button className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-700">
      {props.children}
    </button>
  );
};
