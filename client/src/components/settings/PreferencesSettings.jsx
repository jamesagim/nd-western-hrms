import Button from "../ui/Button";

function PreferencesSettings({
  formData,
  handleChange,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold">
        Preferences
      </h2>

      <p className="text-gray-500">
        Configure your regional and system preferences.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div>

          <label className="font-semibold">
            Currency
          </label>

          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="₦">
              Nigerian Naira (₦)
            </option>

            <option value="$">
              US Dollar ($)
            </option>

            <option value="£">
              British Pound (£)
            </option>

            <option value="€">
              Euro (€)
            </option>

          </select>

        </div>

        <div>

          <label className="font-semibold">
            Timezone
          </label>

          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="Africa/Lagos">
              Africa/Lagos
            </option>

            <option value="Europe/London">
              Europe/London
            </option>

            <option value="America/New_York">
              America/New_York
            </option>

            <option value="Asia/Dubai">
              Asia/Dubai
            </option>

          </select>

        </div>

        <div>

          <label className="font-semibold">
            Date Format
          </label>

          <select
            name="dateFormat"
            value={formData.dateFormat}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="DD/MM/YYYY">
              DD/MM/YYYY
            </option>

            <option value="MM/DD/YYYY">
              MM/DD/YYYY
            </option>

            <option value="YYYY-MM-DD">
              YYYY-MM-DD
            </option>

          </select>

        </div>

      </div>

      <Button type="submit">
        Save Preferences
      </Button>

    </form>
  );
}

export default PreferencesSettings;