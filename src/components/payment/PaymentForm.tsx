// src/client/components/payment/PaymentForm.tsx
'use client';

import { PackageResponse } from '@/types/package';
import { Form, Input, Radio, Button, Card, Typography, message } from 'antd';
import { useTransaction } from '@/hooks/useTransaction';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

interface Props {
  pkg: PackageResponse;
}

export function PaymentForm({ pkg }: Props) {
  const router = useRouter();
  const { createTransaction, loading } = useTransaction();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await createTransaction({
        packageId: pkg.id,
        paymentMethod: values.paymentMethod,
        mobileNo: values.mobileNo,
        transactionRefNo: values.transactionRefNo,
      });
      message.success('Payment submitted! Awaiting verification.');
      router.push('/dashboard');
    } catch {
      // Error handled in hook
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>{pkg.name} Package</Title>
        <Title level={2} type="danger">
          PKR {pkg.price.toLocaleString()}
        </Title>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Payment Method"
          name="paymentMethod"
          initialValue="telenor_easypaisa"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value="telenor_easypaisa">Telenor Easypaisa</Radio>
            <Radio value="bank_transfer">Bank Transfer</Radio>
            <Radio value="cash">Cash Deposit</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Mobile Number"
          name="mobileNo"
          rules={[{ required: true, message: 'Please enter mobile number' }]}
        >
          <Input placeholder="+923001234567" />
        </Form.Item>

        <Form.Item label="Transaction Ref / CNIC (Optional)" name="transactionRefNo">
          <Input placeholder="e.g. TRX123456" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Submit Payment
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}