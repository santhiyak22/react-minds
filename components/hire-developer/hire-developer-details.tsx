"use client";

import { ChevronRight, Phone, Plus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { HireDeveloperData } from "@/types/hire";
import { z, ZodError } from "zod";
import api from "@/lib/axios";

type Props = {
  data: HireDeveloperData;
};

const HireDeveloperDetails: React.FC<Props> = ({ data }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const services = [
    "Web Application Development",
    "Mobile Application Development",
    "UI/UX Design & Prototyping",
    "Maintenance & Upgrades",
    "Hire Dedicated Developers",
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
    captcha: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const quoteSchema = z.object({
    name: z.string().min(2, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

    serviceType: z.string().min(1, "Please select a service"),

    message: z
      .string()
      .max(200, "Message must be within 200 characters")
      .optional(),

    captcha: z.boolean().refine((v) => v === true, {
      message: "Please verify captcha",
    }),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      quoteSchema.parse(form);

      const res = await api.post("/enquiries", {
        name: form.name,
        phone: form.phone,
        email: form.email,
        service_type: form.serviceType,
        message: form.message,
      });

      if (res.data.success) {
        setErrors({});
        alert("Request submitted successfully");
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <>
      {/* breadcramp */}
      <section className=" relative w-full py-6 md:py-6 overflow-hidden sm:mt-0 mt-[20px] bg-[linear-gradient(90deg,#008DFF_0%,#034D89_100%)] ">
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-6 text-[#FFFFFF]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs md:text-base font-bold">
            {data.breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className={
                    index === data.breadcrumb.length - 1
                      ? "text-[#F3D80E] font-bold"
                      : "text-white"
                  }
                >
                  {item}
                </span>

                {index !== data.breadcrumb.length - 1 && (
                  <span className="flex items-center text-white -space-x-2">
                    <ChevronRight size={14} strokeWidth={3} />
                    <ChevronRight size={14} strokeWidth={3} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div
            className="
  grid grid-cols-1
  lg:grid-cols-[65%_35%]
  items-start
  gap-y-8
  gap-x-6
"
          >
            {/* LEFT */}
            <div className="max-w-[900px] text-center md:text-left">
              <h1 className="text-lg md:text-4xl font-bold leading-snug md:leading-tight mb-4">
                {data.hero.title}
              </h1>

              <p className="text-sm md:text-lg leading-relaxed mb-6">
                {data.hero.description}
              </p>

              <div
                className="
    flex items-center gap-4
    justify-center              /* MOBILE center */
    md:justify-start md:gap-6   /* DESKTOP */
  "
              >
                {/* BUTTON */}
                <button
                  className="
    bg-[#F3D80E] text-black font-semibold rounded
    whitespace-nowrap

    /* MOBILE */
    px-3 py-2 text-[9px]

    /* DESKTOP */
    md:px-6 md:py-3 md:text-base
  "
                >
                  {data.hero.cta}
                </button>

                {/* CALL */}
                <span
                  className="
      flex items-center gap-2 text-white font-bold

      /* MOBILE */
      text-[10px]

      /* DESKTOP */
      md:text-lg
    "
                >
                  <Phone size={14} className="md:size-[20px]" />
                  <span>
                    CALL: <span>+91-9345702658</span>
                  </span>
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex justify-end -mt-6">
              {data.hero.image && (
                <div className="relative w-[500px] h-[280px]">
                  <Image
                    src={data.hero.image}
                    alt={data.hero.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="md:py-5 py-4 bg-white mt-6">
        <div className="px-8">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-[40%_60%] gap-2 items-start">
            {/* LEFT IMAGE */}
            {/* LEFT IMAGE */}
            <div className="hidden md:flex justify-center py-5">
              {data.services.imageLeft && (
                <div className="relative w-[450px] h-[350px]">
                  <Image
                    src={data.services.imageLeft}
                    alt={data.services.heading.titleMain}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex flex-col gap-6">
              {/* HEADING */}
              <div>
                <h4 className="text-sm md:text-lg font-bold text-[#008DFF] mb-1">
                  {data.services.heading.titleSmall}
                </h4>

                <h1 className="text-xl md:text-3xl font-bold text-[#00152DCC] mb-2">
                  {data.services.heading.titleMain}
                </h1>

                <p className="text-sm md:text-base text-[#00152DB2] max-w-6xl">
                  {data.services.heading.description}
                </p>
              </div>

              {/* SERVICES LIST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {data.services.list.map((service, idx) => (
                  <div
                    key={idx}
                    className="border border-[#008DFF] md:px-4 md:py-2  px-4 py-1 rounded-sm hover:shadow-lg transition"
                  >
                    <h3 className="font-semibold text-sm md:text-lg text-[#008DFF] mb-2">
                      {service.title}
                    </h3>

                    <p className="text-[#00152DB2] text-xs md:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* application service data */}
      <section className="md:py-8 py-5">
        <div className="container mx-auto max-w-[1440px] px-6 text-center">
          {/* SECTION HEADING */}
          <h2 className="md:text-3xl text-base text-[#008DFF] font-bold">
            {data.applicationServices.heading.title}
          </h2>

          <p className="md:text-base text-xs text-[#00152DCC] mt-2">
            {data.applicationServices.heading.description}
          </p>

          {/* SERVICES GRID */}
          <div className="grid md:grid-cols-4 gap-4 md:mt-8 mt-4">
            {data.applicationServices.list.map((feature, idx) => (
              <div
                key={idx}
                className="
            relative bg-white md:px-6 md:py-6  px-4 py-4 rounded-sm text-center transition
            shadow-[2.16px_2.16px_20px_0px_#0078DB1A,-2.16px_-2.16px_20px_0px_#0078DB1A]
            hover:shadow-[4px_4px_24px_0px_#0078DB2A,-4px_-4px_24px_0px_#0078DB2A]
          "
              >
                {/* NUMBER */}
                <div className="mx-auto mb-4 w-7 h-7 bg-[#008DFF] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {idx + 1}
                </div>

                {/* TITLE */}
                <h3 className="font-semibold text-base text-[#00152DCC] mb-2">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[#00152DB2] text-[14px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* methodology */}
      <section className="w-full md:py-8 py-10 px-6 md:px-16 bg-[linear-gradient(90deg,#008DFF_0%,#034D89_100%)] text-white">
        <div className="max-w-[1440px] mx-auto text-center">
          {/* Heading */}
          <h2 className="text-[#FFFFFF] font-bold tracking-wider text-lg md:text-2xl">
            {data.methodology.heading.title}
          </h2>

          <p className="md:text-base text-xs text-[#F3D80E] md:mt-2 mt-1">
            {data.methodology.heading.subtitle}
          </p>

          {/* Steps */}
          <div className="md:mt-10 mt-6 relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 md:gap-6 gap-1 justify-items-center">
            {data.methodology.steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center px-2 relative max-w-[270px]"
              >
                {/* Number */}
                <div className="w-12 h-12 bg-white text-[#0056A6] shadow-md rounded-full flex items-center justify-center font-bold text-sm mb-3 z-10">
                  {index + 1}
                </div>

                {/* Title + Desc */}
                <h4 className="font-bold text-white  md:text-sm text-sm">
                  {step.title}
                </h4>
                <p className="text-[#F3D80E] text-xs md:text-sm mt-2 leading-relaxed">
                  {step.desc}
                </p>

                {/* desktop Line */}
                {index !== data.methodology.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 right-[-50%] w-full border-t border-dotted border-white" />
                )}
                {/* mobile line */}
                {index !== data.methodology.steps.length - 1 && (
                  <div className="block md:hidden w-px h-10 border-l border-dotted border-white"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why opt for us */}
      <section className="md:px-6 md:py-6 px-4 py-4  bg-white">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="md:text-3xl text-base font-bold text-[#008DFF] mb-2">
            Why Opt for Us?
          </h2>

          <p className="text-[#00152DCC] md:text-lg text-xs">
            {data.whyOpt.description}
          </p>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1440px] px-1 md:py-1 py-1 grid grid-cols-1 md:grid-cols-[40%_60%] items-center gap-4">
          {/* LEFT IMAGE – 40% */}
          <div className="hidden md:flex justify-center">
            <Image
              src="/images/our-expertise/opt.png"
              width={600}
              height={500}
              alt="Left Illustration"
              className="object-contain w-full max-w-[420px]"
            />
          </div>

          {/* RIGHT IMAGE – 60% */}
          <div className="hidden md:flex justify-center">
            <Image
              src="/images/our-expertise/optweb.png"
              width={1000}
              height={500}
              alt="Right Illustration"
              className="object-contain w-full max-w-[900px]"
            />
          </div>
        </div>

        {/* MOBILE IMAGE */}
        <div className="w-full flex justify-center block md:hidden md:mt-2  mt-0">
          <Image
            src="/images/hire-developer/optmob.png"
            width={1450}
            height={480}
            alt="Mobile Illustration"
            className="object-contain"
          />
        </div>
      </section>

      {/* faq */}
      <section className="md:py-10 py-4 bg-white md:px-4 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h3 className="text-base md:text-3xl font-semibold text-[#008DFF] mb-6 text-center">
            {data.faq.title}
          </h3>

          {/* FAQ List */}
          <div className="space-y-4">
            {data.faq.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  boxShadow:
                    "2.16px 2.16px 20px 0px #008DFF1A, -2.16px -2.16px 20px 0px #008DFF1A",
                }}
                className="rounded-sm bg-white overflow-hidden transition-all"
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? null : idx)
                  }
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-gray-50 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-gray-800">
                    {String(idx + 1).padStart(2, "0")}. {item.question}
                  </span>

                  <Plus
                    size={18}
                    className={`transition-transform duration-300 p-1 rounded-full border ${expandedFaq === idx
                      ? "rotate-45 border-[#008DFF] text-[#008DFF]"
                      : "border-[#008DFF] text-[#008DFF]"
                      }`}
                  />
                </button>

                {/* Answer */}
                {expandedFaq === idx && (
                  <div className="px-4 sm:px-6 py-4 bg-gray-50 text-sm text-gray-700 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div
        className="w-full max-w-6xl p-4 md:p-8 rounded-sm shadow-xl mx-auto mt-4 mb-12"
        style={{
          background:
            "linear-gradient(270deg, rgba(1,125,226,1) 0%, rgba(1,83,151,1) 100%)",
        }}
      >
        <h3 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">
          Request A Quote
        </h3>

        <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* NAME */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded bg-white text-sm text-black focus:outline-none
        ${errors.name ? "border border-red-500" : ""}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded bg-white text-sm text-black focus:outline-none
        ${errors.email ? "border border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {/* PHONE */}
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Mobile Number"
                value={form.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded bg-white text-sm text-black focus:outline-none
        ${errors.phone ? "border border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* SERVICE */}
            <div>
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded bg-white text-sm text-black focus:outline-none
      ${errors.serviceType ? "border border-red-500" : ""}`}
              >
                <option value="">Select Service</option>

                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>

              {errors.serviceType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serviceType}
                </p>
              )}
            </div>
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <textarea
              name="message"
              placeholder="Enter Your Message here..."
              maxLength={200}
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-white text-sm text-black resize-none focus:outline-none"
            />

            <span className="absolute bottom-2 right-3 text-[10px] text-gray-500">
              0 / 200
            </span>
          </div>

          {/* BOTTOM ROW */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* CAPTCHA */}
            <div className="bg-white px-3 py-2 rounded flex items-center gap-2 text-xs w-full md:w-auto">
              <input
                type="checkbox"
                name="captcha"
                checked={form.captcha}
                onChange={handleChange}
                className="accent-blue-600"
              />

              <span className="text-black">I'm not a Robot</span>
              <img
                src="/images/landing-page/capcha.png"
                alt="captcha"
                className="w-5 h-5 ml-auto md:ml-0"
              />
              
            </div>

            {/* SEND BUTTON */}
            <button
              type="submit"
              className="bg-[#F3D80E] text-[#00152D] font-semibold py-3 px-14 rounded hover:bg-yellow-400 transition w-full md:w-auto"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default HireDeveloperDetails;
