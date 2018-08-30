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

/**
 *
 */
// let showCurrentPage = (currentPage) =>{
//     for (let i=(currentPage-1)*recordsPerPage; i<currentPage*recordsPerPage;i++){
//         if (i>totalNumOfRecord){
//
//         } else{
//             allRecords[i].style.display='block';
//         }
//     }
//
// };

let resetRecords=() =>{
    for (let i=0;i<totalNumOfRecord;i++){
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
        if (i+1 ===activeNo){
            activePage[i].className ='active';
        } else{
            activePage[i].className= 'none';
        }
    }

};
// call the functions to hide records based on the current page number
hidePreviousPages(currentPage);
hideNextPages(currentPage);
assignActive(currentPage);

/**
 * printRecords function
 */
let printRecords =(pageNum)=>{
  // hideAllRecords();
  // showCurrentPage(pageNum);
  // currentPage = pageNum;
    resetRecords();
    hidePreviousPages(pageNum);
    hideNextPages(pageNum);
    currentPage=pageNum;
};

// Create and append the pagination links - Creating a function that can do this is a good approach



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
let selected = document.querySelector('.pagination ul');
selected.addEventListener('click', (event) => {
    // console.log(event.target);
    let pageNo=parseInt(event.target.textContent);
    // console.log(pageNo);
    // event.preventDefault();
    printRecords(pageNo);
    assignActive(pageNo);
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
    }
};
// create a function select all elements with .display='block';
// and then use hidePrevious, hideNext to make the new pagination works.

// let searchResultPageNumber = ()=>{
//     if (matchCount === 0){
//         return 1;
//     } else{
//         return Math.ceil(matchCount/recordsPerPage);
//     }
// };

searchButton.addEventListener('click',()=>{
    // first, all records need to be hide
    hideAllRecords();
    // next, need to loop through
    // h3 or span class=email from div student-details class
    console.log('You just clicked the searchButton');
    console.log(searchInput.value.toLowerCase());
    searchName(searchInput.value.toLowerCase());
    //update new pagination based on search results
    // pagination.innerHTML=pageInsertHTML(searchResultPageNumber());
    let errorMessage=document.createElement('h3');
    if (matchCount === 0){
        pagination.innerHTML=pageInsertHTML(1);
        errorMessage.className= 'error-message';
        errorMessage.innerText = "There is no student record matching with your input.";
        // page.insertBefore(errorMessage,pagination);
        studentList.appendChild(errorMessage)
    } else{
        let node=studentList.querySelector('.error-message');
        node.parentNode.removeChild(node);
        pagination.innerHTML=pageInsertHTML(Math.ceil(matchCount/recordsPerPage));
    }

    //reset pagination active tag
    // assignActive(1);

    //Now, if there are more than 10 records from search, pagination button it is not working well
    // for example, if we search t, there is 15 records.

    //reset match count
    matchCount=0;
    searchInput.value='';

});

