"use client"

import type React from "react"
import { useState } from "react"
import { Button, message } from "antd"
import { UserOutlined, HomeOutlined, PhoneOutlined, CheckCircleOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import PersonalInfoStep from "@/components/steps/personal-info-step"
import FamilyBackgroundStep from "@/components/steps/family-background-step"
import ContactInfoStep from "@/components/steps/contact-info-step"
import type { FormData, StepperFormProps } from "@/types/form"

const StepperForm: React.FC<StepperFormProps> = ({ onSubmit, initialData }) => {
  const [current, setCurrent] = useState(0)
  const [formData, setFormData] = useState<Partial<FormData>>(initialData || {})
  const [loading, setLoading] = useState(false)

  const steps = [
    {
      title: "Personal Info",
      icon: UserOutlined,
      content: (
        <PersonalInfoStep data={formData} onDataChange={(newData) => setFormData({ ...formData, ...newData })} />
      ),
    },
    {
      title: "Family Background",
      icon: HomeOutlined,
      content: (
        <FamilyBackgroundStep data={formData} onDataChange={(newData) => setFormData({ ...formData, ...newData })} />
      ),
    },
    {
      title: "Contact Information",
      icon: PhoneOutlined,
      content: <ContactInfoStep data={formData} onDataChange={(newData) => setFormData({ ...formData, ...newData })} />,
    },
  ]

  const handleNext = (): void => {
    if (current < steps.length - 1) {
      setCurrent(current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = (): void => {
    if (current > 0) {
      setCurrent(current - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)
    try {
      if (onSubmit) {
        onSubmit(formData as FormData)
      }
      message.success("Form submitted successfully!")
    } catch (error) {
      message.error("Failed to submit form")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-3">
            Complete Your Profile
          </h1>
          <p className="text-slate-600 text-lg">Fill in your information across these simple steps</p>
        </div>

        {/* Custom Stepper */}
        <div className="mb-8">
          <div className="relative flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === current
              const isCompleted = index < current
              
              return (
                <div key={index} className="flex-1 relative">
                  <div className="flex flex-col items-center relative z-10">
                    {/* Circle with Icon */}
                    <div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg
                        ${isActive 
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 scale-110 ring-4 ring-orange-200' 
                          : isCompleted 
                          ? 'bg-orange-500' 
                          : 'bg-white border-2 border-slate-300'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircleOutlined className="text-2xl text-white" />
                      ) : (
                        <Icon className={`text-2xl ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      )}
                    </div>
                    
                    {/* Step Title */}
                    <div className="mt-3 text-center">
                      <p className={`
                        text-sm font-semibold transition-all
                        ${isActive ? 'text-orange-600 scale-105' : isCompleted ? 'text-orange-500' : 'text-slate-500'}
                      `}>
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Step {index + 1}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 left-[60%] w-[80%] h-1 -z-0">
                      <div className="h-full bg-slate-200 rounded">
                        <div
                          className={`
                            h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded transition-all duration-500
                            ${index < current ? 'w-full' : 'w-0'}
                          `}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-full p-1 shadow-sm border border-slate-200">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${((current + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10 min-h-96 mb-8">
          <div className="animate-fadeIn">
            {steps[current].content}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Button
            onClick={handlePrevious}
            disabled={current === 0}
            size="large"
            icon={<ArrowLeftOutlined />}
            className="px-8 h-12 text-base font-medium border-2 border-slate-300 hover:border-orange-400 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
          >
            Previous
          </Button>

          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
            <span className="text-sm font-semibold text-orange-600">
              Step {current + 1} of {steps.length}
            </span>
            <div className="flex gap-1 ml-2">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${idx === current ? 'bg-orange-600 w-6' : idx < current ? 'bg-orange-400' : 'bg-orange-200'}
                  `}
                />
              ))}
            </div>
          </div>

          {current === steps.length - 1 ? (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              size="large"
              icon={<CheckCircleOutlined />}
              className="px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{
                backgroundColor: "oklch(0.646 0.222 41.116)",
                borderColor: "oklch(0.646 0.222 41.116)",
              }}
            >
              Submit Profile
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleNext}
              size="large"
              icon={<ArrowRightOutlined />}
              iconPosition="end"
              className="px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              style={{
                backgroundColor: "oklch(0.646 0.222 41.116)",
                borderColor: "oklch(0.646 0.222 41.116)",
              }}
            >
              Continue
            </Button>
          )}
        </div>

        {/* Add CSS for fade-in animation */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </div>
    </div>
  )
}

export default StepperForm