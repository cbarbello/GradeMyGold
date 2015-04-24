/* GradeMyGold                                                                              */
/* -Easily predict your future GPA within GOLD-      										*/
/* Casey Barbello																			*/
/* Jan.31.2015                                                                              */

function main()
{
	//check to see if dropdown has "All Quarters" selected. if not, exit program
	var dropdown = document.getElementById('pageContent_quarterDropDown');
	var selectedItem = dropdown.options[dropdown.selectedIndex].value;
	if (selectedItem != 'ALL') { return; }
	
	//get the total cumulative units so far
	var numQuarters = document.getElementsByClassName('quarter').length;
	var cumulativeId = 'pageContent_quarterGrid_cumulativeTotalGrid_' + (numQuarters - 2);
	var cumulativeCellList = document.getElementById(cumulativeId).getElementsByClassName('clcellsecondarynoalign');
	var totalGPAUnits = parseFloat(cumulativeCellList[6].innerText);
	var totalPoints = parseFloat(cumulativeCellList[7].innerText);

	//create array of class names to cross check for retakes
	var classArrays = createClassArrays(numQuarters);
	var previousClassArray = classArrays.prev;
	var previousPointsArray = classArrays.points;
	var currentClassArray = classArrays.curr;

	//create dropdown menu
	var dropdown = createDropDown();

	//locate current quarter classes and add dropdown to each one
	var currentQuarterId = 'pageContent_quarterGrid_gradesByQuarter_' + (numQuarters - 1);
	var targetTable = document.getElementById(currentQuarterId);
	var currentQuarterClasses = targetTable.getElementsByTagName('b');
	var numClasses = currentQuarterClasses.length;

	for (var i = 0; i < numClasses; i++)
	{   
		var dropdownClone = dropdown.cloneNode(true);
		currentQuarterClasses[i].parentNode.appendChild(dropdownClone);
	}
	
	//get number of units for each class
	var	unitsArray = [];
	var primaryList = targetTable.getElementsByClassName('clcellprimarynoalign');
	var secondaryList = targetTable.getElementsByClassName('clcellsecondarynoalign');
	for (var i = 3; i < primaryList.length; i += 8)
	{
		unitsArray[unitsArray.length] = parseFloat(primaryList[i].innerText);
		if(i < secondaryList.length)
		{
			unitsArray[unitsArray.length] = parseFloat(secondaryList[i].innerText);
		}
	}

	//create div to display "Calculate GPA" button and results
	var resultsdiv = document.createElement('div');
	resultsdiv.className = 'results';

	var quarterTotalDiv = document.createElement('div');
	var cumulativeTotalDiv = document.createElement('div');
	quarterTotalDiv.className = 'gpa_results';
	cumulativeTotalDiv.className = 'gpa_results';
	quarterTotalDiv.innerHTML = 'Predicted Quarter GPA: ';
	cumulativeTotalDiv.innerHTML = 'Predicted Cumulative GPA: ';

	var button = document.createElement('button');
	button.className = 'calculateButton';
	button.innerText = 'Calculate GPA';
	button.type = 'button';
	button.addEventListener('click', function() { 
		calculateGPA(totalGPAUnits, totalPoints, unitsArray, quarterTotalDiv, cumulativeTotalDiv, previousClassArray, previousPointsArray, currentClassArray); 
	});

	resultsdiv.appendChild(button);	
	resultsdiv.appendChild(quarterTotalDiv);
	resultsdiv.appendChild(cumulativeTotalDiv);
	targetTable.appendChild(resultsdiv);

}



//function to create previous and current class arrays
//used for cross checking to find if current quarter contains retakes
function createClassArrays(numQuarters)
{
	var previousClassArray = [];
	var prevPointsArray = [];
	var currentClassArray = [];
	for (var x = 0; x < numQuarters; x++)
	{   
		var quarterId = 'pageContent_quarterGrid_gradesByQuarter_' + x;
		var primaryQuarterList = document.getElementById(quarterId).getElementsByClassName('clcellprimarynoalign');
		var secondaryQuarterList = document.getElementById(quarterId).getElementsByClassName('clcellsecondarynoalign');
		for (var y = 0; y < primaryQuarterList.length; y += 8)
		{
			if (x != numQuarters - 1)
			{
				previousClassArray[previousClassArray.length] = primaryQuarterList[y].innerText;
				prevPointsArray[prevPointsArray.length] = parseFloat(primaryQuarterList[y + 6].innerText);
				if(y < secondaryQuarterList.length)
				{
					previousClassArray[previousClassArray.length] = secondaryQuarterList[y].innerText;
					prevPointsArray[prevPointsArray.length] = parseFloat(secondaryQuarterList[y + 6].innerText);
				}
			}
			else
			{
				currentClassArray[currentClassArray.length] = primaryQuarterList[y].innerText;
				if(y < secondaryQuarterList.length)
				{
					currentClassArray[currentClassArray.length] = secondaryQuarterList[y].innerText;
				}
			}
		}
	}
	return {
		prev: previousClassArray,
		points: prevPointsArray,
		curr: currentClassArray
	};
}



//function to create dropdown menu for current classes
function createDropDown()
{
	var dropdown = document.createElement('select');
	dropdown.className = 'gradeDropDown';

	var no_Grade = new Option();
	var A_Grade = new Option();
	var A_Minus_Grade = new Option();
	var B_Plus_Grade  = new Option();
	var B_Grade = new Option();
	var B_Minus_Grade = new Option();
	var C_Plus_Grade  = new Option();
	var C_Grade = new Option();
	var C_Minus_Grade = new Option();
	var D_Plus_Grade  = new Option();
	var D_Grade = new Option();
	var D_Minus_Grade = new Option();
	var F_Grade = new Option();

	no_Grade.value = -1;
	A_Grade.value = 4.00;
	A_Minus_Grade.value = 3.70;
	B_Plus_Grade.value  = 3.30;
	B_Grade.value = 3.00;
	B_Minus_Grade.value = 2.70;
	C_Plus_Grade.value  = 2.30;
	C_Grade.value = 2.00;
	C_Minus_Grade.value = 1.70;
	D_Plus_Grade.value  = 1.30;
	D_Grade.value = 1.00;
	D_Minus_Grade.value = 0.70;
	F_Grade.value = 0.00;

	no_Grade.text = "P/NP";
	A_Grade.text = 'A';
	A_Minus_Grade.text = 'A-';
	B_Plus_Grade.text  = 'B+';
	B_Grade.text = 'B';
	B_Minus_Grade.text = 'B-';
	C_Plus_Grade.text  = 'C+';
	C_Grade.text = 'C';
	C_Minus_Grade.text = 'C-';
	D_Plus_Grade.text  = 'D+';
	D_Grade.text = 'D';
	D_Minus_Grade.text = 'D-';
	F_Grade.text = 'F';

	dropdown.options.add(no_Grade);
	dropdown.options.add(A_Grade);
	dropdown.options.add(A_Minus_Grade);
	dropdown.options.add(B_Plus_Grade);
	dropdown.options.add(B_Grade);
	dropdown.options.add(B_Minus_Grade);
	dropdown.options.add(C_Plus_Grade);
	dropdown.options.add(C_Grade);
	dropdown.options.add(C_Minus_Grade);
	dropdown.options.add(D_Plus_Grade);
	dropdown.options.add(D_Grade);
	dropdown.options.add(D_Minus_Grade);
	dropdown.options.add(F_Grade);

	return dropdown;
}



//function to calculate GPA when button is pressed
//accounts for retakes if present in current quarter
function calculateGPA(totalGPAUnits, totalPoints, unitArray, quarterTotalDiv, cumulativeTotalDiv, previousClassArray, previousPointsArray, currentClassArray) 
{
	var gradeDropDownList = document.getElementsByClassName('gradeDropDown');
	var numDropDowns = gradeDropDownList.length;
	var quarterGPAUnits = 0.0;
	var quarterPoints = 0.0; 

	for (var i = 0; i < numDropDowns; i++) 
	{
		var selectedGradeValue = gradeDropDownList[i].options[gradeDropDownList[i].selectedIndex].value;
		if (selectedGradeValue != -1)
		{
			var retake = previousClassArray.indexOf(currentClassArray[i]);
			if (retake != -1)
			{
				totalPoints -= previousPointsArray[retake];
				totalGPAUnits -= unitArray[i];
			}
			quarterPoints += selectedGradeValue * unitArray[i];
			quarterGPAUnits += unitArray[i];
			totalPoints += selectedGradeValue * unitArray[i];
			totalGPAUnits += unitArray[i];
		}
	}

	var quarterGPA = (Math.floor((quarterPoints / quarterGPAUnits) * 100) / 100).toFixed(2);
	var cumulativeGPA = (Math.floor((totalPoints / totalGPAUnits) * 100) / 100).toFixed(2);

	if (isNaN(quarterGPA))
	{
		quarterTotalDiv.innerHTML = 'Predicted Quarter GPA: <b>None</b>';
	}
	else 
	{
		quarterTotalDiv.innerHTML = 'Predicted Quarter GPA: ' + '<b>' + quarterGPA + '</b>';
	}
	cumulativeTotalDiv.innerHTML = 'Predicted Cumulative GPA: ' + '<b>' + cumulativeGPA + '</b>';
}

main();