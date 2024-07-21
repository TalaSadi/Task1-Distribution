const fs=require("fs");

const {parse}= require("csv-parse");

class Calc{
    static calculatePerformance(row){

        let performanceCategory
        if (row['Performance Score'] < 50) {
            performanceCategory = 'Failure';
          } else if (row['Performance Score'] >= 50 && row['Performance Score'] < 60) {
            performanceCategory = 'Unsatisfactory';
          } else if (row['Performance Score'] >= 60 && row['Performance Score'] < 68) {
            performanceCategory = 'Satisfactory';
          } else if (row['Performance Score'] >= 68 && row['Performance Score'] < 76) {
            performanceCategory = 'Good';
          } else if (row['Performance Score'] >= 76 && row['Performance Score'] < 85) {
            performanceCategory = 'Very Good';
          } else if (row['Performance Score'] >= 85 && row['Performance Score'] <= 100) {
            performanceCategory = 'Excellent';
          }
          else {
            performanceCategory = 'Unknown'; // Handle any unexpected scores
          }
    
          return performanceCategory
    
    }
    
}






    let counter = 0, totalSalary = 0, totalPerformanceScore = 0, females = 0, males = 0,Engineering=0,HR=0,Finance=0,Marketing=0;
    let performanceCategory; 

function calculations(row){

    counter++;
    totalSalary+=Number(row.Salary);
    totalPerformanceScore+=Number(row['Performance Score']);
    row.Gender === 'F' ? females++ : males++;
    

    let performanceCategory = calculatePerformance(row)


 
    switch(row.Department){
     case 'Engineering': 
     Engineering++;
    break;
       
    case 'HR': 
    HR++;
    break;
    
    case 'Finance': 
    Finance++;
    break;
    
    case 'Marketing': 
    Marketing++;
    break;
    }






}

ب



fs.createReadStream("./data.csv").
pipe(parse({ columns: true, from_line: 1 }))
.on ('data', function(row){

    Calc
    calculations(row);


    console.log({
        ID: row.ID,
        Name: row.Name,
        Age: row.Age,
        Gender: row.Gender,
        Department: row.Department,
        Joining_Date: row['Joining Date'], 
        Salary: row.Salary,
        Performance_Score: row['Performance Score'], 
        Email: row.Email ,
        performance_Category: performanceCategory
      })

}).on("end",function(){
 
console.log('finished')

})