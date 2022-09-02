


let phones = [
    {
        _id: 1,
        name:'iphone',
        price: 10.000,
        category: 1,
        image:'https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-08c3c37/wp-content/uploads/2021/09/iPhone_13_PDP_Position-1A_Color_PRODUCTRED__VN-1536x1536.jpg'
        ,description:'iphone 13',
        available: true,
        published:'2021-5-9'
    },
    {
        _id: 12,
        name:'iphone',
        price: 10.000,
        category: 2,
        image:'https://product.hstatic.net/1000370129/product/iphone_12_pro_max_silver_e8d02b9b5d294de7a66fe6b5fc6550bf_master_1b7b978457d24fdcb6dc9538bfe88cb6_master.png'
        ,description:'iphone 13',
        available: true,
        published:'2021-5-9'
    },
    {
        _id: 13,
        name:'iphone',
        price: 10.000,
        category: 3,
        image:'https://product.hstatic.net/1000370129/product/iphone_12_pro_max_black_df03101709f34efda2044662b921edf5_master_85a5656696ec4df8aec3f6e7c0faec99_small.png'
        ,description:'iphone 13',
        available: true,
        published:'2021-5-9'
    },
    {
        _id: 14,
        name:'iphone',
        price: 10.000,
        category: 2,
        image:'https://product.hstatic.net/1000370129/product/iphone_12_pro_max_blue_ca32d53580b8494084a218489eec1cc4_master_d90eb872aace4628b521fdf2a4169dcc_master.png'
        ,description:'iphone 13',
        available: true,
        published:'2021-5-9'
    },
    {
        _id: 15,
        name:'iphone',
        price: 10.000,
        category: 1,
        image:'https://product.hstatic.net/1000370129/product/iphone_12_pro_max_gold_f844e8e0f38944739a8b001878749583_master_2bccc334f98e4be5bd65995f3904c9ea_master.png'
        ,description:'iphone 13',
        available: true,
        published:'2021-5-9'
    },
]

const productModel = require('../models/productModel');

exports.get = async function(){
    
    return await productModel.find();
}

exports.getByCat = async (category)=>{
    return await productModel.find({category: category})
}



//select * from products where _id = ?
exports.getOne = async function(_id){
    const product = await productModel.findById(_id);
    return product;
}
exports.search = async function(text){
const product = await productModel.find({"name":{$regex: ".*" + text +".*"}});
    return product;
}


//insert into product
exports.insert = async function (product) {
    const p = new productModel(product);
     await p.save();
    
}
exports.update = async function (product) {
    
    let doc = await productModel.findById(product._id);
    if(doc){
        doc.name=product.name;
        doc.price= product.price;
        doc.category= product.category;
        doc.image=product.image ? product.image : doc.image;
        doc.description=product.description;
        doc.available=product.available;
        doc.published=product.published;
        await doc.save();
    }
    
}
exports.delete = async function (_id) {
    await productModel.remove({_id: _id});
    
}




















