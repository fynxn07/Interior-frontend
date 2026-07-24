import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCloudUploadAlt,
  FaTimes,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useServices } from "../../hooks/useServices";
import { useQuotations } from "../../hooks/useQuotations";
import { getIcon } from "../../utils/iconMap";
import StepIndicator from "../../components/quotation/stepIndicator";

const LOCATIONS = ["Dubai", "Sharjah", "Abu Dhabi"];
const BUDGET_RANGES = [
  "Under AED 50,000",
  "AED 50,000 – 150,000",
  "AED 150,000 – 300,000",
  "AED 300,000+",
];

const initialForm = {
  service: "",
  description: "",
  budget: "",
  location: "",
  preferredDate: "",
  images: [],
  name: "",
  email: "",
  phone: "",
};

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -60 : 60 }),
};

function Quotation() {
  const navigate = useNavigate();
  const { services } = useServices();
  const { submitQuotation } = useQuotations();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const update = (fields) => setForm((f) => ({ ...f, ...fields }));

  const goNext = () => {
    const err = validateStep(step);
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setErrors({});
    setDirection(1);
    setStep((s) => Math.min(s + 1, 4));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const validateStep = (currentStep) => {
    const err = {};
    if (currentStep === 1 && !form.service) err.service = "Please select a service";
    if (currentStep === 2) {
      if (!form.description.trim()) err.description = "Please describe your project";
      if (!form.budget) err.budget = "Please select a budget range";
      if (!form.location) err.location = "Please select a location";
    }
    if (currentStep === 4) {
      if (!form.name.trim()) err.name = "Name is required";
      if (!form.email.trim()) err.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email";
      if (!form.phone.trim()) err.phone = "Phone number is required";
    }
    return err;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 6 - form.images.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        update({ images: [...form.images, { name: file.name, dataUrl: reader.result }] });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    update({ images: form.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async () => {
    const err = validateStep(4);
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }
    setSubmitting(true);
    const result = await submitQuotation(form);
    setSubmitting(false);
    setSubmitted(result);
  };

  if (submitted) {
    return (
      <div className="bg-[#111111] min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full rounded-2xl border border-[#C8A96A]/30 bg-[#C8A96A]/[0.06] backdrop-blur-xl p-10 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-[#C8A96A] text-black flex items-center justify-center text-2xl mx-auto">
            <FaCheckCircle />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-6">
            Request Submitted
          </h2>
          <p className="text-gray-300 mt-3 leading-7">
            Thank you — our team will review your project and get back to
            you within 24 hours with a detailed proposal.
          </p>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-6 py-4">
            <p className="text-xs uppercase tracking-wider text-gray-400">
              Reference Number
            </p>
            <p className="text-[#C8A96A] text-xl font-bold mt-1">
              {submitted.reference}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-8 inline-flex items-center gap-3 bg-[#C8A96A] text-black px-8 py-3.5 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#111111] min-h-screen">
      <section className="relative pt-40 pb-16 px-6 lg:px-10 text-center border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C8A96A]/[0.06] to-transparent pointer-events-none" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[6px] sm:tracking-[8px] text-[#C8A96A] mb-4 text-sm"
        >
          Request a Quotation
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
        >
          Start Your Project
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-base lg:text-lg"
        >
          Tell us about your vision and our team will provide a detailed,
          transparent proposal.
        </motion.p>
      </section>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <StepIndicator currentStep={step} />

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 sm:p-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {step === 1 && (
                <StepService
                  services={services}
                  selected={form.service}
                  error={errors.service}
                  onSelect={(title) => update({ service: title })}
                />
              )}

              {step === 2 && (
                <StepDetails
                  form={form}
                  errors={errors}
                  onChange={update}
                />
              )}

              {step === 3 && (
                <StepPhotos
                  images={form.images}
                  onUpload={handleImageUpload}
                  onRemove={removeImage}
                />
              )}

              {step === 4 && (
                <StepContact
                  form={form}
                  errors={errors}
                  onChange={update}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/10">
            <button
              onClick={goBack}
              disabled={step === 1}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-0 transition-colors text-sm"
            >
              <FaArrowLeft size={12} /> Back
            </button>

            {step < 4 ? (
              <button
                onClick={goNext}
                className="inline-flex items-center gap-3 bg-[#C8A96A] text-black px-7 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-yellow-500 transition-all duration-300"
              >
                Continue <FaArrowRight size={13} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-3 bg-[#C8A96A] text-black px-7 py-3 rounded-xl font-semibold hover:-translate-y-0.5 hover:bg-yellow-500 transition-all duration-300 disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Request"}
                {!submitting && <FaCheckCircle size={13} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 1: Select Service ---------- */
function StepService({ services, selected, error, onSelect }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white">
        Which service do you need?
      </h2>
      <p className="text-gray-400 text-sm mt-2">
        Select the service that best matches your project.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mt-7">
        {services.map((s) => {
          const Icon = getIcon(s.icon);
          const isActive = selected === s.title;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => onSelect(s.title)}
              className={`flex items-start gap-4 text-left rounded-xl p-5 border transition-all duration-300 ${
                isActive
                  ? "border-[#C8A96A] bg-[#C8A96A]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                  isActive ? "bg-[#C8A96A] text-black" : "bg-white/5 text-[#C8A96A]"
                }`}
              >
                <Icon />
              </div>
              <div>
                <p className="text-white font-medium text-sm sm:text-base">
                  {s.title}
                </p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                  {s.shortDescription}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
    </div>
  );
}

/* ---------- Step 2: Project Details ---------- */
function StepDetails({ form, errors, onChange }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white">
        Tell us about your project
      </h2>
      <p className="text-gray-400 text-sm mt-2">
        A few details help us prepare an accurate proposal.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Project Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={4}
            placeholder="Describe your space, style preferences, and requirements..."
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
              errors.description ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
            }`}
          />
          {errors.description && (
            <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3">
            Budget Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            {BUDGET_RANGES.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => onChange({ budget: b })}
                className={`px-4 py-3 rounded-lg text-sm border transition-all duration-300 ${
                  form.budget === b
                    ? "border-[#C8A96A] bg-[#C8A96A]/10 text-[#C8A96A]"
                    : "border-white/10 text-gray-300 hover:border-white/25"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
          {errors.budget && <p className="text-red-400 text-xs mt-2">{errors.budget}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
              Location
            </label>
            <div className="flex gap-2">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onChange({ location: loc })}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-lg text-xs sm:text-sm border transition-all duration-300 ${
                    form.location === loc
                      ? "border-[#C8A96A] bg-[#C8A96A]/10 text-[#C8A96A]"
                      : "border-white/10 text-gray-300 hover:border-white/25"
                  }`}
                >
                  <FaMapMarkerAlt size={11} /> {loc}
                </button>
              ))}
            </div>
            {errors.location && (
              <p className="text-red-400 text-xs mt-2">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
              Preferred Start Date
            </label>
            <input
              type="date"
              value={form.preferredDate}
              onChange={(e) => onChange({ preferredDate: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C8A96A] transition-colors [color-scheme:dark]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 3: Upload Images ---------- */
function StepPhotos({ images, onUpload, onRemove }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white">
        Share reference photos
      </h2>
      <p className="text-gray-400 text-sm mt-2">
        Optional — upload photos of your space or inspiration images (up to 6).
      </p>

      <label className="mt-7 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/15 hover:border-[#C8A96A]/50 py-12 cursor-pointer transition-colors duration-300">
        <FaCloudUploadAlt className="text-[#C8A96A] text-3xl" />
        <p className="text-gray-300 text-sm">
          Click to upload, or drag and drop
        </p>
        <p className="text-gray-600 text-xs">PNG, JPG up to 6 images</p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={onUpload}
          disabled={images.length >= 6}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-6">
          {images.map((img, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden aspect-square border border-white/10">
              <img src={img.dataUrl} alt={img.name} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                aria-label="Remove image"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Step 4: Contact Info ---------- */
function StepContact({ form, errors, onChange }) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-white">
        How can we reach you?
      </h2>
      <p className="text-gray-400 text-sm mt-2">
        We'll send your proposal and updates to these details.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
            Full Name
          </label>
          <input
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Your name"
            className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
              errors.name ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
            }`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="you@example.com"
              className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
              }`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
              Phone
            </label>
            <input
              value={form.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+971 XX XXX XXXX"
              className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                errors.phone ? "border-red-500" : "border-white/10 focus:border-[#C8A96A]"
              }`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 mt-2">
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-3">
            Request Summary
          </p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Service</dt>
              <dd className="text-white">{form.service || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Budget</dt>
              <dd className="text-white">{form.budget || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Location</dt>
              <dd className="text-white">{form.location || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Photos</dt>
              <dd className="text-white">{form.images.length} attached</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default Quotation;