"use client";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { submitAppointment } from "@/store/redux/slices/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/redux/store";
import { appointmentSchema } from "@/store/validation/appointmentSchema";
import { ZodError } from "zod";
import { useToast } from "@/app/ui/toast/ToastProvider";
import { MESSAGES } from "@/app/lib/uilts";
import AOS from "aos";
import "aos/dist/aos.css";

const AppointmentSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.appointment
  );

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    date: "",
    time: "",
    reason_of_meeting: "",
    your_expectation: "",
    more_details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      appointmentSchema.parse(formData);
      setFormErrors({});
      dispatch(submitAppointment(formData));

      showToast(MESSAGES.APPOINTMENT_SUCCESS, "success");
      setFormData({
        name: "",
        email: "",
        contact_number: "",
        date: "",
        time: "",
        reason_of_meeting: "",
        your_expectation: "",
        more_details: "",
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message;
          }
        });
        setFormErrors(fieldErrors);

        showToast(MESSAGES.VALIDATION_ERROR);
      } else {
        showToast(MESSAGES.SERVER_ERROR, "error");
      }
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    if (success) {
      setFormData({
        name: "",
        email: "",
        contact_number: "",
        date: "",
        time: "",
        reason_of_meeting: "",
        your_expectation: "",
        more_details: "",
      });
      setFormErrors({});
    }
  }, [success]);

  return (
    <div
      className="appoinement-bg p-8 min-h-[700px] font-sans"
      data-aos="fade-right"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-start mb-12">
          <div className="text-sm font-semibold text-green-800 tracking-wide">
            BHARAT BHARTI
          </div>
          <h2 className="mt-2 text-4xl font-bold text-red-600">
            Get in Touch With Us
          </h2>
          <div className="w-16 h-1 mt-2 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>
        </div>

        <div className="md:flex md:items-stretch gap-6 space-y-6 md:space-y-0">
          <div
            className="flex-[2] bg-white p-8 md:p-12 border-l-5 border-green-700 rounded-l-xl rounded-r-xl shadow-lg min-h-[500px]"
            style={{ fontFamily: "var(--font-jost)" }}
            data-aos="fade-down"
          >
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-800">
                Your Voice Matters
              </h3>
              <p className="mt-4 text-gray-600 leading-relaxed">
                At Bharat Bharti, we believe in{" "}
                <span className="font-bold">
                  Celebrating Unity in Diversity
                </span>
                . Every message you share contributes to the beautiful mosaic of
                cultures, voices, and ideas that define who we are.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We’re more than just an organization — we’re a movement built on
                empathy, inclusion, and shared purpose. Whether you have a
                question, suggestion, or simply want to connect, we're here to
                listen and grow together.
              </p>
              <ul className="mt-6 space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 text-xl mr-2">🍃</span>
                  Empowering minds, nurturing harmony
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 text-xl mr-2">❤️</span>
                  We listen, we care, we grow together.
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 text-xl mr-2">👥</span>
                  Join a family of purpose and peace.
                </li>
              </ul>
            </div>
          </div>

          <div
            className="flex-[3] bg-white p-8 md:p-12 border-l-4 border-green-700 rounded-xl shadow-md min-h-[500px]"
            data-aos="fade-left"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-b-2 border-gray-200 bg-transparent py-2 px-0 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="contact_number"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact_number"
                    name="contact_number"
                    type="text"
                    placeholder="Enter your phone number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-b-2 border-gray-200 bg-transparent py-2 px-0 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-b-2 border-gray-200 bg-transparent py-2 px-0 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="reason_of_meeting"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Reason of Meeting <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="reason_of_meeting"
                    name="reason_of_meeting"
                    type="text"
                    placeholder="Enter reason of meeting"
                    value={formData.reason_of_meeting}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-b-2 border-gray-200 bg-transparent py-2 px-0 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-b-2 border-gray-200 bg-transparent py-2 px-0 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="time"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-b-2 border-gray-200 bg-transparent py-2 px-0 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="your_expectation"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Your Expectation
                </label>
                <input
                  id="your_expectation"
                  name="your_expectation"
                  type="text"
                  placeholder="Enter your expectation"
                  value={formData.your_expectation}
                  onChange={handleChange}
                  className="mt-1 block w-full border-b-2 border-gray-200 bg-transparent py-2 px-0 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="more_details"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  More Details
                </label>
                <textarea
                  id="more_details"
                  name="more_details"
                  placeholder="Enter more details"
                  rows={0}
                  value={formData.more_details}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 border-gray-200 bg-transparent rounded-lg p-3 resize-y focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-3 py-2 rounded-full bg-green-700 text-white font-medium shadow hover:bg-green-800"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSection;
