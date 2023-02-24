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
    
    for( let employee of employees ){
        console.log( 'This is an employee:', employee );

        $('#tableHeader').after(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td>${employee.annualSalary}</td>
                <td>
                    <button id='deleteBtn'>Delete</button>
                </td>
            </tr>
        `)
    }
}

// To-Do: Create a Function to calculate Monthly Costs using object.annualSalary of each employee added
    //could be added to render for loop
    //REMEMBER Annual Salary divided by 12 will get you the monthly cost