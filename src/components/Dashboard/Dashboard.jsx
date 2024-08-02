import PropTypes from "prop-types";
import { removeToken } from "../../utils/auth";

export default function Dashboard({ onSuccess }) {
  const handleLogout = () => {
    removeToken();
    onSuccess(true);
  };
  return (
    <div className="container py-3">
      <h2 className="text-center">Chào mừng bạn đã quay trở lại</h2>
      <button className="btn btn-danger d-block mx-auto" onClick={handleLogout}>
        Đăng xuất
      </button>
    </div>
  );
}
Dashboard.propTypes = {
  onSuccess: PropTypes.func,
};
