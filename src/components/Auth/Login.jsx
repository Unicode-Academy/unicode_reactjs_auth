import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { requestLogin } from "../../utils/auth";

export default function Login() {
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("idle");
  const handleChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) {
      return alert("Vui lòng nhập đầy đủ thông tin");
    }
    setStatus("pending");
    const response = await requestLogin(form);
    setStatus("idle");
    if (!response) {
      return toast.error("Email hoặc mật khẩu không chính xác");
    }
  };
  return (
    <div className="w-50 mx-auto py-3">
      <h2 className="text-center">Đăng nhập</h2>
      <form action="" onSubmit={handleSubmitForm}>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email..."
            onChange={handleChangeValue}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Mật khẩu..."
            onChange={handleChangeValue}
            required
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" disabled={status === "pending"}>
            {status === "pending" ? (
              <>
                <span className="spinner-border spinner-border-sm me-1"></span>
                Loading...
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
