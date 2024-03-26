const Brand = require("../models/brand");
const ImageFile = require('../utils/ImageFile');

exports.createBrand = async (req, res, next) => {
    try {
        req.body.images = await ImageFile.uploadMultiple({
            imageFiles: req.files,
            request: req
        })

        const brand = await Brand.create(req.body);

        return res.status(200).json({
            success: true,
            message: 'Brand successfully created',
            brand: brand,
        })

    } catch (error) {
        console.log("error creating a brand", error);
        res.status(500).json({ message: "Brand Creation Failed" })
    }
}