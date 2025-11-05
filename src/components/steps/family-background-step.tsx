"use client"

import type React from "react"
import { useImperativeHandle,forwardRef } from "react"
import { Form, Input, Select, Row, Col, InputNumber, Divider } from "antd"
import type { StepProps } from "@/types/form"
import { ALIVE_OPTIONS,
         CASTE_OPTIONS,
         MASLAK_OPTIONS,
         PROFESSION_OPTIONS,
         RELIGION_OPTIONS} from "@/constants/createProfile/background-family-const"


const SelectField: React.FC<{
  label: string
  name: string
  options: Array<{ value: string; label: string }>
  required?: boolean
  placeholder?: string
}> = ({ label, name, options, required = true, placeholder = "Select" }) => (
  <Form.Item label={label} name={name} rules={[{ required, message: `Please select ${label.toLowerCase()}` }]}>
    <Select placeholder={placeholder}>
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
)

const NumberField: React.FC<{
  label: string
  name: string
  required?: boolean
  max?: number
}> = ({ label, name, required = true, max = 50 }) => (
  <Form.Item label={label} name={name} rules={[{ required, message: `Please enter ${label.toLowerCase()}` }]}>
    <InputNumber min={0} max={max} placeholder="0" className="w-full" />
  </Form.Item>
)

// eslint-disable-next-line react/display-name
const FamilyBackgroundStep= forwardRef<unknown, StepProps>(({ data, onDataChange }, ref) => {
  const [form] = Form.useForm()

  const handleFormChange = (changedValues: Record<string, unknown>): void => {
    onDataChange(changedValues)
  }
  
  useImperativeHandle(ref, () => ({
    validate: async () => {
      try {
        await form.validateFields()
        return form.getFieldsValue()
      } catch (error) {
        throw error
      }
    },
  }))

  return (
    <Form form={form} layout="vertical" onValuesChange={handleFormChange} initialValues={data} className="space-y-6">
      {/* Father's Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Father&apos;s Information</h3>
        <div className="border-b-2 border-orange-400 w-20 mb-6"></div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<span className="font-medium">Father&apos;s Name</span>}
              name="fathersName"
              rules={[{ required: true, message: "Please enter father's name" }]}
            >
              <Input placeholder="Enter father's name" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<span className="font-medium">Father&apos;s Occupation</span>}
              name="fathersOccupation"
              rules={[{ required: true, message: "Please enter father's occupation" }]}
            >
              <Input placeholder="Enter father's occupation" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <SelectField label="Father's Status" name="fatherAlive" options={ALIVE_OPTIONS} />
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Siblings Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Siblings Information</h3>
        <div className="border-b-2 border-orange-400 w-20 mb-6"></div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={6}>
            <NumberField label="Brothers" name="numberOfBrothers" />
          </Col>
          <Col xs={24} sm={6}>
            <NumberField label="Married Brothers" name="numberOfMarriedBrothers" />
          </Col>
          <Col xs={24} sm={6}>
            <NumberField label="Sisters" name="numberOfSisters" />
          </Col>
          <Col xs={24} sm={6}>
            <NumberField label="Married Sisters" name="numberOfMarriedSisters" />
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Religious Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Religious Information</h3>
        <div className="border-b-2 border-orange-400 w-20 mb-6"></div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <SelectField label="Religion" name="religion" options={RELIGION_OPTIONS} />
          </Col>
          <Col xs={24} sm={12}>
            <SelectField label="Maslak" name="maslak" options={MASLAK_OPTIONS} />
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Professional Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Professional Information</h3>
        <div className="border-b-2 border-orange-400 w-20 mb-6"></div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <SelectField label="Caste" name="caste" options={CASTE_OPTIONS} />
          </Col>
          <Col xs={24} sm={12}>
            <SelectField label="Profession" name="profession" options={PROFESSION_OPTIONS} />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<span className="font-medium">Designation</span>}
              name="designation"
              rules={[{ required: true, message: "Please enter designation" }]}
            >
              <Input placeholder="Enter designation" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={<span className="font-medium">Monthly Income</span>}
              name="monthlyIncome"
              rules={[{ required: true, message: "Please enter monthly income" }]}
            >
              <InputNumber min={0} placeholder="0" size="large" className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Additional Information Section */}
      <div>
        <h3 className="text-lg font-semibold text-slate-700 mb-1">Additional Information</h3>
        <div className="border-b-2 border-orange-400 w-20 mb-6"></div>
        <Form.Item
          label={<span className="font-medium">Requirements</span>}
          name="requirements"
          rules={[{ required: true, message: "Please enter requirements" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter any requirements or additional information" maxLength={500} />
        </Form.Item>
      </div>
    </Form>
  )
})

export default FamilyBackgroundStep
