import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Layout,
  notification,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import axiosInstance from "../axios/axiosInstance";
import { AxiosError } from "axios";
import { useUser } from "../hooks/useUser";
import { fetchCountries } from "../store/thunks/countryThunk";
import { Country } from "../models/country";
import AppSpin from "./AppSpin";

const { Option } = Select;
const { Content } = Layout;

export interface ClientForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: string;
  country: string;
}

function ClientForm() {
  const location = useLocation();
  const [form] = Form.useForm<ClientForm>();
  const { userId } = useUser();
  const { countries, loading } = useSelector(
    (state: RootState) => state.country
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const selectedClient = useSelector(
    (state: RootState) => state.client.selectedClient
  );

  const isAddMode = location.pathname === "/clients/add";
  const buttonText = isAddMode ? "Add Client" : "Edit Client";

  useEffect(() => {
    if (!isAddMode && selectedClient) {
      form.setFieldsValue(selectedClient);
    }
  }, [isAddMode, selectedClient, form]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const onFinish = async (values: ClientForm) => {
    try {
      if (isAddMode) {
        await axiosInstance.post(`/client/user/${userId}`, values);
        notification.success({
          message: "Success",
          description: "Client added successfully",
        });
      } else if (selectedClient) {
        await axiosInstance.put(`/client/${selectedClient.id}`, values);
        notification.success({
          message: "Success",
          description: "Client updated successfully",
        });
      }

      navigate("/clients");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      const description =
        err.response?.data?.message ??
        "Something went wrong. Please try again.";

      notification.error({
        message: "Error",
        description,
      });

      console.error("Client submission error:", err);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Content style={{ padding: "1rem" }}>
        {loading ? (
          <AppSpin />
        ) : (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                      { required: true, message: "Please enter first name" },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                      { required: true, message: "Please enter last name" },
                    ]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please choose a username" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="you@example.com" />
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input placeholder="1234 Main St" />
              </Form.Item>

              <Form.Item
                name="country"
                label="Country"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
              >
                <Select placeholder="Choose...">
                  {countries.map((country: Country) => (
                    <Option key={country.id} value={country.name}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={
                    isAddMode
                      ? { backgroundColor: "green", borderColor: "green" }
                      : {}
                  }
                >
                  {buttonText}
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default ClientForm;
