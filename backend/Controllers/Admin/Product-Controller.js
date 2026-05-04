const products = require("../../Models/Product.js");
const { ImageUpload } = require("../../helpers/cloudinary.js");

const addImage = async (req, res) => {
  try {
    if (!req.file) {
     return res.status(400).json({
        success: false,
        message: "No file uploaded...",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUpload(url);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "got some error...",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {title,description,category,price,salePrice,totalStock} = req.body;
    
    console.log(req.body)
    console.log(req.file)

    if(!req.file){
      res.status(400).json({
        success:false,
        message: 'Image not uploaded...'
      })
    }

    const uploadImage = await ImageUpload(req.file.buffer)


    const newProduct = new products({
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      image: uploadImage.secure_url
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });

  } catch (err) {
    console.log(`${err}`)
    res.status(500).json({
      success: false,
      message: "got some error...",
    });
  }


};

const getTheProducts = async (req, res) => {
  try {
    const productList = await products.find({});

    res.status(200).json({
      success: true,
      data: productList,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "got some error...",
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await products.findById(id);

    res.status(404).json({
      success: false,
      message: "No Product found",
    });

    res.status(200).json({
      success: true,
      data: singleProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "got some an error...",
    });
  }
};

const updateTheProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const findProductAndUpdate = await products.findById(id);

    if (!findProductAndUpdate) {
      res.status(400).json({
        success: false,
        message: "No products found...",
      });
    }

    findProductAndUpdate.image = image || findProductAndUpdate.image;
    findProductAndUpdate.title = title || findProductAndUpdate.title;
    findProductAndUpdate.description =
      description || findProductAndUpdate.description;
    findProductAndUpdate.category = category || findProductAndUpdate.category;
    findProductAndUpdate.price = price || findProductAndUpdate.price;
    findProductAndUpdate.salePrice =
      salePrice || findProductAndUpdate.salePrice;
    findProductAndUpdate.totalStock =
      totalStock || findProductAndUpdate.totalStock;

    await findProductAndUpdate.save();

    res.status(200).json({
      success: true,
      data: findProductAndUpdate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "got some error...",
    });
  }
};

const deleteTheProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProducts = await products.findByIdAndDelete(id);

    if (!deleteProducts) {
      res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully...",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "got some error...",
    });
  }
};

module.exports = {
  addImage,
  addProduct,
  getTheProducts,
  getSingleProduct,
  updateTheProducts,
  deleteTheProducts,
};
