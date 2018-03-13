'use strict';

const doc = require('dynamodb-doc');
const dynamodb = new doc.DynamoDB();

exports.handler = (input, context, callback) => {
  console.log('Received input:', JSON.stringify(input, null, 2));
  if (input.fail_charge_cost) {
    console.log("ERROR " + input.fail_create_image);  
    callback("Internal Server Error");
  } else {
    var d = new Date();
    var n = d.getMilliseconds();  
    
    var billing = 5000;
    
    console.log("ID " + n);
    console.log("product " + input);
    console.log("idcustomer " + input.idcustomer);
    console.log("idproduct " + input.CreateBasicProductResult.idproduct);
    console.log("idscategories " + input.CreateCategoryResult.idscategories);
    console.log("billing " + billing);
  
    let req = {
        TableName: "Billing",
        Item: { 
            ID          : n,
            idcustomer  : input.idcustomer,
            idproduct   : input.CreateCategoryResult.idproduct,
            billing     : billing,
            createTime  : n
        }
    }
    
    dynamodb.putItem(req, function(err, data) {
      if (err) console.log(err);
      else console.log(data);
    });

    var parameters = { 
        "idproduct": input.CreateBasicProductResult.idproduct,
        "idscategories": input.CreateCategoryResult.idscategories,
        "idbilling": n
    }
    
    console.log("callback parameters = ["+JSON.stringify(parameters,null,2)+"]");
    
    callback(null, parameters);
    
  }
};