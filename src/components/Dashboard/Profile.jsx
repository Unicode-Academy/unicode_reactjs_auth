import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUser, logout } from "../../utils/auth";
import Logout from "../Auth/Logout";

export default function Profile({ onSuccess }) {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const getProfile = useCallback(async () => {
    const user = await getUser();
    if (user) {
      setUser(user);
      setLoading(false);
    } else {
      //Refresh Token ==> Hướng dẫn sau
      //Call API Logout
      logout();
      onSuccess(true);
    }
  }, [onSuccess]);
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <div className="w-50 mx-auto">
      <ul className="d-flex list-unstyled gap-2 justify-content-center align-items-center">
        <li>Chào: {isLoading ? "Loading..." : user.name}</li>
        <li>
          <a href="#" className="btn btn-link p-0">
            Tài khoản
          </a>
        </li>
        <li>
          <Logout onSuccess={onSuccess}>
            <button className="btn btn-link p-0">Đăng xuất</button>
          </Logout>
        </li>
      </ul>
    </div>
  );
}
Profile.propTypes = {
  onSuccess: PropTypes.func,
};
