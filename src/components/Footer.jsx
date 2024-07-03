import { ContactMeButton } from "./ContactMeButtom";

export const Footer = () => {
  return (
    <footer className="w-full minh-16 border-t py-8 flex justify-between px-20 items-center mt-20">
      <h1 className="font-serif text-xl"> Copyright 2024</h1>
      <ContactMeButton>Contact Me</ContactMeButton>
    </footer>
  );
};
