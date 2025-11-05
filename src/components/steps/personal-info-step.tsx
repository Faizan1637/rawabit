"use client"

import { useState , useImperativeHandle,forwardRef} from "react"
import { Form, Input, Select, DatePicker, Upload, Row, Col, Button, InputNumber } from "antd"
import { UserOutlined, CameraOutlined, MailOutlined, CalendarOutlined, ManOutlined } from "@ant-design/icons"
import type { UploadFile } from "antd"
import type { StepProps } from "@/types/form"
import { useAuthContext } from "@/context/AuthContext"
import { generateHeightOptions, getDegreeOptions } from "@/utils/createProfile/personalInfo/utils"
import {
  qualificationsWithoutDegree,
  genderOptions,
  maritalStatusOptions,
  beardOptions,
  disabilityOptions,
  complexionOptions,
  bodyTypeOptions,
  qualificationOptions,
  islamicEducationOptions
} from "@/constants/createProfile/personal-info-const"
import Image from 'next/image';

// eslint-disable-next-line react/display-name
const PersonalInfoStep = forwardRef<unknown, StepProps>(({ data, onDataChange }, ref) => {
  const { user } = useAuthContext()
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState<string | null>(data?.profileImage || null)
  const [selectedQualification, setSelectedQualification] = useState<string | undefined>(data?.qualification)
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string | undefined>(data?.maritalStatus)

  const handleFormChange = (changedValues: Record<string, unknown>): void => {
    onDataChange(changedValues)
  }

  const handleUpload = (file: UploadFile): boolean => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setImageUrl(base64)
      onDataChange({ profileImage: base64 })
    }
    reader.readAsDataURL(file as unknown as Blob)
    return false
  }

  const heightOptions = generateHeightOptions()

  const shouldShowDegree = selectedQualification && !qualificationsWithoutDegree.includes(selectedQualification)
  const shouldShowChildren = selectedMaritalStatus && selectedMaritalStatus !== 'unmarried'

  const degreeOptions = getDegreeOptions(selectedQualification)

  // Format date of birth
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
    <div>
      {/* Profile Header Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 mb-8 shadow-sm">
        <Row gutter={24} align="middle">
          {/* Image Upload Section */}
          <Col xs={24} sm={24} md={8} className="flex justify-center mb-4 md:mb-0">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Profile Preview"
                    width={128} // same as w-32
                    height={128} // same as h-32
                    className="rounded-full object-cover border-4 border-orange-400 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center border-2 border-dashed border-orange-300 text-orange-400 shadow-md">
                    <UserOutlined className="text-5xl" />
                  </div>
                )}
                <Upload maxCount={1} beforeUpload={handleUpload} accept="image/*" showUploadList={false}>
                  <Button
                    shape="circle"
                    icon={<CameraOutlined />}
                    className="!absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 border-none text-white shadow-lg"
                  />
                </Upload>
              </div>
              <p className="text-sm text-slate-600 mt-3 font-medium">Upload Profile Photo</p>
            </div>
          </Col>

          {/* User Information Section */}
          <Col xs={24} sm={24} md={16}>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-orange-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-orange-400 pb-2 inline-block">
                {user?.fullName || 'User Profile'}
              </h2>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center text-slate-700">
                  <MailOutlined className="text-orange-500 text-lg mr-3" />
                  <span className="text-sm">
                    <span className="font-semibold">Email:</span> {user?.email || 'Not provided'}
                  </span>
                </div>

                <div className="flex items-center text-slate-700">
                  <CalendarOutlined className="text-orange-500 text-lg mr-3" />
                  <span className="text-sm">
                    <span className="font-semibold">Date of Birth:</span>{' '}
                    {user?.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}
                  </span>
                </div>

                <div className="flex items-center text-slate-700">
                  <ManOutlined className="text-orange-500 text-lg mr-3" />
                  <span className="text-sm">
                    <span className="font-semibold">Gender:</span>{' '}
                    {user?.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not provided'}
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Form Section */}
      <Form form={form} layout="vertical" onValuesChange={handleFormChange} initialValues={data}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter first name" }]}>
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter last name" }]}>
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter email" }, { type: "email", message: "Please enter valid email" }]}>
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: "Please select date of birth" }]}>
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please select gender" }]}>
              <Select placeholder="Select gender">
                {genderOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Marital Status" name="maritalStatus" rules={[{ required: true, message: "Please select marital status" }]}>
              <Select
                placeholder="Select"
                onChange={(value) => {
                  setSelectedMaritalStatus(value)
                  if (value === 'unmarried') {
                    form.setFieldsValue({ numberOfSons: undefined, numberOfDaughters: undefined })
                    onDataChange({ maritalStatus: value, numberOfSons: undefined, numberOfDaughters: undefined })
                  } else {
                    onDataChange({ maritalStatus: value })
                  }
                }}
              >
                {maritalStatusOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {shouldShowChildren && (
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="How many sons do you have?"
                name="numberOfSons"
                rules={[{ required: true, message: "Please enter number of sons" }]}
              >
                <InputNumber min={0} max={20} placeholder="Enter number of sons" className="w-full" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="How many daughters do you have?"
                name="numberOfDaughters"
                rules={[{ required: true, message: "Please enter number of daughters" }]}
              >
                <InputNumber min={0} max={20} placeholder="Enter number of daughters" className="w-full" />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Has Beard?" name="hasBeard" rules={[{ required: true, message: "Please select beard status" }]}>
              <Select placeholder="Select">
                {beardOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item label="Disabilities" name="disabilities" rules={[{ required: true, message: "Please select disability status" }]}>
              <Select placeholder="Select">
                {disabilityOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={8}>
            <Form.Item label="Height" name="height" rules={[{ required: true, message: "Please select height" }]}>
              <Select placeholder="Select height">
                {heightOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.label}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Form.Item label="Complexion" name="complexion" rules={[{ required: true, message: "Please select complexion" }]}>
              <Select placeholder="Select complexion">
                {complexionOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item label="Body Type" name="bodyType" rules={[{ required: true, message: "Please select body type" }]}>
              <Select placeholder="Select body type">
                {bodyTypeOptions.map((opt) => (
                  <Select.Option key={opt.value} value={opt.value}>
                    {opt.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Life Style" name="lifeStyle" rules={[{ required: true, message: "Please describe your lifestyle" }]}>
          <Input.TextArea rows={4} placeholder="Describe your lifestyle (max 500 characters)" maxLength={500} />
        </Form.Item>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-1">Qualification</h3>
          <div className="border-b-2 border-orange-400 w-20 mb-6"></div>

          <Row gutter={16}>
            <Col xs={24} sm={shouldShowDegree ? 8 : 12}>
              <Form.Item label="Qualification" name="qualification" rules={[{ required: true, message: "Please select qualification" }]}>
                <Select
                  placeholder="Select"
                  onChange={(value) => {
                    setSelectedQualification(value)
                    form.setFieldValue('degree', undefined)
                    onDataChange({ qualification: value, degree: undefined })
                  }}
                >
                  {qualificationOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {shouldShowDegree && (
              <Col xs={24} sm={8}>
                <Form.Item label="Degree" name="degree" rules={[{ required: true, message: "Please select degree" }]}>
                  <Select placeholder="Select">
                    {degreeOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

            <Col xs={24} sm={shouldShowDegree ? 8 : 12}>
              <Form.Item label="Islamic Education" name="islamicEducation" rules={[{ required: true, message: "Please select Islamic education" }]}>
                <Select placeholder="Select">
                  {islamicEducationOptions.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
    )
})

export default PersonalInfoStep
