import PropTypes from "prop-types";
import Profile from "./Profile";
import Logout from "../Auth/Logout";

export default function Dashboard({ onSuccess }) {
  return (
    <div className="container py-3">
      <h2 className="text-center">Chào mừng bạn đã quay trở lại</h2>
      <Profile onSuccess={onSuccess} />
      <Logout onSuccess={onSuccess}>
        <button className="btn btn-danger d-block mx-auto">Đăng xuất</button>
      </Logout>
    </div>
  );
}
Dashboard.propTypes = {
  onSuccess: PropTypes.func,
};
