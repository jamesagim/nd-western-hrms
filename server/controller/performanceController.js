import Performance from "../models/Performance.js";

// =====================================
// GET ALL PERFORMANCE REVIEWS
// =====================================

export const getPerformance = async (req, res) => {
  try {
    const performance = await Performance.find()
      .populate(
        "employee",
        "name email department"
      )
      .sort({
        createdAt: -1,
      });

    res.json(performance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE PERFORMANCE REVIEW
// =====================================

export const getSinglePerformance = async (
  req,
  res
) => {
  try {
    const performance =
      await Performance.findById(
        req.params.id
      ).populate(
        "employee",
        "name email department"
      );

    if (!performance) {
      return res.status(404).json({
        message:
          "Performance review not found",
      });
    }

    res.json(performance);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================================
// CREATE PERFORMANCE REVIEW
// =====================================

export const createPerformance = async (
  req,
  res
) => {
  try {
    const performance =
      await Performance.create({
        employee: req.body.employee,
        reviewer: req.body.reviewer,
        reviewPeriod:
          req.body.reviewPeriod,
        rating: req.body.rating,
        goals: req.body.goals,
        comments: req.body.comments,
        status:
          req.body.status ||
          "Pending",
      });

    res.status(201).json(
      performance
    );
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

// =====================================
// UPDATE PERFORMANCE REVIEW
// =====================================

export const updatePerformance = async (
  req,
  res
) => {
  try {
    const performance =
      await Performance.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!performance) {
      return res.status(404).json({
        message:
          "Performance review not found",
      });
    }

    res.json(performance);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
};

// =====================================
// DELETE PERFORMANCE REVIEW
// =====================================

export const deletePerformance = async (
  req,
  res
) => {
  try {
    const performance =
      await Performance.findByIdAndDelete(
        req.params.id
      );

    if (!performance) {
      return res.status(404).json({
        message:
          "Performance review not found",
      });
    }

    res.json({
      message:
        "Performance review deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};