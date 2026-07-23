import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { getPayroll } from "../services/payrollService";

function ViewPayroll() {
  const { id } = useParams();

  const [payroll, setPayroll] = useState(null);

  const payslipRef = useRef(null);

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    try {
      const res = await getPayroll();

      const record = res.data.find(
        (item) => item._id === id
      );

      setPayroll(record);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = async () => {
    try {
      const input = payslipRef.current;

      if (!input) return;

      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
      });

      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pdfWidth =
        pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height * pdfWidth) /
        canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save(
        `${payroll.employee?.name}-${payroll.month}-${payroll.year}-Payslip.pdf`
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!payroll) {
    return (
      <AppLayout>
        <div className="p-10 text-center text-xl">
          Loading Payslip...
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title="Employee Payslip"
        subtitle={`${payroll.month} ${payroll.year}`}
      />

      <div ref={payslipRef}>
        <Card className="max-w-5xl mx-auto p-10 bg-white">

          <div className="flex justify-between items-center border-b pb-6 mb-8">

            <div>

              <h1 className="text-4xl font-bold text-blue-700">
                ND Western HRMS
              </h1>

              <p className="text-gray-500 mt-1">
                Official Employee Payslip
              </p>

            </div>

            <div className="text-right">

              <h2 className="text-2xl font-bold">
                PAYSLIP
              </h2>

              <p>
                {payroll.month} {payroll.year}
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-8 mb-10">

            <div>

              <h3 className="font-semibold text-gray-600">
                Employee Name
              </h3>

              <p className="text-lg">
                {payroll.employee?.name}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-600">
                Department
              </h3>

              <p className="text-lg">
                {payroll.employee?.department}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-600">
                Payroll Period
              </h3>

              <p>
                {payroll.month} {payroll.year}
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-gray-600">
                Status
              </h3>

              <span
                className={`px-3 py-1 rounded-full text-white ${
                  payroll.status === "Paid"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                }`}
              >
                {payroll.status}
              </span>

            </div>

          </div>

          <table className="w-full border">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4 text-right">
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="p-4">
                  Basic Salary
                </td>

                <td className="p-4 text-right">
                  ₦
                  {Number(
                    payroll.basicSalary
                  ).toLocaleString()}
                </td>

              </tr>

              <tr className="border-b">

                <td className="p-4">
                  Allowance
                </td>

                <td className="p-4 text-right">
                  ₦
                  {Number(
                    payroll.allowance || 0
                  ).toLocaleString()}
                </td>

              </tr>

              <tr className="border-b">

                <td className="p-4">
                  Bonus
                </td>

                <td className="p-4 text-right">
                  ₦
                  {Number(
                    payroll.bonus || 0
                  ).toLocaleString()}
                </td>

              </tr>

              <tr className="border-b">

                <td className="p-4 text-red-600">
                  Deductions
                </td>

                <td className="p-4 text-right text-red-600">
                  - ₦
                  {Number(
                    payroll.deductions || 0
                  ).toLocaleString()}
                </td>

              </tr>

              <tr className="font-bold text-2xl bg-green-50">

                <td className="p-5">
                  Net Salary
                </td>

                <td className="p-5 text-right text-green-700">
                  ₦
                  {Number(
                    payroll.netSalary
                  ).toLocaleString()}
                </td>

              </tr>

            </tbody>

          </table>

          <div className="mt-16 flex justify-between">

            <div>

              <p className="font-semibold">
                Employer Signature
              </p>

              <div className="border-b w-56 mt-10"></div>

            </div>

            <div>

              <p className="font-semibold">
                Employee Signature
              </p>

              <div className="border-b w-56 mt-10"></div>

            </div>

          </div>

        </Card>
      </div>

      <div className="max-w-5xl mx-auto mt-8 flex gap-4">

        <Button onClick={downloadPDF}>
          Download PDF
        </Button>

        <Button
          onClick={() => window.print()}
        >
          Print Payslip
        </Button>

      </div>

    </AppLayout>
  );
}

export default ViewPayroll;