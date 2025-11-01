"use client";
import { Card, Typography, Table, Divider, List } from "antd";
import {
  CheckCircleOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const PaymentMethods = () => {
  const paymentOptions = [
    "Bank Transfer",
    "Cash",
    "Telenor Easypaisa",
  ];

  const columns = [
    {
      title: <b>Bank Account Details</b>,
      dataIndex: "label",
      key: "label",
      width: "40%",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      dataIndex: "value",
      key: "value",
      render: (text) => <Text>{text}</Text>,
    },
  ];

  const data = [
    {
      key: "1",
      label: "Bank",
      value: "Meezan Bank Limited",
    },
    {
      key: "2",
      label: "Account Title",
      value: "Hafiz Muhammad Safi Ullah",
    },
    {
      key: "3",
      label: "Account Number",
      value: "0215-0101643530",
    },
    {
      key: "4",
      label: "Branch",
      value: "Not Specified",
    },
    {
      key: "5",
      label: "Branch Code",
      value: "0215",
    },
    {
      key: "6",
      label: "IBAN",
      value: "PK12MEZN0002150101643530",
    },
    {
      key: "7",
      label: "Swift Code",
      value: "MEZNPKKA",
    },
  ];

  return (
    <Card
      title={
        <div className="text-white font-semibold text-lg">
          Payment Methods
        </div>
      }
      headStyle={{
        background: "linear-gradient(to right, #f97316, #ea580c)",
        borderBottom: "none",
      }}
      bodyStyle={{
        backgroundColor: "white",
        padding: "2rem",
      }}
      bordered={false}
      className="rounded-2xl shadow-md w-full max-w-3xl"
    >
      {/* Payment Methods List */}
      <Title level={4} style={{ color: "#333" }}>
        Following Payment Methods are currently available
      </Title>

      <List
        dataSource={paymentOptions}
        renderItem={(item) => (
          <List.Item>
            <CheckCircleOutlined style={{ color: "#16a34a", marginRight: 8 }} />
            <Text>{item}</Text>
          </List.Item>
        )}
        className="mb-2"
      />

      <Divider plain>
        <Text italic strong>
          OR
        </Text>
      </Divider>

      {/* Bank Account Details */}
      <div>
        <Title level={4} style={{ marginBottom: 4 }}>
          <BankOutlined className="mr-2" /> Bank Account
        </Title>
        <Text type="secondary">
          You can deposit amount in any of the following bank accounts:
        </Text>

        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          style={{ marginTop: 16 }}
          size="middle"
        />
      </div>
    </Card>
  );
};

export default PaymentMethods;
