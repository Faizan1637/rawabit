"use client"

import type React from "react"
import { useImperativeHandle, forwardRef, useEffect } from "react"
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
  style?: React.CSSProperties
}> = ({ label, name, options, required = true, placeholder = "Select", style }) => (
  <Form.Item 
    label={<span className="font-medium">{label}</span>} 
    name={name} 
    rules={[{ required, message: `Please select ${label.toLowerCase()}` }]}
    style={style}
  >
    <Select placeholder={placeholder} size="large">
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value}>
          {opt.label}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
)

// eslint-disable-next-line react/display-name
const FamilyBackgroundStep = forwardRef<unknown, StepProps>(({ data, onDataChange }, ref) => {
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

  // Watch religion and reset maslak if not muslim
  const religion = Form.useWatch('religion', form)

  useEffect(() => {
    if (religion !== 'muslim') {
      form.setFieldsValue({ maslak: undefined })
    }
  }, [religion, form])

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
            <Form.Item
              label="Brothers"
              name="numberOfBrothers"
              rules={[
                { required: true, message: "Please enter number of brothers" },
                {
                  validator: async (_, value) => {
                    const marriedBrothers = form.getFieldValue('numberOfMarriedBrothers') || 0
                    if (value < marriedBrothers) {
                      return Promise.reject(new Error('Total brothers cannot be less than married brothers'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <InputNumber 
                min={0} 
                max={50} 
                placeholder="0" 
                className="w-full" 
                onChange={() => form.validateFields(['numberOfMarriedBrothers'])}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item
              label="Married Brothers"
              name="numberOfMarriedBrothers"
              rules={[
                { required: true, message: "Please enter number of married brothers" },
                {
                  validator: async (_, value) => {
                    const totalBrothers = form.getFieldValue('numberOfBrothers') || 0
                    if (value > totalBrothers) {
                      return Promise.reject(new Error('Married brothers cannot exceed total brothers'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <InputNumber 
                min={0} 
                max={50} 
                placeholder="0" 
                className="w-full"
                onChange={() => form.validateFields(['numberOfBrothers'])}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item
              label="Sisters"
              name="numberOfSisters"
              rules={[
                { required: true, message: "Please enter number of sisters" },
                {
                  validator: async (_, value) => {
                    const marriedSisters = form.getFieldValue('numberOfMarriedSisters') || 0
                    if (value < marriedSisters) {
                      return Promise.reject(new Error('Total sisters cannot be less than married sisters'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <InputNumber 
                min={0} 
                max={50} 
                placeholder="0" 
                className="w-full"
                onChange={() => form.validateFields(['numberOfMarriedSisters'])}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item
              label="Married Sisters"
              name="numberOfMarriedSisters"
              rules={[
                { required: true, message: "Please enter number of married sisters" },
                {
                  validator: async (_, value) => {
                    const totalSisters = form.getFieldValue('numberOfSisters') || 0
                    if (value > totalSisters) {
                      return Promise.reject(new Error('Married sisters cannot exceed total sisters'))
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <InputNumber 
                min={0} 
                max={50} 
                placeholder="0" 
                className="w-full"
                onChange={() => form.validateFields(['numberOfSisters'])}
              />
            </Form.Item>
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
            {religion === 'muslim' ? (
              <SelectField 
                label="Maslak" 
                name="maslak" 
                options={MASLAK_OPTIONS} 
                required={true}
              />
            ) : (
              <div style={{ height: '72px' }} /> 
            )}
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
              rules={[
                { required: true, message: "Please enter monthly income" },
                {
                  type: 'number',
                  min: 0,
                  message: 'Monthly income must be greater than or equal to 0'
                }
              ]}
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
          rules={[
            { required: true, message: "Please enter requirements" },
            {
              min: 10,
              message: 'Requirements should be at least 10 characters long'
            }
          ]}
        >
          <Input.TextArea 
            rows={4} 
            placeholder="Enter any requirements or additional information" 
            maxLength={500}
            showCount
          />
        </Form.Item>
      </div>
    </Form>
  )
})

export default FamilyBackgroundStep