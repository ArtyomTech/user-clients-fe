import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

function AppBreadcrumb() {
  const items = useSelector((state: RootState) => state.breadcrumb.items);

  const breadcrumbItems = items.map((item) => ({
    title: item.path ? <Link to={item.path}>{item.title}</Link> : item.title,
  }));

  return (
    <Breadcrumb
      style={{ marginBottom: "16px", fontSize: "18px" }}
      items={breadcrumbItems}
    />
  );
}

export default AppBreadcrumb;
