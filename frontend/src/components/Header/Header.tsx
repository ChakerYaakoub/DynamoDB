import { HeaderProps, useHeader } from "./useHeader";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header: React.FC = (props: HeaderProps) => {
  const {} = useHeader(props);
  const navigate = useNavigate();
  const handleClick = (item: string) => {
    navigate(item);
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Add", path: "/Add" },
    { name: "About", path: "/About" },
  ];
  return (
    <div className="header">
      <div className="logo" onClick={() => handleClick("/")}>
        DynamoDB
      </div>
      <nav className="nav">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} onClick={() => handleClick(item.path)}>
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
