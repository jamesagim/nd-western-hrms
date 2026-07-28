import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { getSinglePayroll } from "../services/payrollService";

import { ArrowLeft, Download, Printer } from "lucide-react";

import { toast } from "react-toastify";

function ViewPayroll() {
  const { id } = useParams();

  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  const payslipRef = useRef(null);
  
useEffect(() => {
  if (id) {
    fetchPayroll();
  }
}, [id]);

  const fetchPayroll = async () => {
    try {
      setLoading(true);
      const res = await getSinglePayroll(id);
      setPayroll(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed loading payroll.");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const canvas = await html2canvas(payslipRef.current, {
        scale: 2,
        useCORS: true,
      });

      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${payroll.employee?.name}-${payroll.month}-${payroll.year}.pdf`);
    } catch (error) {
      console.log(error);
      toast.error("Failed downloading PDF.");
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-8">Loading payroll...</div>
      </AppLayout>
    );
  }

  if (!payroll) {
    return (
      <AppLayout>
        <div className="p-8">Payroll not found.</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title="Payroll Details"
        subtitle={`${payroll.month} ${payroll.year}`}
        actions={
          <Link to="/payroll">
            <Button>
              <div className="flex items-center gap-2">
                <ArrowLeft size={18} />
                Back
              </div>
            </Button>
          </Link>
        }
      />

      <Card ref={payslipRef} className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center border-b pb-6">
          <div>
            <h2 className="text-3xl font-bold">ND Western HRMS</h2>
            <p className="text-gray-500">Employee Payslip</p>
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-bold">PAYSLIP</h2>
            <p>{payroll.month} {payroll.year}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <p className="text-gray-500">Employee</p>
            <h3 className="font-bold text-lg">{payroll.employee?.name}</h3>
          </div>

          <div>
            <p className="text-gray-500">Department</p>
            <h3 className="font-bold text-lg">{payroll.employee?.department}</h3>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <h3 className="font-bold text-lg">{payroll.employee?.email}</h3>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <span
              className={`inline-block mt-2 px-4 py-2 rounded-full text-white ${
                payroll.status === "Paid" ? "bg-green-600" : "bg-yellow-600"
              }`}
            >
              {payroll.status}
            </span>
          </div>
        </div>

        <table className="w-full mt-10 border">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-4">Basic Salary</td>
              <td className="p-4 text-right">₦{Number(payroll.basicSalary).toLocaleString()}</td>
            </tr>

            <tr className="border-b">
              <td className="p-4">Allowance</td>
              <td className="p-4 text-right">₦{Number(payroll.allowance).toLocaleString()}</td>
            </tr>

            <tr className="border-b">
              <td className="p-4">Bonus</td>
              <td className="p-4 text-right">₦{Number(payroll.bonus).toLocaleString()}</td>
            </tr>

            <tr className="border-b">
              <td className="p-4 text-red-600">Deductions</td>
              <td className="p-4 text-right text-red-600">- ₦{Number(payroll.deductions).toLocaleString()}</td>
            </tr>

            <tr className="bg-green-50">
              <td className="p-5 font-bold">Net Salary</td>
              <td className="p-5 text-right font-bold text-green-700">₦{Number(payroll.netSalary).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <div className="max-w-5xl mx-auto mt-6 flex gap-4">
        <Button onClick={downloadPDF}>
          <div className="flex items-center gap-2">
            <Download size={18} />
            Download PDF
          </div>
        </Button>

        <Button onClick={() => window.print()}>
          <div className="flex items-center gap-2">
            <Printer size={18} />
            Print
          </div>
        </Button>
      </div>
    </AppLayout>
  );
}

export default ViewPayroll;