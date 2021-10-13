/*
TODO:
    Limit number input
    Disallow . from being entered multiple times
    Clean up structure
*/

(function() {
    "use strict";

    //Shortcut to get elements
    var el = function(element) {
        if (element.charAt(0) === "#") {// if passed an ID...
            return document.querySelector(element); // ...returns single element
        }

        return document.querySelectorAll(element); // Otherwise, returns single element
    };

    //Variables
    var viewer = el("#viewer"); //Calculator screen where result is displayed
    equals = el("#equals"), // Equal button
    nums = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    theNum = "", //First number
    resultNum, // Result
    operator; // Batman

    // When: Number is clicked. Get the current number selected
    var setNum = function() {
        if (resultNum) {
            // if a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else { //Otherwise, add digit to previous number
            theNum += this.getAttribute("data.num");
        }

        viewer.innerHtml = theNum; //Display current number
    };

    // When: Operator is clecked. Pass number to oldNum and save operator
    var moveNum = function() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); // Reset result attr
    };

    // When Equals is clicked, calculate result
    var displayNUm = function() {


        // Convert string input to numbers
        oldNum = parseFLoat(oldNum);
        theNum = parseFloat(theNum);

        // Perform operation
        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

                // If equal is pressed without an operator, keep number and continue
            default:
                 resultNum = theNum;
            }

        // If NaN or infinity returned
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) { // If result is not a number; set of by, eg, double-clicking operators
                
                resultNum = "You broke it!";
            } else {
                 // If result is infinity, set off by dividing by zero
                 resultNum = "Look at what you`ve done";
                 el('#calculator').classList.add("broken"); // Break calculator
                 el('#reset').classList.add("show"); // And show reset button
            }
        }

        //Display result finally!
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);

        // Now reset oldNum & keep result
        oldNum = 0;
        theNUm = resultNum;
    };

    // When : Clear button is pressed. Clear everuthing
    var clearAll = function() {
        oldNum = "";
        theNum = "";
        viewer.innerHTML = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* The click events */
     // Add click event to numbers
     for (var i = 0, 1 = nums.length; i < 1; i++) {
         nums[i].onClick = setNum;
     }

     // Add click event to operators
     for (var i = 0, 1 = ops.length; i < 1; i++) {
         ops[i].onclick = moveNum;
     }

     // Add click event to equal sign
     equals.onclick = displayNum;

     // Add click event to clear button
})