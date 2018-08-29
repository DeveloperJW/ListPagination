/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
let currentPage=1;
let recordsPerPage=10; //only 10 students record will be displayed for each page
let allRecords =  document.querySelectorAll('.student-item.cf'); //select all student records
let totalNumOfRecord = allRecords.length;
let page = document.querySelector('.page');

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
/**
 * First, I am going to hide all records from the page. And call the function to show the required records.
 */
/**
 * Function getNumOfPages take no parameter and return the total number of pages needed based on
 * the total number of student records and records allowed for each page
 * @returns {int}
 */
let getNumOfPages =() =>{
    return Math.ceil(totalNumOfRecord/recordsPerPage);
};

/**
 * Need to display the list of page numbers
 */
let contentHTML =`<ul>`;
let pageInsertHTML= () =>{
    for (let i=0; i<getNumOfPages(); i++){
        if (i+1 === currentPage){
            contentHTML+=`<li><a class="active" href="#"> ${i+1}</a></li>`;
        } else{
            contentHTML+=`<li><a href="#"> ${i+1}</a></li>`;
        }
    }
    contentHTML+=`</ul>`;
};
pageInsertHTML();

let pagination=document.createElement('div');
pagination.className = 'pagination';
pagination.innerHTML=contentHTML;
page.appendChild(pagination);


// for (let i=0; i<getNumOfPages();i++){
//     pagination.appendChild(createPageList());
// }



/**
 * Function hidePreviousPages will check if the current page is 1, if the current page is 1. The function do nothing.
 * Else, the function will hide all student records which should displayed on previous pages
 */
let hidePreviousPages = (currentPage) =>{
    if (currentPage !== 1){
        for (let i=0; i<(currentPage-1)*recordsPerPage; i++){
            allRecords[i].style.display='none';
        }
    }
};

/**
 * Function hideNextPages will check if the current page is the last page, if the current page is the last page.
 * The function do nothing. Else, the function will hide all student records which should displayed on next pages
 */
let hideNextPages = (currentPage) =>{
    if (currentPage !== getNumOfPages()){
        for (let i=currentPage*recordsPerPage; i<totalNumOfRecord; i++){
            allRecords[i].style.display='none';
        }
    }

};
// call the functions to hide records based on the current page number
hidePreviousPages(currentPage);
hideNextPages(currentPage);



// Create and append the pagination links - Creating a function that can do this is a good approach



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
let selected = document.querySelector('.pagination');
selected.addEventListener('click', (event) => {
    if (event.target.tagName == 'LI') {
        currentPage=parseInt(event.target.contentText);
    }
});

