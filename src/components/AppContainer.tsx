import { Layout, Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
import React from "react";

const { Text } = Typography;

interface CenteredLayoutProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function AppContainer({ children, style }: CenteredLayoutProps) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
      <Footer style={{ textAlign: "center" }}>
        <Text type="secondary">&copy; 2025 SRINI</Text>
      </Footer>
    </Layout>
  );
}

export default AppContainer;
