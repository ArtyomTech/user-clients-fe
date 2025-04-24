import { Spin } from "antd";

const AppSpin = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default AppSpin;
