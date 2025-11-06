"use client"

import { useState } from "react"
import { Button, Modal, Alert } from "antd"
import { DeleteOutlined, WarningOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

const DeleteProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Delete Your Account",
      icon: <WarningOutlined className="text-red-500" />,
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 font-medium">Are you sure you want to delete your account?</p>
          <p className="text-slate-600 text-sm">
            This action cannot be undone. All your profile data, messages, and preferences will be permanently deleted.
          </p>
        </div>
      ),
      okText: "Yes, Delete My Account",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDeleteProfile()
      },
    })
  }

  const handleDeleteProfile = async () => {
    try {
      setIsLoading(true)
      // API call to delete profile
      const response = await fetch("/api/delete-profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        // Show success message
        Modal.success({
          title: "Account Deleted",
          content: "Your account has been successfully deleted. Redirecting to home page...",
          onOk: () => {
            router.push("/")
          },
        })
      } else {
        Modal.error({
          title: "Error",
          content: "Failed to delete your account. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error deleting profile:", error)
      Modal.error({
        title: "Error",
        content: "An error occurred while deleting your account. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Warning Alert */}
      <Alert
        message="Permanent Action"
        description="Deleting your account will permanently remove all your data including profile, matches, and transaction history. This action cannot be reversed."
        type="error"
        showIcon
        className="border-red-200 bg-red-50"
      />

      {/* Delete Account Card */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <DeleteOutlined className="text-red-500 text-xl" />
              <h3 className="text-lg font-bold text-slate-800">Delete Account</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Once you delete your account, there is no going back. Please be certain. This will permanently remove all
              your information from our servers.
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
          <Button
            danger
            type="primary"
            size="large"
            loading={isLoading}
            onClick={showDeleteConfirm}
            className="bg-red-600 hover:bg-red-700 border-none font-semibold"
            icon={<DeleteOutlined />}
          >
            Delete Profile
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h4 className="font-semibold text-slate-800 mb-3">What happens when you delete?</h4>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="text-red-500 font-bold">•</span>
            <span>Your profile will be permanently removed</span>
          </li>
          <li className="flex gap-2">
            <span className="text-red-500 font-bold">•</span>
            <span>No one will see your detail</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default DeleteProfile
