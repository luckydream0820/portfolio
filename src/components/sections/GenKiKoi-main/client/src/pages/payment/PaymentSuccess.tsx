import { Button, ConfigProvider, message, Result } from "antd";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";

const PaymentSuccess = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  useEffect(() => {
    const updatePayment = async () => {
      try {
        const api = `/api/payments/${id}`;
        await handleAPI(api, { status: status }, "POST");
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      }
    };
    updatePayment();
  }, [id]);

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
      }}
    >
      <Result
        className="mt-52"
        status="success"
        title="Thanh toán thành công"
        subTitle="Cảm ơn bạn đã tin dùng dịch dụ của GenKiKoi"
        extra={[
          <Link to={"/"}>
            <Button
              size="large"
              type="primary"
            >
              Trang chủ
            </Button>
          </Link>,
          <Link to="/my-account/appointment">
            <Button size="large">Xem danh sách cuộc hẹn</Button>,
          </Link>,
        ]}
      />
    </ConfigProvider>
  );
};

export default PaymentSuccess;
