var penguinPromise = d3.json("classData.json");

penguinPromise.then(function(penguins)
                   {
    createHeading();
    createTable(penguins);
   sortPenguins(penguins);
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
    d3.select("#Ptable")
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

var getGrade = function(penguin)
{
    return penguin.grade;
}

var createHeading = function()
{   makeHeading();
    addHeading ("Picture", "picture");
     addHeading ("Average Quiz Grade", "quizGrade");
     addHeading ( "Average Homework Grade", "homeworkGrade");
     addHeading ( "Average Test Grade", "testGrade");
     addHeading ( "Final Grade", "finalGrade");
}
var createTable = function(penguins)
{
        
    var rows = d3.select("#Ptable")
                    .selectAll("tr")
                    .data(penguins)
                    .enter()
                    .append("tr")
  
    var msg = "  ";
   
    useimage(rows, "picture", function(penguin)
            {return "imgs/" + penguin.picture;
            
            })
    
    makecol(rows, "quizGrade", function(penguin)
            {
        var avgQuizGrade = d3.mean(penguin.quizes.map(getGrade));
        return avgQuizGrade;
    })
    
    makecol (rows, "homeworkGrade",function(penguin)
             { var avgHWGrade = d3.mean(penguin.homework.map(getGrade));
             return avgHWGrade;
             })
    
    makecol(rows, "testGrade", function(penguin)
            {
        var avgTestGrade = d3.mean(penguin.test.map(getGrade));
        return avgTestGrade;
            })
    
    makecol(rows, "finalGrade", function(penguin)
            {
        var avgFinalGrade =  penguin.final.map(getGrade);
        return avgFinalGrade;
        
    })
    
}
var meanHWSort = function(penguin)
   { penguin.sort(function(A,B)
                  {
       if (d3.mean(A.homework.map(getGrade))==d3.mean(B.homework.map(getGrade)))
           {
        return 0;
            }
       if (d3.mean(A.homework.map(getGrade))>d3.mean(B.homework.map(getGrade)))
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
var clearTable = function()
{
    d3.selectAll("tr")
        .remove()
}

var sortPenguins = function(penguin)
{      
      
d3.selectAll("#homeworkGrade")
    .on("click", function()
       {
    
    meanHWSort(penguin);
    clearTable();
    createHeading();
    createTable(penguin);
})
    
d3.selectAll("#quizGrade")
    .on("click", function()
       {
    
    meanQuizSort(penguin);
    clearTable();
    createHeading();
    createTable(penguin);
})
    
d3.selectAll("#testGrade") 
    .on("click", function()
     {  meanTestSort(penguin);
       clearTable();
      createHeading();
        createTable(penguin);
     }
    )
d3.selectAll("#finalGrade")
    .on("click", function()
       {
    meanFinalSort(penguin)
    clearTable();
    createHeading();
    createTable(penguin);
    
})


}