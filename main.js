//<body> triggers buildHtmlTable() and passes in the id selector for the table to be populated

function buildHtmlTable(selector) {

    $.getJSON("data.json", function (jsonData) {

        var columns = addAllColumnHeaders(jsonData, selector);          // call the routine that will return an arrray of unique column names
    
        $.each(jsonData, function(i, item) {                            // cycle thru each item in myList. myList is an array, thus we can expect 2 parms to be passed; an index and an item
            var row$ = $('<tr></tr>');                                  // create an jq element with <tr> tag 
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {     // do a for loop to increment to each column name in the array retuned from above     
                var cellValue = item[columns[colIndex]];                // get the value from the item by using the column name as the key for the list

                if (cellValue == null) cellValue = "";                  // if the value is null, then just set the cellValue = ""

                if (columns[colIndex] == 'location') {                  
                    var a$ = document.createElement("a");
                    a$.setAttribute("href", "https://www.google.com/maps?q=" + cellValue)
                    var linkText = document.createTextNode("Map");
                    a$.appendChild(linkText);
                    cellValue = a$;
                }

                row$.append($('<td></td>').html(cellValue));            // create a <td> tag and imbed the value into the <tr> element we created above
                    
            }

            $(selector).append(row$);                                   // append the fully populated rows$ element into the selector from the DOM
        })

    });

}

function addAllColumnHeaders(jsonData, selector) {
    var columnSet = [];                                             // initialize columnSet to be an empty array
    var headerTr$ = $('<tr></tr>');                                 // initialize headerTr$ to be an empty <tr> jquery element
    
    $.each(jsonData, function(i, item) {                              // cycle thru myList. Its an array so we can expect an index and the item
        $.each(item, function(key) {                                // cycle thru each item element. Its a list so we can expect just a key
            if ($.inArray(key, columnSet) == -1) {                  // check to see if the columnSet array already contains this key
                columnSet.push(key);                                // if no, then push the key into the columnSet array
                headerTr$.append($('<th></th>').html(key));         // also, put <th> tag around key and append the key to the headerTr$ element.
                                                                    // <tr><th>name</th><th>age</th><th>hobbies</th></tr>
            }
        })
    })
    
    $(selector).append(headerTr$);                                  // once we ar done with all the keys, append headerTr$ to the selector in the DOM
                                                                    // selector = <table id="excelDataTable" border="1"><tr><th>name</th><th>age</th><th>hobbies</th></tr></table>

    return columnSet;                                               // return the columnSet array to the caller
}




