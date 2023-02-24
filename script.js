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
        annualSalary: employeeAnnualSalary
    }

    // console log new employee object to make sure it's working
    // console.log( newEmployee );
        // confirmed object is working correctly
    
    // push the newEmployee object into the employees array
    employees.push( newEmployee );
    
    // console.log global employees array
    // console.log( employees );
        //confirmed newEmployee is being pushed to employees array


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

}