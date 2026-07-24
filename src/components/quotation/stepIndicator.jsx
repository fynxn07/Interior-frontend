import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const steps = ["Service", "Project Details", "Photos", "Contact Info"];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto mb-12 sm:mb-16">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isDone || isActive ? "#C8A96A" : "rgba(255,255,255,0.06)",
                }}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-sm font-semibold border ${
                  isDone || isActive
                    ? "border-[#C8A96A] text-black"
                    : "border-white/15 text-gray-400"
                }`}
              >
                {isDone ? <FaCheck size={13} /> : stepNum}
              </motion.div>
              <span
                className={`text-[10px] sm:text-xs uppercase tracking-wider hidden sm:block ${
                  isActive ? "text-[#C8A96A]" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-px mx-2 sm:mx-4 bg-white/10 relative overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-y-0 left-0 bg-[#C8A96A]"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;