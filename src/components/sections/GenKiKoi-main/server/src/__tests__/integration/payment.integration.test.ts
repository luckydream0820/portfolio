// Test create payment(POST /api/payments)
// Model: Payment, Appointment, Customer, User
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Appointment, Customer, Payment, User } from "../../models";

// Mock email services
jest.mock('../../services/emails', () => ({
  sendVerificationEmail: jest.fn(),
  sendResetPasswordEmail: jest.fn(),
  sendAppointmentConfirmationEmail: jest.fn(),
  sendAppointmentCancellationEmail: jest.fn()
}));

describe("Payment Integration Tests", () => {
  let mongoServer: MongoMemoryServer;
  let authToken: string;
  let customerUser: any;
  let customer: any;
  let appointment: any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const hashedPassword = await bcrypt.hash('Customer@123', 10);
    customerUser = await User.create({
      username: "customer123", 
      email: "customer@test.com",
      password: hashedPassword,
      role: "customer",
      isVerified: true
    });

    customer = await Customer.create({
      userId: customerUser._id
    });

    appointment = await Appointment.create({
      customerId: customer._id,
      status: "Đang chờ xử lý",
      typeOfConsulting: "Tư vấn trực tuyến",
      slotTime: new Date(),
      serviceId: new mongoose.Types.ObjectId(),
      doctorId: new mongoose.Types.ObjectId(),
      doctorScheduleId: new mongoose.Types.ObjectId()
    });

    authToken = jwt.sign(
      {
        id: customerUser._id.toString(),
        role: customerUser.role,
        email: customerUser.email
      },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1d' }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Payment.deleteMany({});
  });

  it("should create payment", async () => {
    const paymentData = {
      customerId: customer._id,
      appointmentId: appointment._id,
      totalPrice: 100000,
      serviceName: "Test Service"
    };
  });
});