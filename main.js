/* GradeMyGold                                                                              */
/* -Easily predict your future GPA within GOLD-      */
/* Jan.31.2015                                                                             */

function main() {
	var dropdown = document.getElementById('pageContent_quarterDropDown');
	var selectedItem = dropdown.options[dropdown.selectedIndex].value;
	
	if (selectedItem != 'ALL') { return; }
	
	var numQuarters = document.getElementsByClassName('quarter').length;
	var cumulativeId = 'pageContent_quarterGrid_cumulativeTotalGrid_' + (numQuarters - 2);
	var cumulativeCellList = document.getElementById(cumulativeId).getElementsByClassName('clcellsecondarynoalign');

	var totalGPAUnits = parseFloat(cumulativeCellList[6].innerText);
	var totalPoints = parseFloat(cumulativeCellList[7].innerText);
	var currentGPA = (totalPoints/totalGPAUnits).toFixed(2)

	//create dropdown menu
	var dropdown = document.createElement('select');
	dropdown.className = 'gradeDropDown';

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

	var currentQuarterId = 'pageContent_quarterGrid_gradesByQuarter_' + (numQuarters - 1);
	var targetTable = document.getElementById(currentQuarterId);
	var currentQuarterClasses = targetTable.getElementsByTagName('b');
	var numClasses = currentQuarterClasses.length;

	for (var i = 0; i < numClasses; i++)
	{   
		var dropdownClone = dropdown.cloneNode(true);
		currentQuarterClasses[i].parentNode.appendChild(dropdownClone);
	}

	//create div to display calculate button and results
	var resultsdiv = document.createElement('div');
	resultsdiv.className = 'results';

	var button = document.createElement('button');
	button.className = 'calculateButton';
	button.innerText = 'Calculate GPA';

	var quarterTotalDiv = document.createElement('div');
	var cumulativeTotalDiv = document.createElement('div');
	quarterTotalDiv.className = 'gpa_results';
	cumulativeTotalDiv.className = 'gpa_results';

	resultsdiv.appendChild(button);	
	resultsdiv.appendChild(quarterTotalDiv);
	resultsdiv.appendChild(cumulativeTotalDiv);
	targetTable.appendChild(resultsdiv);

}

main();






