const fs=require("fs");
const cdf=require ('cumulative-distribution-function');
const {parse}= require("csv-parse");
const { delimiter } = require("path");
let counter = 0, totalSalary = 0, totalPerformanceScore = 0, females = 0, males = 0,Engineering=0,HR=0,Finance=0,Marketing=0;
let performanceCategory; 

function print(row)
{
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
      
   
    
}

function loopAround(row){
 counter++;
totalSalary+=Number(row.Salary);
totalPerformanceScore+=Number(row['Performance Score']);
row.Gender === 'F' ? females++ : males++;

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
fs.createReadStream("./data.csv").
pipe(parse({ columns: true, from_line: 1 }))
.on ('data', function(row){
print(row);
loopAround(row);
}).on("end",function(){
    console.log ('Average salary '+totalSalary/counter);
    console.log('Average performance score '+ totalPerformanceScore/counter)
    console.log('females '+females);
    console.log('males '+males);
    console.log('Marketing:'+Marketing  +'\n'+'HR:'+HR + '\n'+"Engineering: "+Engineering+ '\n'+"Finance: "+Finance);
    console.log('finished');
})

