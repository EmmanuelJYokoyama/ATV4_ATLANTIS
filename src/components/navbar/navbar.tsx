import React from "react";
import {Menubar} from "primereact/menubar"
import "./navbar.css"
import { Navigate, useNavigate } from "react-router-dom";

const Navbar: React.FC = (props) =>{
  const navigate = useNavigate();
    const itemsNavbar = [
        {
          label: "Home",
          command: (event: any) => {
          navigate("/");
          },
        },
        {
          label: "Clientes",
          command: (event: any) => {
          navigate("/menu-cliente");
          },
        },
        {
          label: "Listagens",
          command: (event: any) => {
          navigate("/menu-listagens");
          },
        },
        {
          label: "Hospedagem",
          command: (event: any) => {
          navigate("/cadastrar-hospedagem");
          },
        }        
      ];
  
    // --- Função Navegar ---
    const navegar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {};
    return (
      <div className="navbar">
        <Menubar onClick={(e) => navegar(e)} model={itemsNavbar} />
      </div>
    );
};
export default Navbar;
