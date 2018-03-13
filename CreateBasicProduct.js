'use strict';

const doc = require('dynamodb-doc');
const dynamodb = new doc.DynamoDB();

exports.handler = (input, context, callback) => {
  console.log('Received input:', JSON.stringify(input, null, 2));
  if (input.fail_create_basic_product) {
    callback("Internal Server Error");
  } else {
    var day = new Date();
    var idProduct = day.getMilliseconds();  

    console.log("ID " + idProduct);
    console.log("item " + input);
    console.log("idcustomer " + input.idcustomer);
    console.log("images " + input.product.images.length);
    console.log("categories " + input.product.categories.length);

    let req = {
      TableName: "Product",
      Item: { 
        ID           : idProduct,
        customerid   : input.idcustomer,
        name         : input.product.name,
        description  : input.product.description,
        valuep       : input.product.value,
        initialStock : input.product.initialStock,
        statep       : 'CREATED',
        createTime   : day.toLocaleString()
      }
    }
    
    var parameters = null ;
    parameters = { 
        "idproduct": idProduct
    }
    
    dynamodb.putItem(req, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
    
    console.log("callback parameters = ["+JSON.stringify(parameters,null,2)+"]");
    
    callback(null, parameters);

  }
};
