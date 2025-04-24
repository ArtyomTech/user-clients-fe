import { Button, Card, Form, Input, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios/axiosInstance";
import AppContainer from "../components/AppContainer";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../hooks/useAuth";

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  isSuccess: boolean;
  userId?: number;
  username?: string;
  token?: string;
}

function LoginPage() {
  const navigate = useNavigate();
  const { setUserId, setUsername } = useUser();
  const { login } = useAuth();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await axiosInstance.post<LoginResponse>("user/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data.isSuccess) {
        login(response.data.token || "");
        setUserId(response.data.userId || null);
        setUsername(response.data.username || null);
        notification.success({
          message: "Login Successful",
          description: "Redirecting to the clients page.",
        });
        navigate("/clients");
      } else {
        notification.error({
          message: "Login Failed",
          description: response.data.message,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notification.error({
          message: "Login Failed",
          description:
            err?.response?.data?.message || "An error occurred during login.",
        });
      } else {
        notification.error({
          message: "Login Error",
          description: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AppContainer>
      <Card
        title="Login"
        style={{
          width: "90%",
          maxWidth: "400px",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Typography.Link onClick={() => navigate("/register")}>
              Don't have an account? Register here
            </Typography.Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </AppContainer>
  );
}

export default LoginPage;
