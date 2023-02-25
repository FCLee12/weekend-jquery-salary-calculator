// confirming script.js is loaded
console.log( 'script.js is ready' );

// this array will hold all the employee objects
let employees = [];

// jQuery is ready once DOM is loaded
$( document ).ready( onReady );

function onReady() {
    console.log( 'jQuery is ready' );

    // listener for 'addEmployeeBtn' Submit Button
    $('#addEmployeeBtn').on('click', addEmployee);
}

function addEmployee() {
    console.log( 'addEmployee is running' );

    // grab the information from the inputs using selectors
    const employeeFirstName = $( '#firstName' ).val();
    const employeeLastName = $( '#lastName' ).val();
    const employeeIdNumber = $( '#idNumber' ).val();
    const employeeJobTitle = $( '#jobTitle' ).val();
    const employeeAnnualSalary = $( '#annualSalary' ).val();

    // log out info variables to confirm it's working correctly
    // console.log( employeeFirstName );
    // console.log( employeeLastName );
    // console.log( employeeIdNumber );
    // console.log( employeeJobTitle );
    // console.log( employeeAnnualSalary );
        // all variables working as intended

    // create an object to hold the employee info
    let newEmployee = {
        firstName: employeeFirstName,
        lastName: employeeLastName,
        id: employeeIdNumber,
        title: employeeJobTitle,
        annualSalary: new Intl.NumberFormat('en-US').format(employeeAnnualSalary)
    }

    // console log new employee object to make sure it's working
    // console.log( newEmployee );
        // confirmed object is working correctly
    
    // push the newEmployee object into the employees array
    employees.push( newEmployee );
    
    // console.log global employees array
    // console.log( employees );
        //confirmed newEmployee is being pushed to employees array

    // renders new table row
    render()


    // empties input fields    
    emptyInputs();
}

// function to empty input fields
function emptyInputs() {
    $( '#firstName' ).val( '' );
    $( '#lastName' ).val( '' );
    $( '#idNumber' ).val( '' );
    $( '#jobTitle' ).val( '' );
    $( '#annualSalary' ).val( '' );
}

// render function to create table row for a new employee
function render() {
    console.log( 'render is running' );

    /* starting point is the headerRow, navigating from there
    you can target only the siblings and remove them to clear the board */
    $('#tableHeader').siblings().remove();
    
    let monthlyCost = 0;

    for( let employee of employees ){
        console.log( 'This is an employee:', employee );
        

        $('#tableHeader').after(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td>$${employee.annualSalary}</td>
                <td>
                    <button id='deleteBtn'>Delete</button>
                </td>
            </tr>
        `)

        console.log(  );
        monthlyCostCalc( employee );
        
        // should include the new monthlyPay property
        // console.log( employee );
            //confirmed that employee object has monthlyPay property
        
        monthlyCost += employee.monthlyPay;
    }

    // switches monthlyCost into USD formatting
    let monthlyCostFormatted = new Intl.NumberFormat('en-US').format(monthlyCost);
    console.log( monthlyCostFormatted );

    $('#displayCost').empty();

    // renders the Monthly Cost Amount
    $('#displayCost').append(`
        <h2>Total Monthly: $${monthlyCostFormatted}</h2>
    `)
}

// To-Do: Create a Function to calculate Monthly Costs using object.annualSalary of each employee added
    //could be added to render for loop
    //REMEMBER Annual Salary divided by 12 will get you the monthly cost

    // should take in an employee object as a parameter
function monthlyCostCalc( employee ) {
    console.log( 'monthlyCostCalc running' );


    // grab the annual salary property from the object, divide it by 12 (for each month) and store it in a variable
        // Number( employee.annualSalary.replace(/[^0-9.-]+/g,"") ) is to change the annualSalary back into a number instead of currency
            // I have no idea how this works though: .replace(/[^0-9.-]+/g,"")
        // since I'm using the '/' it should auto swap the result to a number
        // Math.round to round to the nearest integer
    let monthlyCost = Number( employee.annualSalary.replace(/[^0-9.-]+/g,"") )/12;
    // console.log( 'this is monthlyCost in the calc:', monthlyCost );
        //confirmed that result is a number and logs okay

    // creates property monthlyPay to the employee object and sets the value to monthlyCost
        // will be useful when removing the object and employee cost from monthly total
    employee.monthlyPay = Number(monthlyCost.toFixed(2));
    // console.log( employee );
        //confirmed that employee object holds new monthlyPay property and value properly
    
}