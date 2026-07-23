import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import SettingsSidebar from "../components/settings/SettingsSidebar";
import CompanySettings from "../components/settings/CompanySettings";
import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import PreferencesSettings from "../components/settings/PreferencesSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";

import {
  getSettings,
  updateSettings,
} from "../services/settingsService";

import { toast } from "react-toastify";

function Settings() {
  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("Company");

  const [formData, setFormData] =
    useState({
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyWebsite: "",
      companyAddress: "",
      currency: "₦",
      timezone: "Africa/Lagos",
      dateFormat: "DD/MM/YYYY",
      theme: "Light",
    });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res =
        await getSettings();

      setFormData(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await updateSettings(
        formData
      );

      toast.success(
        "Settings updated successfully."
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to update settings."
      );
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-10">
          Loading...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <PageHeader
        title="Settings"
        subtitle="Manage system settings"
      />

      <div className="flex gap-8 items-start">

        <SettingsSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <Card className="flex-1">

          {activeTab ===
            "Company" && (
            <CompanySettings
              formData={formData}
              handleChange={
                handleChange
              }
              handleSubmit={
                handleSubmit
              }
            />
          )}

          {activeTab ===
            "Profile" && (
            <ProfileSettings />
          )}

          {activeTab ===
            "Security" && (
            <SecuritySettings />
          )}

          {activeTab ===
            "Preferences" && (
            <PreferencesSettings
              formData={formData}
              handleChange={
                handleChange
              }
              handleSubmit={
                handleSubmit
              }
            />
          )}

          {activeTab ===
            "Appearance" && (
            <AppearanceSettings
              formData={formData}
              handleChange={
                handleChange
              }
              handleSubmit={
                handleSubmit
              }
            />
          )}

        </Card>

      </div>

    </AppLayout>
  );
}

export default Settings;