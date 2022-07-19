function validateFromCurrency (fromCurrency) {
    if (fromCurrency === '') {
        return "You must select a currency"
    }

    return "";
}

function validateAmount (amount) {
    if (amount === '') {
        return "Amount cannot be empty";
    }

    if (amount <= 0) {
        return "Amount cannot be less than or equal to zero";
    }
    
    return "";
}

function validateDate (date) {
    if (date === '') {
        return "Date cannot be empty";
    }
    
    if(!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date)) { 
        return "Date only supports YYYY-MM-DD format";
    }

    if (Date.parse(date) <= Date.parse('1999-01-04')) {
        return "Date cannot be earlier than 1999-01-04";
    }

    if (Date.parse(date) > Date.parse(getCurrentDate(today))) {
        return "Date cannot be later than today";
    }

    return ""
}