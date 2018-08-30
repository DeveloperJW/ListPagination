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
let studentList=document.querySelector('.student-list');
let filterCollection = allRecords;

let errorMessage=document.createElement('h3');


// Create a function to hide all of the items in the list except for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four
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
let pageInsertHTML= (pageNumber) =>{
    let contentHTML =`<ul>`;
    for (let i=0; i<pageNumber; i++){
        contentHTML+=`<li><a href="#">${i+1}</a></li>`;
    }
    contentHTML+=`</ul>`;
    return contentHTML;
};

let pagination=document.createElement('div');
pagination.className = 'pagination';
pagination.innerHTML= pageInsertHTML(getNumOfPages());
page.appendChild(pagination);


/**
 * Function hidePreviousPages will check if the current page is 1, if the current page is 1. The function do nothing.
 * Else, the function will hide all student records which should displayed on previous pages
 */
let hidePreviousPages = (currentPage, collection) =>{
    if (currentPage !== 1){
        for (let i=0; i<(currentPage-1)*recordsPerPage; i++){
            collection[i].style.display='none';
        }
    }
};

/**
 * Function hideNextPages will check if the current page is the last page, if the current page is the last page.
 * The function do nothing. Else, the function will hide all student records which should displayed on next pages
 */
let hideNextPages = (currentPage, collection) =>{
    for (let i=currentPage*recordsPerPage; i<collection.length; i++){
        collection[i].style.display='none';
    }
};

let resetRecords=(collection) =>{
    for (let i=0;i<collection.length;i++){
        allRecords[i].style.display = 'block';
    }
};

let hideAllRecords=() =>{
    for (let i=0;i<totalNumOfRecord;i++){
        allRecords[i].style.display = 'none';
    }
};

/**
 * make class active
 */
let assignActive =(activeNo)=>{
    let activePage = document.querySelectorAll('.pagination ul li a');
    for (let i=0; i<activePage.length; i++){
        if ((i+1) === activeNo){
            activePage[i].className ='active';
        } else{
            activePage[i].className= 'none';
        }
    }

};
// call the functions to hide records based on the current page number
hidePreviousPages(currentPage,allRecords);
hideNextPages(currentPage,allRecords);
assignActive(currentPage);

/**
 * printRecords function
 */
let printRecords =()=>{
  // hideAllRecords();
  // showCurrentPage(pageNum);
  // currentPage = pageNum;
    resetRecords(filterCollection);
    hidePreviousPages(currentPage,filterCollection);
    hideNextPages(currentPage,filterCollection);
};

// Create and append the pagination links - Creating a function that can do this is a good approach



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
let selected = document.querySelector('.pagination ul');
selected.addEventListener('click', (event) => {
    if (event.target.tagName ==='A'){
        let pageNo=parseInt(event.target.textContent);
        // printRecords(pageNo,filterCollection);
        assignActive(pageNo);
        console.log(filterCollection.length);
        console.log(currentPage);
        currentPage=pageNo;
        printRecords();
        console.log(currentPage);
    }
    event.stopPropagation();
});

// The following code are for the purpose of extra credits

/** Extra Credit Part 1: Add search component
 * Using JavaScript DOM to add HTML for student search div dynamically
 */

/**
 * Create <div class='student-search'> </div>
 * and append to page-header, create <input placeholder='Search for students...'><button></button>
 * and put inside div with className 'student-search'
 * the result is:
 * <div class="page-header cf">
 *     <h2>Students</h2>
 *      <div class="student-search">
 *     <input placeholder="Search for students...">
 *         <button>Search</button>
 *      </div>
 * </div>
 * @type {HTMLElement}
 */
let student_search = document.createElement('div');
student_search.className='student-search';
let page_header= document.querySelector('.page-header.cf');
page_header.appendChild(student_search);

let searchInput = document.createElement('input');
searchInput.placeholder = 'Search for students...';
student_search.appendChild(searchInput);
let searchButton = document.createElement('button');
searchButton.innerText='Search';
student_search.appendChild(searchButton);

/** Extra credit Part 2: Add functionality to the search component
 * addEventListener to searchButton
 */
let matchCount=0;
let searchName = (name) =>{
    for (let i=0; i<totalNumOfRecord; i++){
        let ifName=allRecords[i].querySelector('h3').innerText.includes(name);
        let ifEmail=allRecords[i].querySelector('.email').innerText.includes(name);
        if (ifName||ifEmail){
            allRecords[i].style.display='block';
            matchCount++;//extra credit part 3
        }
    }//end of for loop
    filterCollection = studentList.querySelectorAll("li[style='display: block;']");
};
// create a function select all elements with .display='block';
// and then use hidePrevious, hideNext to make the new pagination works.

searchButton.addEventListener('click',(event)=>{
    // first, all records need to be hide
    hideAllRecords();
    // next, need to loop through
    // h3 or span class=email from div student-details class
    console.log('You just clicked the searchButton');
    console.log(searchInput.value.toLowerCase());
    searchName(searchInput.value.toLowerCase());
    console.log("The page number is "+filterCollection.length);

    if (matchCount === 0){
        errorMessage.className= 'error-message';
        errorMessage.innerText = "There is no student record matching with your input.";
        studentList.appendChild(errorMessage);
        pagination.innerHTML=pageInsertHTML(1);
    } else {
        let node=studentList.querySelector('.error-message');
        if (node){
            node.parentNode.removeChild(node);
        }//end of if statement
        pagination.innerHTML=pageInsertHTML(Math.ceil(matchCount/recordsPerPage));
    }//end of else statement
    //assign active className to the pagination of research result page
    assignActive(currentPage);
    //reset match count
    matchCount=0;
    searchInput.value='';
    event.stopPropagation();
});

