import { Button, Card, Form, Input, notification, Typography } from "antd";
import axiosInstance from "../axios/axiosInstance";
import AppContainer from "../components/AppContainer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface RegisterFormValues {
  username: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  isSuccess: boolean;
  username?: string;
}

function RegisterPage() {
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const response = await axiosInstance.post<RegisterResponse>(
        "user/register",
        {
          username: values.username,
          password: values.password,
        }
      );

      const { message, username } = response.data;
      notification.success({
        message: `${message}`,
        description: `You have successfully registered as ${username}. Redirecting to login page.`,
        placement: "topRight",
      });
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: "Request Failed",
          description:
            error.response?.data.message || "An unknown error occurred",
        });
      } else {
        notification.error({
          message: "Request Failed",
          description: "An unknown error occurred",
          duration: 3,
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
        title="Register"
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
            <Typography.Link onClick={() => navigate("/")}>
              Already have an account? Login here
            </Typography.Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </AppContainer>
  );
}

export default RegisterPage;
