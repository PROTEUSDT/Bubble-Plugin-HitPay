function(properties, context) {
	//Variable Setup
	let postParameters = {
        amount: properties.transaction_amount,
        currency: properties.transaction_currency
    }
    
    //Variable Setting - General
    if (properties.general_redirect_url) {postParameters.redirect_url = properties.general_redirect_url}
    if (properties.general_webhook) {postParameters.webhook = properties.general_webhook}
    if (properties.general_send_email) {postParameters.send_email = properties.general_send_email}
    if (properties.general_send_sms) {postParameters.send_sms = properties.general_send_sms}
    if (properties.general_expires_after) {postParameters.expires_after = properties.general_expires_after}
    
    
    //Variable Setting - Transaction
    if (properties.transaction_purpose) {postParameters.purpose = properties.transaction_purpose}
    if (properties.transaction_reference) {postParameters.reference_number = properties.transaction_reference}
    
	//Variable Setting - Buyer
    if (properties.buyer_name) {postParameters.name = properties.buyer_name}
    if (properties.buyer_email) {postParameters.email = properties.buyer_email}
    if (properties.buyer_phone) {postParameters.phone = properties.buyer_phone}
    
    
    //Variable Setting - API
    let api_link = ""
    if(properties.dev_version){api_link = 'https://api.sandbox.hit-pay.com/v1/payment-requests'}else{api_link = 'https://api.hit-pay.com/v1/payment-requests'}
    
    
	//Posting Request
	let postRequest = {
        method: 'POST',
        uri: api_link,
        form: postParameters,
        headers: {
            accept: 'application/json',
            'X-BUSINESS-API-KEY': properties.api_key,
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'application/json'
      	}
    }
    
	//Submit Request
    var postResult = context.request(postRequest);
    var error, requestObj;
    if (postResult.statusCode.toString().charAt(0) !== "2"){
        error = JSON.stringify(JSON.parse(postResult.body));
        return {
            return_error: error
        }
    }else{
        requestObj = JSON.parse(postResult.body) 
        return {
            return_id: requestObj.id,
            return_url: requestObj.url
        }
    }
}