function SettingsSidebar({
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    "Company",
    "Profile",
    "Security",
    "Preferences",
    "Appearance",
  ];

  return (
    <div className="w-64 bg-white rounded-2xl shadow-sm p-6">

      <h2 className="text-xl font-bold mb-6">
        Settings
      </h2>

      <div className="space-y-2">

        {tabs.map((tab) => (

          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

    </div>
  );
}

export default SettingsSidebar;