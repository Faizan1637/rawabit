// src/client/components/profile/ProfileDetailView.tsx
'use client';

import { useState } from 'react';
import {
  User,
  MapPin,
  GraduationCap,
  Heart,
  Home,
  Users,
  BookOpen,
  Calendar,
  Crown,
  Phone,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { transactionApi } from '@/client/api/transaction.api';
import { calculateAge } from '@/lib/utils/age-calculator';
import {
  Card,
  Descriptions,
  Button,
  Typography,
  message,
  Alert,
  Divider,
  Space,
} from 'antd';

const { Title, Text } = Typography;

interface ProfileDetailViewProps {
  profile: any;
}

function ContactSection({ profileId, profileName }: { profileId: string; profileName: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);

  const handleViewContact = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionApi.viewContact(profileId);
      setContactInfo(data);
      if (data.subscription?.remainingCount !== undefined) {
        message.info(`${data.subscription.remainingCount} views remaining`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to view contact');
    } finally {
      setLoading(false);
    }
  };

  if (contactInfo) {
    return (
      <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="flex items-start gap-4 mb-6">
          <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
          <div>
            <Title level={4}>Contact Information</Title>
            <Text type="success">{contactInfo.message}</Text>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <Space direction="vertical">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-orange-500" />
                <Text strong>Parents Mobile</Text>
              </div>
              <a
                href={`tel:${contactInfo.parentsMobileNo}`}
                className="text-2xl font-bold text-orange-600 hover:text-orange-700"
              >
                {contactInfo.parentsMobileNo}
              </a>
            </Space>
          </Card>

          {contactInfo.parentsPhone && (
            <Card>
              <Space direction="vertical">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <Text strong>Parents Phone</Text>
                </div>
                <a
                  href={`tel:${contactInfo.parentsPhone}`}
                  className="text-2xl font-bold text-orange-600 hover:text-orange-700"
                >
                  {contactInfo.parentsPhone}
                </a>
              </Space>
            </Card>
          )}
        </div>

        {contactInfo.subscription && (
          <div className="mt-4 p-3 bg-white rounded-lg text-center">
            <Text>
              <Text strong type="warning">
                {contactInfo.subscription.remainingCount}
              </Text>{' '}
              contact views remaining
            </Text>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card className="border-2 border-orange-300 bg-gradient-to-br from-amber-50 to-orange-50">
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          icon={<AlertCircle className="w-5 h-5" />}
          className="mb-4"
        />
      )}

      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg flex-shrink-0">
          <Crown className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <Title level={4}>Want to Connect?</Title>
          <Text className="block mb-2">
            Phone numbers are available to <Text strong type="warning">Premium Members</Text> only.
          </Text>
          <Text type="secondary" className="block mb-4">
            Upgrade to unlock contact details and connect with your potential life partner.
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={handleViewContact}
            loading={loading}
            danger
          >
            {loading ? 'Checking...' : 'Unlock Contact'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function ProfileDetailView({ profile }: ProfileDetailViewProps) {
  const p = profile.data.profile;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <User className="w-20 h-20 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <Title level={1} className="text-white mb-2">
              {p.fullName}
            </Title>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-lg">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {calculateAge(p.dateOfBirth)} Years
              </span>
              <span>•</span>
              <span className="capitalize">{p.gender}</span>
              <span>•</span>
              <span className="capitalize">{p.maritalStatus}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-3">
              <MapPin className="w-5 h-5" />
              <span>
                {p.livesInCity}, {p.livesInState}, {p.livesInCountry}
              </span>
            </div>
            <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Text className="text-sm font-semibold">
                Serial No: {p.serialNo || p.id?.slice(-6) || 'N/A'}
              </Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <Title level={3}>Personal Information</Title>
        </div>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Full Name">{p.fullName}</Descriptions.Item>
          <Descriptions.Item label="Gender">{p.gender}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">{p.dateOfBirth}</Descriptions.Item>
          <Descriptions.Item label="Age">{calculateAge(p.dateOfBirth)} Years</Descriptions.Item>
          <Descriptions.Item label="Height">{p.height}</Descriptions.Item>
          <Descriptions.Item label="Body Type">{p.bodyType}</Descriptions.Item>
          <Descriptions.Item label="Complexion">{p.complexion}</Descriptions.Item>
          {p.hasBeard && <Descriptions.Item label="Has Beard">{p.hasBeard}</Descriptions.Item>}
          {p.disabilities && <Descriptions.Item label="Disabilities">{p.disabilities}</Descriptions.Item>}
        </Descriptions>
      </Card>

      {/* Religious & Cultural */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <Title level={3}>Religious & Cultural Background</Title>
        </div>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Religion">{p.religion}</Descriptions.Item>
          <Descriptions.Item label="Caste">{p.caste}</Descriptions.Item>
          <Descriptions.Item label="Islamic Education">{p.islamicEducation}</Descriptions.Item>
          <Descriptions.Item label="Marital Status">{p.maritalStatus}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Education & Career */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <Title level={3}>Education & Career</Title>
        </div>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Qualification">{p.qualification}</Descriptions.Item>
          <Descriptions.Item label="Degree">{p.degree}</Descriptions.Item>
          <Descriptions.Item label="Profession">{p.profession}</Descriptions.Item>
          {p.designation && <Descriptions.Item label="Designation">{p.designation}</Descriptions.Item>}
          <Descriptions.Item label="Monthly Income">PKR {p.monthlyIncome?.toLocaleString()}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Family Background */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <Title level={3}>Family Background</Title>
        </div>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Father's Name">{p.fathersName}</Descriptions.Item>
          <Descriptions.Item label="Father Status">{p.fatherAlive}</Descriptions.Item>
          <Descriptions.Item label="Father's Occupation">{p.fathersOccupation}</Descriptions.Item>
          <Descriptions.Item label="Brothers">{p.numberOfBrothers}</Descriptions.Item>
          <Descriptions.Item label="Sisters">{p.numberOfSisters}</Descriptions.Item>
          <Descriptions.Item label="Married Brothers">{p.numberOfMarriedBrothers}</Descriptions.Item>
          {p.numberOfSons !== undefined && <Descriptions.Item label="Sons">{p.numberOfSons}</Descriptions.Item>}
          {p.numberOfDaughters !== undefined && <Descriptions.Item label="Daughters">{p.numberOfDaughters}</Descriptions.Item>}
        </Descriptions>
      </Card>

      {/* Location */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <Title level={3}>Location Information</Title>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Title level={5} className="flex items-center gap-2">
              <Home className="w-5 h-5 text-orange-500" /> Origin
            </Title>
            <Descriptions layout="vertical" column={1}>
              <Descriptions.Item label="Country">{p.fromCountry}</Descriptions.Item>
              <Descriptions.Item label="State">{p.fromState}</Descriptions.Item>
              <Descriptions.Item label="City">{p.fromCity}</Descriptions.Item>
            </Descriptions>
          </div>
          <div>
            <Title level={5} className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" /> Current
            </Title>
            <Descriptions layout="vertical" column={1}>
              <Descriptions.Item label="Country">{p.country}</Descriptions.Item>
              <Descriptions.Item label="State">{p.state}</Descriptions.Item>
              <Descriptions.Item label="City">{p.city}</Descriptions.Item>
            </Descriptions>
          </div>
        </div>
        <Divider />
        <Descriptions column={1}>
          <Descriptions.Item label="Complete Address">{p.address}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Lifestyle */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <Title level={3}>Lifestyle</Title>
        </div>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Lifestyle">{p.lifeStyle}</Descriptions.Item>
          <Descriptions.Item label="House Status">{p.houseStatus}</Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Requirements */}
      {p.requirements && (
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <Title level={3}>Partner Requirements</Title>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg">
            <Text className="whitespace-pre-wrap">{p.requirements}</Text>
          </div>
        </Card>
      )}

      {/* Contact Section */}
      <ContactSection profileId={p.id} profileName={p.fullName} />
    </div>
  );
}