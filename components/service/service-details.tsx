"use client";
import { ChevronRight, Phone, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ServiceDetailsData } from "@/types/service";
import { serviceSlugMap } from "@/data/serviceSlugs"; // make sure path is correct
import { z, ZodError } from "zod";
import api from "@/lib/axios";

type Props = {
  data: ServiceDetailsData;
};

const services = [
  "React Web Application Development",
  "React Native Mobile App Development",
  "Next.js SSR Applications Development",
  "Node.js Backend & API Development",
  "Full-Stack Development Services",
  "SaaS Application Development",
  "Startup MVP Development Services",
  "Frontend Development Services",
  "App Maintenance & Support Services",
  "Progressive Web App Development",
  "UI/UX Design for Web & Mobile Apps",
  "E-commerce Web & Mobile Apps",
  "Headless CMS Development Services",
  "Application Modernization Services",
];

const service = [
  "Web Application Development",
  "Mobile Application Development",
  "UI/UX Design & Prototyping",
  "Maintenance & Upgrades",
  "Hire Dedicated Developers",
];

export default function ServiceDetails({ data }: Props) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
    captcha: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const schema = z.object({
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

  useEffect(() => {
    // Update activeIndex based on current URL
    const slug = pathname.split("/services/")[1];
    const idx = services.findIndex(
      (service) => serviceSlugMap[service] === slug,
    );
    if (idx !== -1) setActiveIndex(idx);
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      schema.parse(form);

      const res = await api.post("/api/enquiry", {
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
          const fieldName = issue.path[0] as string;
          fieldErrors[fieldName] = issue.message;
        });

        setErrors(fieldErrors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <>
      <section className=" relative w-full py-6 md:py-6 sm:mt-0 mt-[20px] overflow-hidden bg-[linear-gradient(90deg,#008DFF_0%,#034D89_100%)] ">
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
      bg-[#F3D80E] text-black font-semibold rounded whitespace-nowrap
      w-[137px] h-[30px] sm:w-[97px] sm:h-[30px] text-[9px]

      /* DESKTOP */
      md:w-auto md:h-auto
      md:px-6 md:py-3 md:text-base
      px-3 py-2
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
            <div className="hidden md:flex justify-end -mt-12">
              {data.hero.image && (
                <img
                  src={data.hero.image}
                  alt={data.hero.title}
                  className="w-full max-w-[350px] object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="w-full py-5 md:py-8 px-4 md:pl-10 pl-6 pr-6 md:pr-0 ">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8 md:gap-12">
          <div>
            {/* title  */}
            <div className="md:mb-8 mb-5">
              <h2 className="text-lg  md:text-3xl  font-bold text-[#00152D] mb-3">
                {data.mainService.title}
              </h2>

              <p className="text-sm md:text-base text-[#00152DB2] mb-4 leading-relaxed">
                {data.mainService.description}
              </p>

              <p className="text-sm md:text-base text-[#00152DB2] leading-relaxed">
                {data.mainService.detailedContent}
              </p>
            </div>

            {/* DEVELOPMENT PROCESS */}
            <div className="mb-12">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 md:mb-3 mb-2">
                Development Process
              </h3>

              <p className="text-sm sm:text-base text-[#00152DB2] md:mb-8 mb-5 leading-relaxed">
                {data.mainService.shortNote}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
                {data.developmentProcess.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      boxShadow:
                        "1.61px 1.61px 14.86px 0px #008DFF1A, -1.61px -1.61px 14.86px 0px #008DFF1A",
                    }}
                    className="py-4 md:py-4  px-4 md:px-6 bg-white rounded-sm"
                  >
                    <h4 className="flex items-center gap-2 mb-2 font-semibold text-[#008DFF] text-sm md:text-lg">
                      <span>{step.number}.</span>
                      <span>{step.title}</span>
                    </h4>

                    <ul className="space-y-2">
                      {step.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-xs md:text-sm text-[#00152DCC]"
                        >
                          <span className="text-yellow-400">👉</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {/* best work */}
            <div
              style={{
                boxShadow:
                  "1.61px 1.61px 14.86px 0px #008DFF1A, -1.61px -1.61px 14.86px 0px #008DFF1A",
              }}
              className="mb-10 bg-white rounded-md py-4 md:py-6 px-4 md:px-6"
            >
              <h3 className="text-lg  md:text-2xl font-bold text-[#00152D] mb-2">
                {data.whyChooseSection.title}
              </h3>

              <p className="text-sm md:text-base text-[#00152DB2] leading-relaxed md:mb-4 mb-2">
                {data.whyChooseSection.description}
              </p>

              <div className="grid gap-6">
                {data.whyChooseSection.categories.map((category, idx) => (
                  <div key={idx}>
                    <h4 className="text-base md:text-lg font-semibold text-[#008DFF] mb-3">
                      {category.title}
                    </h4>
                    <ul className="space-y-2">
                      {category.points.map((point, pointIdx) => (
                        <li
                          key={pointIdx}
                          className="text-sm text-[#000000] leading-relaxed"
                        >
                          <span className="text-[#F3D80E]">👉</span>
                          <span>{" " + point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            {/* BENEFITS */}
            <div className="py-2 md:py-0 mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Benefits with our service
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white py-6 md:py-4 px-4 md:px-4 border border-[#008DFF] rounded-sm"
                  >
                    <div className="absolute top-3 right-3 w-7 h-7 bg-[#008DFF] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {idx + 1}
                    </div>

                    <h4 className="text-sm md:text-base font-semibold text-[#00152DCC] mb-2">
                      {benefit.title}
                    </h4>

                    <p className="text-xs md:text-sm text-[#00152DCC] leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ SECTION */}

            <div>
              <h3 className="text-lg md:text-2xl font-bold text-[#00152D] md:mb-4 mb-3">
                Questions about service
              </h3>

              <div className="space-y-4">
                {data.faq.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      boxShadow:
                        "2.16px 2.16px 20px 0px #008DFF1A, -2.16px -2.16px 20px 0px #008DFF1A",
                    }}
                    className="rounded-sm bg-white overflow-hidden transition-all"
                  >
                    {/* QUESTION */}
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === idx ? null : idx)
                      }
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center hover:bg-gray-50"
                    >
                      <span className="text-sm sm:text-base font-medium text-gray-800">
                        0{idx + 1}. {item.question}
                      </span>

                      {/* PLUS / CLOSE ICON */}
                      <Plus
                        size={18}
                        className={`transition-transform duration-300 p-1 rounded-full border ${
                          expandedFaq === idx
                            ? "rotate-45 border-[#008DFF] text-[#008DFF]"
                            : "border-[#008DFF] text-[#008DFF]"
                        }`}
                      />
                    </button>

                    {/* ANSWER */}
                    {expandedFaq === idx && (
                      <div className="px-4 sm:px-6 py-4 bg-gray-50 text-sm text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR – FIXED WIDTH */}
          <aside
            className="
  w-full
  md:max-w-[330px]
  space-y-4
  md:sticky md:top-24
  mt-5 md:mt-0
"
          >
            {/* ALL SERVICES */}
            <h3 className="text-xl font-bold text-[#00152DCC] mb-5">
              All Services
            </h3>
            <div className="p-6 rounded-xl shadow-lg">
              <ul className="space-y-3">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => router.push(`/${serviceSlugMap[service]}`)}
                      className={`w-full px-4 py-3 flex justify-between items-center border text-sm font-medium transition
                  ${
                    activeIndex === idx
                      ? "bg-[#008DFF] text-white border-[#008DFF]"
                      : "border-[#008DFF] text-[#00152D] hover:bg-blue-50 hover:text-[#008DFF]"
                  }`}
                    >
                      {service}
                      <ChevronRight size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* REQUEST A QUOTE FORM */}
            <div
              className="w-full max-w-full  md:max-w-xl px-4 py-4 rounded-md shadow-xl mx-auto "
              style={{
                background:
                  "linear-gradient(90deg, #008DFF 7.2%, #03467D 100%)",
              }}
            >
              <h3 className="text-start text-[#FFFFFF] font-bold text-xl mb-6">
                Request A Quote
              </h3>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* NAME */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    className={`w-full p-4 rounded text-sm bg-white text-black placeholder-black focus:outline-none
        ${errors.name ? "border border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-red-300 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <input
                    type="text"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      setErrors({ ...errors, phone: "" });
                    }}
                    className={`w-full p-4 rounded text-sm bg-white text-black placeholder-black focus:outline-none
        ${errors.phone ? "border border-red-500" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-red-300 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full p-4 rounded text-sm bg-white text-black placeholder-black focus:outline-none
        ${errors.email ? "border border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-300 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* SERVICE */}
                <div>
                  <select
                    value={form.serviceType}
                    onChange={(e) => {
                      setForm({ ...form, serviceType: e.target.value });
                      setErrors({ ...errors, serviceType: "" });
                    }}
                    className={`w-full p-4 rounded text-sm bg-white text-black focus:outline-none
        ${errors.serviceType ? "border border-red-500" : ""}`}
                  >
                    <option value="">Select Service Type</option>
                    {service.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && (
                    <p className="text-red-300 text-xs mt-1">
                      {errors.serviceType}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}
                <textarea
                  placeholder="Enter Your Message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full p-4 rounded text-sm bg-white text-black placeholder-black focus:outline-none"
                />

                {/* CAPTCHA */}
                <div>
                  <div className="bg-white p-2 rounded-md flex items-center gap-2 text-xs text-black w-[200px]">
                    <input
                      type="checkbox"
                      checked={form.captcha}
                      onChange={(e) =>
                        setForm({ ...form, captcha: e.target.checked })
                      }
                    />
                    <span>I'm not a robot</span>
                  </div>
                  {errors.captcha && (
                    <p className="text-red-300 text-xs mt-1">
                      {errors.captcha}
                    </p>
                  )}
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full bg-[#F3D80E] text-[#00152DCC] font-bold py-2 rounded-md hover:bg-yellow-400 transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
