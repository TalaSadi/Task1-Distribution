const fs=require("fs");

const {parse}= require("csv-parse");


let counter = 0, totalSalary = 0, totalPerformanceScore = 0, females = 0, males = 0;
let categories = {}
let majors={}

function calculatePerformance(row)
{
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

function loopAround(row , category){
 counter++;
totalSalary+=Number(row.Salary);
totalPerformanceScore+=Number(row['Performance Score']);
row.Gender === 'F' ? females++ : males++;

if(!categories[category]){
  categories[category] = 0
}

categories[category] +=1
if(!majors[row.Department]){
  majors[row.Department]=0;
}
 majors[row.Department]+=1



}





fs.createReadStream("./data.csv").
pipe(parse({ columns: true, from_line: 1 }))
.on ('data', function(row){




const performanceCategory = calculatePerformance(row);
loopAround(row , performanceCategory);

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


    console.log ('Average salary '+totalSalary/counter);
    console.log('Average performance score '+ totalPerformanceScore/counter)
    console.log('females '+females);
    console.log('males '+males);
    console.log('scores: '+Object.keys(categories))
    console.log('Major' + Object.keys(majors));
    console.log('finished');

for ( category in categories)
console.log(category + ":" +categories[category]);

console.log('\n'+'\n')

for(major in majors)
  console.log(major+ ": "+majors[major])

}

)

