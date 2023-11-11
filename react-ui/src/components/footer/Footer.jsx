import React from "react";
import "./Footer.css";
import { useSelector } from "react-redux";
import { BsFacebook } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";

const Footer = () => {
  return (
    <div className="footer">
      <div className="iconsList">
        <a href="https://www.facebook.com/profile.php?id=100001236386517">
          <BsFacebook className="iconFooter" />
        </a>
        <a href="https://wa.me/0527714077">
          <IoLogoWhatsapp className="iconFooter" />
        </a>
        <a href="https://twitter.com/snir_agi">
          <AiFillTwitterCircle className="iconFooter" />
        </a>
        <a href="https://github.com/Snir1812">
          <FaGithub className="iconFooter" />
        </a>
        <a href="https://www.linkedin.com/in/snir-agi-222bb2233/">
          <GrLinkedin className="iconFooter" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
