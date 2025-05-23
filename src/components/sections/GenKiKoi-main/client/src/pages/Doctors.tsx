import { Button, Card, message, Spin } from "antd";
import { ArrowRight2, User } from "iconsax-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAPI } from "../apis/handleAPI";
import { AnimatedSection } from "../share";

const Doctors = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [doctors, setDoctors] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        setIsLoading(true);
        const api = `/api/doctors/`;
        const res = await handleAPI(api, undefined, "GET");

        if (res.data) {
          setDoctors(res.data);
        }
      } catch (error: any) {
        console.log(error);
        message.error(error.message || "Đã có lỗi xảy ra, vui lòng thử lại sau ít phút!");
      } finally {
        setIsLoading(false);
      }
    };
    getDoctors();
  }, []);

  const handleViewDetails = (doctorId: string) => {
    navigate(`/doctors/${doctorId}`);
  };
  const handleBooking = () => {
    navigate(`/booking`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-t from-[#2A7F9E] to-[#175670]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="section bg-gradient-to-t from-[#2A7F9E] to-[#175670] py-36 pt-44 text-center text-white">
        <div className="container mx-auto lg:px-40">
          <AnimatedSection
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1.5 },
              },
            }}
          >
            <div className="mb-10">
              <h1 className="mb-8 text-center text-4xl font-bold leading-tight text-transparent text-white lg:text-5xl">
                Đội ngũ bác sĩ tại GenKiKoi
              </h1>
              <p className="text-lg">
                Gặp gỡ đội ngũ bác sĩ chuyên nghiệp và tận tâm của chúng tôi, luôn sẵn sàng chăm sóc
                cho cá Koi của bạn.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor: any, index: number) => (
              <AnimatedSection
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 1, delay: 0.5 },
                  },
                }}
              >
                <Card
                  hoverable
                  className="overflow-hidden bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                  cover={
                    doctor.photoUrl ? (
                      <div className="overflow-hidden">
                        <img
                          alt={doctor.fullName}
                          src={doctor.photoUrl}
                          className="h-64 w-full transform object-cover opacity-90 brightness-90 contrast-125 saturate-[0.85] transition-all duration-500 hover:scale-110 hover:opacity-100 hover:brightness-100 hover:contrast-100 hover:saturate-100"
                        />
                      </div>
                    ) : (
                      <div className="h-64 w-full bg-gray-400 pt-12">
                        <User
                          size={150}
                          className="mx-auto"
                        />
                      </div>
                    )
                  }
                  onClick={() => handleViewDetails(doctor._id)}
                >
                  <Card.Meta
                    title={<span className="text-xl text-white">Bác sĩ {doctor.fullName}</span>}
                    description={
                      <div className="text-gray-300">
                        <p>Chuyên gia chăm sóc sức khỏe cá Koi</p>
                      </div>
                    }
                  />
                  <p className="mt-4 text-gray-300">
                    {doctor.introduction && doctor.introduction.length > 150
                      ? doctor.introduction.slice(0, 147) + "..."
                      : doctor.introduction}
                  </p>
                  <div className="mt-4 flex justify-center gap-4">
                    <Button
                      onClick={() => handleViewDetails(doctor._id)}
                      className="flex items-center gap-2 rounded-full border-none bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
                    >
                      Xem chi tiết <ArrowRight2 size={18} />
                    </Button>
                    <Button
                      onClick={() => handleBooking()}
                      className="flex items-center gap-2 rounded-full border-none bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
                    >
                      Đặt lịch <ArrowRight2 size={18} />
                    </Button>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
