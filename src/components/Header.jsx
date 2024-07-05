import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const counterSelector = useSelector((state) => state.counter);
  const userSelector = useSelector((state) => state.user);
  const handleLogOut = () => {
    localStorage.removeItem("current-user");
    dispatch({
      type: "USER_LOGOUT",
    });
    navigate("/login");
  };
  return (
    <header className="w-full h-16 flex justify-between px-8 items-center border-b">
      {/* BRAND */}

      <Link to="/">
        <p className="text-2xl font-bold hover:cursor-pointer">
          FastCampusCommerce
        </p>
      </Link>

      {/* SEARCH BAR */}

      <Input className="max-w-[600px]" placeholder="Product" />

      {/* BUTTON */}
      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-2">
          <Link to="/cart">
            <Button size="icon" variant="ghost">
              <IoCart className="h-6 w-6" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost">
            <IoHeart className="h-6 w-6" />
          </Button>
        </div>
        <Separator orientation="vertical" className="h-full" />
        {userSelector.id ? (
          <>
            <p>
              Hello {userSelector.username} ({userSelector.role})
            </p>
            <Button variant="destructive" onClick={handleLogOut}>
              Log out
            </Button>
          </>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
