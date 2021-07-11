import React from "react";
import Logo from '../Logo';
import './Footer.css'

export default function Footer() {
  return (
    <div className="Footer">
      <div className="copyright">
        <h4>
        © 2021
        </h4>
      </div>
      <div className="logo_footer">
        <Logo size="40" id1="hue1" id2="hue2"/>
      </div>
    </div>
  );
}
