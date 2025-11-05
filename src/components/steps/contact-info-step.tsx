"use client"

import { useState, useMemo ,useImperativeHandle,forwardRef} from "react"
import { Form, Input, Select, Row, Col } from "antd"
import PhoneInput from "react-phone-number-input"
import { isValidPhoneNumber } from "libphonenumber-js"
import type { StepProps } from "@/types/form"
import { Country, State, City, type ICountry, type IState, type ICity } from "country-state-city"
import "react-phone-number-input/style.css"
import {HOUSE_STATUS_OPTIONS} from "@/constants/createProfile/contact-info-const"

// eslint-disable-next-line react/display-name
const ContactInfoStep=forwardRef<unknown, StepProps>(({ data, onDataChange }, ref) => {
  const [form] = Form.useForm()

  // Lives In States
  const [livesInCountry, setLivesInCountry] = useState<string | undefined>(data?.livesInCountry)
  const [livesInState, setLivesInState] = useState<string | undefined>(data?.livesInState)
  const [livesInStates, setLivesInStates] = useState<IState[]>([])
  const [livesInCities, setLivesInCities] = useState<ICity[]>([])

  // From States
  const [fromCountry, setFromCountry] = useState<string | undefined>(data?.fromCountry)
  const [fromState, setFromState] = useState<string | undefined>(data?.fromState)
  const [fromStates, setFromStates] = useState<IState[]>([])
  const [fromCities, setFromCities] = useState<ICity[]>([])

  // Phone states
  const [parentsPhone, setParentsPhone] = useState<string | undefined>(data?.parentsPhone)
  const [parentsMobileNo, setParentsMobileNo] = useState<string | undefined>(data?.parentsMobileNo)

  // Get all countries (memoized to prevent recalculation)
  const allCountries: ICountry[] = Country.getAllCountries()

  // Load states and cities on mount if data exists
  useMemo(() => {
  if (data?.livesInCountry) {
    const states = State.getStatesOfCountry(data.livesInCountry)
    setLivesInStates(states)
    setLivesInCountry(data.livesInCountry)
    
    if (data?.livesInState) {
      const cities = City.getCitiesOfState(data.livesInCountry, data.livesInState)
      setLivesInCities(cities)
      setLivesInState(data.livesInState)
    }
  }
}, [data?.livesInCountry, data?.livesInState])

useMemo(() => {
  if (data?.fromCountry) {
    const states = State.getStatesOfCountry(data.fromCountry)
    setFromStates(states)
    setFromCountry(data.fromCountry)
    
    if (data?.fromState) {
      const cities = City.getCitiesOfState(data.fromCountry, data.fromState)
      setFromCities(cities)
      setFromState(data.fromState)
    }
  }
}, [data?.fromCountry, data?.fromState])

  const handleFormChange = (changedValues: Record<string, unknown>): void => {
    onDataChange(changedValues)
  }

  const handlePhoneChange = (fieldName: "parentsPhone" | "parentsMobileNo", value: string | undefined) => {
    if (fieldName === "parentsPhone") {
      setParentsPhone(value)
      form.setFieldValue("parentsPhone", value)
    } else if (fieldName === "parentsMobileNo") {
      setParentsMobileNo(value)
      form.setFieldValue("parentsMobileNo", value)
    }
    onDataChange({ [fieldName]: value })
  }

  const handleLivesInCountryChange = (value: string) => {
    const states = State.getStatesOfCountry(value)
    setLivesInCountry(value)
    setLivesInState(undefined)
    setLivesInStates(states)
    setLivesInCities([])
    form.setFieldsValue({ livesInState: undefined, livesInCity: undefined })
    onDataChange({ livesInCountry: value, livesInState: undefined, livesInCity: undefined })
  }

  const handleLivesInStateChange = (value: string) => {
    const cities = livesInCountry ? City.getCitiesOfState(livesInCountry, value) : []
    setLivesInState(value)
    setLivesInCities(cities)
    form.setFieldsValue({ livesInCity: undefined })
    onDataChange({ livesInState: value, livesInCity: undefined })
  }

  const handleFromCountryChange = (value: string) => {
    const states = State.getStatesOfCountry(value)
    setFromCountry(value)
    setFromState(undefined)
    setFromStates(states)
    setFromCities([])
    form.setFieldsValue({ fromState: undefined, fromCity: undefined })
    onDataChange({ fromCountry: value, fromState: undefined, fromCity: undefined })
  }

  const handleFromStateChange = (value: string) => {
    const cities = fromCountry ? City.getCitiesOfState(fromCountry, value) : []
    setFromState(value)
    setFromCities(cities)
    form.setFieldsValue({ fromCity: undefined })
    onDataChange({ fromState: value, fromCity: undefined })
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
      <div className="bg-orange-500 text-white px-6 py-3 mb-8 rounded-sm">
        <h2 className="text-xl font-semibold">Contact Information</h2>
      </div>

      <Form form={form} layout="vertical" onValuesChange={handleFormChange} initialValues={data}>
        {/* Lives In Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-1">Lives In</h3>
          <div className="border-b-2 border-orange-400 w-20 mb-6"></div>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Country"
                name="livesInCountry"
                rules={[{ required: true, message: "Please select country" }]}
              >
                <Select
                  placeholder="Select Country"
                  onChange={handleLivesInCountryChange}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {allCountries.map((country) => (
                    <Select.Option key={country.isoCode} value={country.isoCode} label={country.name}>
                      {country.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="State" name="livesInState" rules={[{ required: true, message: "Please select state" }]}>
                <Select
                  placeholder="Select State"
                  onChange={handleLivesInStateChange}
                  disabled={!livesInCountry || livesInStates.length === 0}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                  notFoundContent={livesInCountry ? "No states available" : "Please select a country first"}
                >
                  {livesInStates.map((state) => (
                    <Select.Option key={state.isoCode} value={state.isoCode} label={state.name}>
                      {state.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="City" name="livesInCity" rules={[{ required: true, message: "Please select city" }]}>
                <Select
                  placeholder="Select City"
                  disabled={!livesInState || livesInCities.length === 0}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                  notFoundContent={livesInState ? "No cities available" : "Please select a state first"}
                >
                  {livesInCities.map((city) => (
                    <Select.Option key={city.name} value={city.name} label={city.name}>
                      {city.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* From Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-1">From</h3>
          <div className="border-b-2 border-orange-400 w-20 mb-6"></div>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Country"
                name="fromCountry"
                rules={[{ required: true, message: "Please select country" }]}
              >
                <Select
                  placeholder="Select Country"
                  onChange={handleFromCountryChange}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {allCountries.map((country) => (
                    <Select.Option key={country.isoCode} value={country.isoCode} label={country.name}>
                      {country.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="State" name="fromState" rules={[{ required: true, message: "Please select state" }]}>
                <Select
                  placeholder="Select State"
                  onChange={handleFromStateChange}
                  disabled={!fromCountry || fromStates.length === 0}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                  notFoundContent={fromCountry ? "No states available" : "Please select a country first"}
                >
                  {fromStates.map((state) => (
                    <Select.Option key={state.isoCode} value={state.isoCode} label={state.name}>
                      {state.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item label="City" name="fromCity" rules={[{ required: true, message: "Please select city" }]}>
                <Select
                  placeholder="Select City"
                  disabled={!fromState || fromCities.length === 0}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                  notFoundContent={fromState ? "No cities available" : "Please select a state first"}
                >
                  {fromCities.map((city) => (
                    <Select.Option key={city.name} value={city.name} label={city.name}>
                      {city.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Contact Details Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-700 mb-1">Contact Details</h3>
          <div className="border-b-2 border-orange-400 w-20 mb-6"></div>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Parents Phone"
                name="parentsPhone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve()
                      if (isValidPhoneNumber(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Invalid phone number"))
                    },
                  },
                ]}
              >
                <div className="phone-input-wrapper">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="PK"
                    value={parentsPhone}
                    onChange={(value) => handlePhoneChange("parentsPhone", value)}
                    placeholder="Enter phone number"
                    className="custom-phone-input"
                  />
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="Parents Mobile No"
                name="parentsMobileNo"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve()
                      if (isValidPhoneNumber(value)) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Invalid mobile number"))
                    },
                  },
                ]}
              >
                <div className="phone-input-wrapper">
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="PK"
                    value={parentsMobileNo}
                    onChange={(value) => handlePhoneChange("parentsMobileNo", value)}
                    placeholder="Enter mobile number"
                    className="custom-phone-input"
                  />
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={8}>
              <Form.Item
                label="House Status"
                name="houseStatus"
                rules={[{ required: true, message: "Please select house status" }]}
              >
                <Select placeholder="Select">
                  {HOUSE_STATUS_OPTIONS.map((opt) => (
                    <Select.Option key={opt.value} value={opt.value}>
                      {opt.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        {/* Address Section */}
        <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter address" }]}>
          <Input.TextArea rows={4} placeholder="Enter your complete address" />
        </Form.Item>
      </Form>
    </div>
  )
})

export default ContactInfoStep