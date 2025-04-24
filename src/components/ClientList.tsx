import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Row, Table } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Client } from "../models/client";
import { AppDispatch, RootState } from "../store/store";
import { useUser } from "../hooks/useUser";
import { setSelectedClient } from "../store/slices/clientSlice";
import { fetchClients } from "../store/thunks/clientThunk";
import AppSpin from "./AppSpin";

function ClientList() {
  const { userId } = useUser();
  const { clients, loading } = useSelector((state: RootState) => state.client);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(fetchClients(userId));
    }
  }, [dispatch, userId]);

  const handleAdd = () => {
    navigate("/clients/add");
  };

  const handleEdit = (client: Client) => {
    dispatch(setSelectedClient(client));
    navigate(`/clients/edit/${client.id}`);
  };

  const columns = [
    {
      title: "First",
      dataIndex: "firstName",
      key: "firstName",
      width: 150,
    },
    {
      title: "Last",
      dataIndex: "lastName",
      key: "lastName",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 100,
    },
    {
      title: "",
      key: "edit",
      width: 100,
      render: (_: unknown, record: Client) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Edit client
        </Button>
      ),
    },
  ];

  return (
    <Card style={{ overflowX: "auto" }}>
      {loading ? (
        <AppSpin />
      ) : (
        <>
          <Row justify="start" style={{ marginBottom: 20 }}>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                style={{ backgroundColor: "green", borderColor: "green" }}
              >
                Add client
              </Button>
            </Col>
          </Row>
          <Table
            dataSource={clients}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
          />
        </>
      )}
    </Card>
  );
}

export default ClientList;
