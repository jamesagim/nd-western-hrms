import Button from "../ui/Button";

function CompanySettings({
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
        Company Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">
            Company Email
          </label>

          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">
            Phone
          </label>

          <input
            type="text"
            name="companyPhone"
            value={formData.companyPhone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">
            Website
          </label>

          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>
      </div>

      <div>
        <label className="font-semibold">
          Company Address
        </label>

        <textarea
          rows="4"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-2"
        />
      </div>

      <Button type="submit">
        Save Company Settings
      </Button>
    </form>
  );
}

export default CompanySettings;