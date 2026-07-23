import Document from "../models/Document.js";

// =====================================
// GET ALL DOCUMENTS
// =====================================

export const getDocuments = async (req, res) => {
  try {

    const documents = await Document.find()
      .populate(
        "employee",
        "name department email"
      )
      .sort({
        createdAt: -1,
      });

    res.json(documents);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// =====================================
// GET SINGLE DOCUMENT
// =====================================

export const getDocument = async (req, res) => {
  try {

    const document = await Document.findById(
      req.params.id
    ).populate(
      "employee",
      "name department email"
    );

    if (!document) {

      return res.status(404).json({
        message: "Document not found",
      });

    }

    res.json(document);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// =====================================
// CREATE DOCUMENT
// =====================================

export const createDocument = async (req, res) => {
  try {

    const document = await Document.create({

      employee: req.body.employee,

      title: req.body.title,

      category: req.body.category,

      fileName: req.body.fileName,

      fileUrl: req.body.fileUrl,

      uploadedBy: req.body.uploadedBy,

      description: req.body.description,

    });

    res.status(201).json(document);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message,
    });

  }
};

// =====================================
// UPDATE DOCUMENT
// =====================================

export const updateDocument = async (req, res) => {
  try {

    const document =
      await Document.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );

    if (!document) {

      return res.status(404).json({
        message: "Document not found",
      });

    }

    res.json(document);

  } catch (error) {

    console.error(error);

    res.status(400).json({
      message: error.message,
    });

  }
};

// =====================================
// DELETE DOCUMENT
// =====================================

export const deleteDocument = async (req, res) => {
  try {

    const document =
      await Document.findByIdAndDelete(
        req.params.id
      );

    if (!document) {

      return res.status(404).json({
        message: "Document not found",
      });

    }

    res.json({
      message:
        "Document deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }
};