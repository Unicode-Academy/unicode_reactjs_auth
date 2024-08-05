import PropTypes from "prop-types";
import { removeToken } from "../../utils/token";
export default function Logout({ children, onSuccess }) {
  const handleLogout = () => {
    removeToken();
    onSuccess(true);
  };
  return <div onClick={handleLogout}>{children}</div>;
}
Logout.propTypes = {
  children: PropTypes.node,
  onSuccess: PropTypes.func,
};
