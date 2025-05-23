import { Avatar, Breadcrumb, Col, ConfigProvider, Divider, List, message, Row, Spin } from "antd";
import { Stickynote } from "iconsax-react";
import { useEffect, useState } from "react";
import { GiCirclingFish } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { handleAPI } from "../../apis/handleAPI";
import { HeaderComponent } from "../../components";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
/* eslint-disable @typescript-eslint/no-unused-vars */
const RecordDetail = () => {
  const { pathname } = useLocation();
  const fishId = pathname.split("/")[4];
  const medicalRecordId = pathname.split("/")[6];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [medicalRecord, setMedicalRecord] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const getRecord = async () => {
      try {
        setIsLoading(true);
        const api = `/api/medicalRecords/${medicalRecordId}`;

        const res = await handleAPI(api, undefined, "GET");

        setMedicalRecord(res.data);
      } catch (error: any) {
        console.log(error);
        message.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getRecord();
  }, []);

  if (isLoading) {
    return (
      <div className="my-account-section flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        inherit: false,
        token: {
          fontFamily: "Pro-Rounded",
        },
        components: {
          Divider: {
            marginLG: 15,
          },
        },
      }}
    >
      <div className="my-account-section">
        <HeaderComponent heading="Chi tiết hồ sơ" />
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <Link to="/my-account/medical-record">
                  <div className="flex items-center gap-2">
                    <Stickynote size={20} />
                    Hồ sơ điều trị
                  </div>
                </Link>
              ),
            },
            {
              title: (
                <Link to={`/my-account/medical-record/fishes/${fishId}/records`}>
                  Danh sách hồ sơ bệnh án
                </Link>
              ),
            },
            {
              title: "Chi tiết hồ sơ",
            },
          ]}
        />
        <Row
          gutter={32}
          className="mt-2"
        >
          <Col span={7}>
            <div className="text-base">
              <h4 className="heading-4">Thông tin chung</h4>
              <Divider />
              <div className="mt-2 flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Tên khách: </span>
                  {medicalRecord?.customerName}
                </p>
                <p>
                  <span className="font-semibold">Loại khám: </span>
                  {medicalRecord?.examType}
                </p>
                <p>
                  <span className="font-semibold">Ngày khám: </span>
                  {new Date(medicalRecord?.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Bác sĩ: </span>
                  {medicalRecord?.doctorName}
                </p>
                <div className="">
                  <p className="font-semibold">Hình ảnh:</p>
                  <div className="mt-3 grid grid-cols-2 gap-5">
                    {medicalRecord?.images.map((image: string, i: any) => (
                      <div
                        key={i}
                        className="cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Avatar
                          shape="square"
                          style={{
                            backgroundColor: "transparent",
                            border: "2px dashed #ccc",
                            margin: "0px auto",
                          }}
                          src={image}
                          icon={<GiCirclingFish color="#ccc" />}
                          size={155}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={9}>
            <div className="text-base">
              <h4 className="heading-4">Chẩn đoán và điều trị</h4>
              <Divider />

              <div className="mt-2 flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Chẩn đoán: </span>
                  {medicalRecord?.diagnosis}
                </p>
                <p>
                  <span className="font-semibold">Phác đồ điều trị:</span>
                  <br />
                  {medicalRecord?.treatment}
                </p>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="text-base">
              <h4 className="heading-4">Đơn thuốc</h4>
              <Divider />

              <div className="mt-3 rounded-md border-[1px] border-[#d9d9d9]">
                <List
                  size="small"
                  dataSource={medicalRecord?.medicines}
                  renderItem={(item: { name: string; quantity: number }) => (
                    <List.Item>
                      {item.name}: {item.quantity} viên
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </Col>
        </Row>
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-h-[90vh] max-w-[90vw]">
                <motion.img
                  src={selectedImage}
                  alt="Hình ảnh chi tiết"
                  className="max-h-[70vh] max-w-[70vw] object-contain"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <button
                  className="absolute -right-10 -top-10 text-2xl text-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ConfigProvider>
  );
};

export default RecordDetail;
