import { PageHeader, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { logout } from "../../slices/authSlice";
import "./Header.css";

export const Header = () => {
  const { me, isLoading } = useMe();
  const dispatch = useDispatch();
  const onConfirmLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header-container">
      <PageHeader
        ghost={false}
        title={
          <Link className="title-link" to={"/"}>Product Store</Link>
        }
        extra={[

          <div className="button-container">
            <Button className="logout-button" key="logout" onClick={onConfirmLogout}>Sign Out</Button>
           <Link className="add-button" key="add" to={"/add"}><Button>Add +</Button></Link>
          </div>
        
        
        ]}
      ></PageHeader>
 
    </div>
  );
};
