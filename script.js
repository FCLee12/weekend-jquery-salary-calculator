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

    // listener for 'deleteBtn' Delete button
        // has to target the parent table since it's dynamically generated
    $('#renderTable').on('click', '#deleteBtn',removeEmployee);
}

// function that happens on a submit button click
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
        annualSalary: employeeAnnualSalary,
        unique: 0
    }

    // console log new employee object to make sure it's working
    console.log( newEmployee );
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
    
    // deconstructed form of a for of loop? don't fully understand it but it works
        // requires the [i,  ] and .entries() to work properly
    for( let [i, employee] of employees.entries() ){
        console.log( 'This is an employee:', employee );
        let formattedAnnualSalary = new Intl.NumberFormat('en-US').format(employee.annualSalary)

        $('#tableHeader').after(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.title}</td>
                <td>$${formattedAnnualSalary}</td>
                <td>
                    <button id='deleteBtn'>Delete</button>
                </td>
            </tr>
            <tr>
                <th>White Space</th>
            </tr>
        `)

        // Adds another property, uses the index as a unique identifier in each employee object
            // since it's unique, when you select for deletion you only target that one and not all others with a shared property value
        employee.unique = i;
        console.log( employee );
            // confirmed 

        monthlyCostCalc( employee );
        
        // should include the new monthlyPay property
        // console.log( employee );
            //confirmed that employee object has monthlyPay property
        
        monthlyCost += employee.monthlyPay;
    }

    // switches monthlyCost into USD formatting
    let monthlyCostFormatted = new Intl.NumberFormat('en-US').format(monthlyCost);
    console.log( monthlyCostFormatted );

    // empties the <div> to avoid duplicate displaying
    $('#displayCost').empty();

    // renders the Total Monthly Amount
    $('#displayZone').next().html(`
        <div id="displayCost">
            <h2>Total Monthly: $${monthlyCostFormatted}</h2>
        </div>
    `)

    // turns the display <div> for the total monthly cost background red if total is > $20000
    if( monthlyCost > 20000 ) {
        $('#displayCost').css( 'background-color', 'red' )
    }
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
        // .toFixed() limits the number of decimal places, the 2 indicates two decimal place limit
            // Number() required because .toFixed() returns a string value
    employee.monthlyPay = Number(monthlyCost.toFixed(2));
    // console.log( employee );
        //confirmed that employee object holds new monthlyPay property and value properly
    
}

// function to remove the employee object from the employees array
    // subtract the monthlyCost from the Total Monthly total
    // and re-render the DOM
// added a property inside each object to track its index
    //I can use that to pull an individual object and remove it
// may require a loop with nested conditional
    // select find the firstName value view the button click
    // take that value to move all employee objects with matching firstName properties into a separate array
    // from that array with matching firstName, search 
function removeEmployee() {
    console.log( 'removeEmployee is running' );

    // base model
    // $(this).parent().parent().remove();

    // navigate from the button to the last property ( unique: index# )
        // once that text has been selected, you can splice it out at its index
        // ALT: create a new array and pass in all except the object at that index
    
    let employeeFirstNameToDelete = $(this).parent().siblings().first().text();
    let employeeLastNameToDelete = $(this).parent().siblings().nextAll().eq(0).text();
    let employeeIdNumberToDelete = $(this).parent().siblings().nextAll().eq(1).text();
    let employeeJobTitleToDelete = $(this).parent().siblings().nextAll().eq(2).text();
    let employeeAnnualSalaryToDelete = $(this).parent().siblings().last().text();
    console.log( employeeFirstNameToDelete );
    console.log( employeeLastNameToDelete );
    console.log( employeeIdNumberToDelete );
    console.log( employeeJobTitleToDelete );
    console.log( employeeAnnualSalaryToDelete );
    // used to test change before making change below
    // console.log( Number( employeeAnnualSalaryToDelete.replace(/[^0-9.-]+/g,"") ) );


    let safeEmployees = [];

    for(let employee of employees  ) {
        if( employeeFirstNameToDelete !== employee.firstName ){
            safeEmployees.push( employee );
        }
    }

    // attempt at adding more specification checks to only target the object
        // and none of the ones sharing the same value
        // couldn't get it to work

    // used to check progress
    // console.log( 'safeEmployees:', safeEmployees );
    // console.log( 'employees:', employees );

    // for(let employee of employees  ) {
    //     if( employeeLastNameToDelete !== employee.lastName ){
    //         safeEmployees.push( employee );
    //     }
    // }

    // used to check progress
    // console.log( 'safeEmployees:', safeEmployees );
    // console.log( 'employees:', employees );

    // for(let employee of employees  ) {
    //     if( employeeIdNumberToDelete !== employee.id ){
    //         safeEmployees.push( employee );
    //     }
    // }

    // used to check progress
    // console.log( 'safeEmployees:', safeEmployees );
    // console.log( 'employees:', employees );

    // for(let employee of employees  ) {
    //     if( employeeJobTitleToDelete !== employee.title ){
    //         safeEmployees.push( employee );
    //     }
    // }

    // used to check progress
    // console.log( 'safeEmployees:', safeEmployees );
    // console.log( 'employees:', employees );

    // for(let employee of employees  ) {
    //     // .replace(/[^0-9.-]+/g,"") required to convert from currency to string
    //     if( employeeAnnualSalaryToDelete.replace(/[^0-9.-]+/g,"") !== employee.annualSalary ){
    //         console.log( employee.annualSalary );
    //         safeEmployees.push( employee );
    //     }
    // }

    console.log( 'after push employees:', employees );

    employees = safeEmployees;

    render();
}