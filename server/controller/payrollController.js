import Payroll from "../models/Payroll.js";

// =====================================
// GET ALL PAYROLL
// =====================================

export const getPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find()
      .populate("employee", "name email department")
      .sort({ createdAt: -1 });

    res.json(payroll);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE PAYROLL
// =====================================

export const getSinglePayroll = async (
  req,
  res
) => {
  try {
    const payroll = await Payroll.findById(
      req.params.id
    ).populate(
      "employee",
      "name email department"
    );

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll not found",
      });
    }

    res.json(payroll);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// CREATE PAYROLL
// =====================================

export const createPayroll = async (
  req,
  res
) => {
  try {
    const {
      employee,
      month,
      year,
      basicSalary,
      allowance,
      bonus,
      deductions,
    } = req.body;

    const exists = await Payroll.findOne({
      employee,
      month,
      year,
    });

    if (exists) {
      return res.status(400).json({
        message:
          "Payroll already exists for this employee this month.",
      });
    }

    const netSalary =
      Number(basicSalary) +
      Number(allowance || 0) +
      Number(bonus || 0) -
      Number(deductions || 0);

    const payroll = await Payroll.create({
      employee,
      month,
      year,
      basicSalary,
      allowance,
      bonus,
      deductions,
      netSalary,
    });

    res.status(201).json(payroll);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// UPDATE PAYROLL
// =====================================

export const updatePayroll = async (
  req,
  res
) => {
  try {
    const payroll = await Payroll.findById(
      req.params.id
    );

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll not found",
      });
    }

    if (payroll.status === "Paid") {
      return res.status(400).json({
        message:
          "Cannot edit a paid payroll.",
      });
    }

    const {
      month,
      year,
      basicSalary,
      allowance,
      bonus,
      deductions,
    } = req.body;

    const netSalary =
      Number(basicSalary) +
      Number(allowance || 0) +
      Number(bonus || 0) -
      Number(deductions || 0);

    payroll.month = month;
    payroll.year = year;
    payroll.basicSalary = basicSalary;
    payroll.allowance = allowance;
    payroll.bonus = bonus;
    payroll.deductions = deductions;
    payroll.netSalary = netSalary;

    await payroll.save();

    res.json(payroll);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// MARK PAYROLL AS PAID
// =====================================

export const markAsPaid = async (
  req,
  res
) => {
  try {
    const payroll = await Payroll.findById(
      req.params.id
    );

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll not found",
      });
    }

    payroll.status = "Paid";
    payroll.paymentDate = new Date();

    await payroll.save();

    res.json(payroll);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// DELETE PAYROLL
// =====================================

export const deletePayroll = async (
  req,
  res
) => {
  try {
    const payroll =
      await Payroll.findByIdAndDelete(
        req.params.id
      );

    if (!payroll) {
      return res.status(404).json({
        message: "Payroll not found",
      });
    }

    res.json({
      message:
        "Payroll deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};