var penguinPromise = d3.json("classData.json");

penguinPromise.then(function(penguins)
                   {
    createHeading();
    createTable(penguins);
   sortPenguins(penguins);
    console.log( getOnePeng(penguins, 1));
    
                    },
                   function(error)
                    {
                    console.log("error", error)
    
                    })

var makecol = function(rows, msg, accessor)
{
rows.append("td")
    .text(accessor)
    .attr("id", msg)
}
var makeHeading = function()
{
    d3.select("thead")
        .append("tr")
        .attr("id", "Heading")
        
        
}
var addHeading = function(msg, type)
{
    d3.select("#Heading")
    .append("td")
        .text(msg)
        .attr("id", type)
}

var useimage = function(rows, msg, accessor)
{
    
    rows.append("td")
    .append("img")
    .attr("src", accessor)
    .attr("id", msg)
}

var getGrade = function(preference)
{
    return preference.grade;
}

var createHeading = function()
{   makeHeading();
    addHeading ("Picture", "picture");
     addHeading ("Average Quiz Grade", "quizGrade");
     addHeading ( "Average Homework Grade", "homeworkGrade");
     addHeading ( "Average Test Grade", "testGrade");
     addHeading ( "Final Grade", "finalGrade");
    addHeading ("Grade in Class", "grade")
}
var createTable = function(penguins)
{
        
    var rows = d3.select("tbody")
                    .selectAll("tr")
                    .data(penguins)
                    .enter()
                    .append("tr")
                    .attr("class", function(penguin)
            {
        if (calcGrade(penguin)< 70)
            {
                return "failing";
            }
        else
            {
                return "passing";
        }})
                   
                    
  
    var msg = "  ";
   
    useimage(rows, "picture", function(penguin)
            {return "imgs/" + penguin.picture;
            
            })
    
    makecol(rows, "quizGrade", function(penguin)
            {
        return  d3.mean(penguin.quizes.map(getGrade));
    })
    
    makecol (rows, "homeworkGrade",function(penguin)
             { return d3.mean(penguin.homework.map(getGrade));
             
             })
    
    makecol(rows, "testGrade", function(penguin)
            {
       return d3.mean(penguin.test.map(getGrade));
        
            })
    
    makecol(rows, "finalGrade", function(penguin)
            {
        return penguin.final.map(getGrade);
    })
        
    makecol(rows, "grade", function(penguin)
    {   
    var avgTestGrade = d3.mean(penguin.test.map(getGrade));
    
    var avgQuizGrade = d3.mean(penguin.quizes.map(getGrade));
    
    var avgHWGrade = d3.mean(penguin.homework.map(getGrade));
    var grade = .35 *(penguin.final.map(getGrade))/100 + .3*(avgTestGrade)/100 +.2*(avgQuizGrade)/10 +.15*(avgHWGrade)/50;
        
    return grade*100;
   
    })
    
}

    

var meanHWSort = function(penguin)
   { penguin.sort(function(A,B)
                  {
       if (d3.mean(A.homework.map(getGrade))==d3.mean(B.homework.map(getGrade)))
           {
        return 0;
            }
       if (d3.mean(A.homework.map(getGrade))< d3.mean(B.homework.map(getGrade)))
           {
               return 1;
           }
       else
           {
               return -1;
           }
   }
        )}
var meanQuizSort = function(penguin)
   { penguin.sort(function(A,B)
                  {
       if (d3.mean(A.quizes.map(getGrade))==d3.mean(B.quizes.map(getGrade)))
           {
        return 0;
            }
       if (d3.mean(A.quizes.map(getGrade))<d3.mean(B.quizes.map(getGrade)))
           {
               return 1;
           }
       else
           {
               return -1;
           }
   }
        )}
var meanTestSort = function(penguin)
   { penguin.sort(function(A,B)
                  {
       if (d3.mean(A.test.map(getGrade))==d3.mean(B.test.map(getGrade)))
           {
        return 0;
            }
       if (d3.mean(A.test.map(getGrade))<d3.mean(B.test.map(getGrade)))
           {
               return 1;
           }
       else
           {
               return -1;
           }
   }
        )}
var meanFinalSort = function(penguin)
   { penguin.sort(function(A,B)
                  {
       if (d3.mean(A.final.map(getGrade))==d3.mean(B.quizes.map(getGrade)))
           {
        return 0;
            }
       if (d3.mean(A.final.map(getGrade))<d3.mean(B.final.map(getGrade)))
           {
               return 1;
           }
       else
           {
               return -1;
           }
   }
        )}

meanGradeSort= function(penguin)
{ penguin.sort(function(A,B)
                  {
    if (calcGrade(A) == calcGrade(B))
        {
            return 0;
        }
          if (calcGrade(A)< calcGrade(B)) {
               return 1;
           }
       else
           {
               return -1;
           }
   }
        )}
var calcGrade= function(penguin)
    {   
    var avgTestGrade = d3.mean(penguin.test.map(getGrade));
    
    var avgQuizGrade = d3.mean(penguin.quizes.map(getGrade));
    
    var avgHWGrade = d3.mean(penguin.homework.map(getGrade));
    var grade = .35 *(penguin.final.map(getGrade))/100 + .3*(avgTestGrade)/100 +.2*(avgQuizGrade)/10 +.15*(avgHWGrade)/50;
        
    return grade*100;
    
    }

var clearTable = function()
{
    d3.selectAll("tr")
        .remove()
}

var sortPenguins = function(penguin)
{      
      
d3.select("#homeworkGrade")
    .on("click", function()
       {
    
    meanHWSort(penguin);
    clearTable();
    createHeading();
    createTable(penguin);
    sortPenguins(penguin);
 
});
    
d3.select("#quizGrade")
    .on("click", function()
       {
    
    meanQuizSort(penguin);
    clearTable();
    createHeading();
    createTable(penguin);
    sortPenguins(penguin);
   
});
    
d3.select("#testGrade") 
    .on("click", function()
     {  meanTestSort(penguin);
       clearTable();
      createHeading();
        createTable(penguin);
      sortPenguins(penguin);
     
     }
    );
d3.select("#finalGrade")
    .on("click", function()
       {
    meanFinalSort(penguin);
    clearTable();
    createHeading();
    createTable(penguin);
    
    sortPenguins(penguin);

});
d3.select("#grade")
    .on("click", function()
       {
    meanGradeSort(penguin);
    clearTable();
    createHeading();
    createTable(penguin);
    sortPenguins(penguin);
  
    
})

}



var createProfile = function(penguin)
{
   clearTable();
    makeHeading();
    addHeading ("Picture", "picture");
     addHeading ("Quiz Grades", "quizGrade");
     addHeading ( "Homework Grades", "homeworkGrade");
     addHeading ( "Test Grades", "testGrade");
     addHeading ( "Final Grade", "finalGrade");
   
    var rows = d3.select("tbody")
                    .selectAll("tr")
                    .data(penguin)
                    .enter()
                    .append("tr")
                   
    makecol(rows, "homework", penguin.map(getHWGrade))
   
 
}

var getOnePeng = function(penguin, num)
    {
        return penguin[num];
    }


