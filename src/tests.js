function testValidateFromCurrency() {
    console.assert(
        validateFromCurrency('') === "You must select a currency",
        'Validate from currency did not validate that the field is not empty'
    );

    console.assert(
        validateFromCurrency('USD') === "",
        'Validate from currency failed with a correct input'
    );
};

function testValidateAmount() {
    console.assert(
        validateAmount('') === "Amount cannot be empty",
        'Validate amount did not validate that the amount is not empty'
    );

    console.assert(
        validateAmount('-10') === "Amount cannot be less than or equal to zero",
        'Validate amount did not validate that the amount is not less than or equal to zero'
    );

    console.assert(
        validateAmount('1.5') === "",
        'Validate amount failed with correct amount'
    );
};

function testValidateDate() {
    console.assert(
        validateDate('') === "Date cannot be empty",
        'Validate date did not validate that the date is not empty'
    );

    console.assert(
        validateDate('28-06-2022') === "Date only supports YYYY-MM-DD format",
        'Validate date did not validate that the date is not in the correct format'
    );

    console.assert(
        validateDate('1998-05-15') === "Date cannot be earlier than 1999-01-04",
        'Validate date did not validate that the date is not earlier than 1999-01-04'
    );

    console.assert(
        validateDate('2500-05-15') === "Date cannot be later than today",
        'Validate date did not validate that the date is not later than today'
    );

    console.assert(
        validateDate('2022-06-28') === "",
        'Validate date failed with a correct date'
    );
};

testValidateFromCurrency();
testValidateAmount();
testValidateDate();