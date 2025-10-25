"use client"

import type React from "react"
import { useState } from "react"
import { Steps, Button, message } from "antd"
import { UserOutlined, HomeOutlined, PhoneOutlined, CheckCircleOutlined } from "@ant-design/icons"
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
      icon: <UserOutlined />,
      content: (
        <PersonalInfoStep data={formData} onDataChange={(newData) => setFormData({ ...formData, ...newData })} />
      ),
    },
    {
      title: "Family Background",
      icon: <HomeOutlined />,
      content: (
        <FamilyBackgroundStep data={formData} onDataChange={(newData) => setFormData({ ...formData, ...newData })} />
      ),
    },
    {
      title: "Contact Information",
      icon: <PhoneOutlined />,
      content: <ContactInfoStep data={formData} onDataChange={(newData) => setFormData({ ...formData, ...newData })} />,
    },
  ]

  const handleNext = (): void => {
    if (current < steps.length - 1) {
      setCurrent(current + 1)
    }
  }

  const handlePrevious = (): void => {
    if (current > 0) {
      setCurrent(current - 1)
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
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Add header section with title and description */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground text-lg">Fill in your information across these simple steps</p>
        </div>

        {/* Style Steps component with orange accent and improved spacing */}
        <div className="mb-10 bg-card rounded-lg p-8 shadow-sm border border-border">
          <style>{`
            .ant-steps-item-process .ant-steps-item-icon {
              background-color: oklch(0.646 0.222 41.116) !important;
              border-color: oklch(0.646 0.222 41.116) !important;
            }
            .ant-steps-item-finish .ant-steps-item-icon {
              background-color: oklch(0.646 0.222 41.116) !important;
              border-color: oklch(0.646 0.222 41.116) !important;
            }
            .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
              color: white !important;
            }
            .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
              color: white !important;
            }
            .ant-steps-item-title {
              color: black !important; /* Changed from var(--foreground) to black */
              font-weight: 600;
            }
          `}</style>
          <Steps
            current={current}
            items={steps.map((step) => ({
              title: step.title,
              icon: step.icon,
            }))}
          />
        </div>

        {/* Improve content card styling with better spacing and borders */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-10 min-h-96 mb-10">
          {steps[current].content}
        </div>

        {/* Enhance button styling with orange accent and better layout */}
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={handlePrevious}
            disabled={current === 0}
            size="large"
            className="px-8 h-12 text-base font-medium border-border hover:border-orange-400 hover:text-orange-500"
          >
            Previous
          </Button>

          <div className="flex-1 text-center text-sm text-muted-foreground">
            Step {current + 1} of {steps.length}
          </div>

          {current === steps.length - 1 ? (
            <Button
              type="primary"
              onClick={handleSubmit}
              loading={loading}
              size="large"
              icon={<CheckCircleOutlined />}
              className="px-8 h-12 text-base font-medium"
              style={{
                backgroundColor: "oklch(0.646 0.222 41.116)",
                borderColor: "oklch(0.646 0.222 41.116)",
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={handleNext}
              size="large"
              className="px-8 h-12 text-base font-medium"
              style={{
                backgroundColor: "oklch(0.646 0.222 41.116)",
                borderColor: "oklch(0.646 0.222 41.116)",
              }}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default StepperForm
