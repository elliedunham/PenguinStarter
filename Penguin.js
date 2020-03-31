var penguinPromise = d3.json("classData.json");

penguinPromise.then(function(penguins)
                   {
    createTable(penguins);
                    },
                   function(error)
                    {
                    console.log("error", error)
    
                    })

var makecol = function(rows, accessor)
{
rows.append("td")
    .text(accessor)
}

var useimage = function(rows, accessor)
{
    
    rows.append("td")
    .append("img")
    .attr("src", accessor)
}

var getGrade = function(penguin)
{
    return penguin.grade;
}


var createTable = function(penguins)
{
        
    var rows = d3.select("#Ptable")
                    .selectAll("tr")
                    .data(penguins)
                    .enter()
                    .append("tr")
  
    
    useimage(rows, function(penguin)
            {return "imgs/" + penguin.picture;
            })
    
    makecol(rows, function(penguin)
            {
        return d3.mean(penguin.quizes.map(getGrade));
    })
    
    makecol (rows, function(penguin)
             {
             return d3.mean(penguin.homework.map(getGrade));
             })
    
    makecol(rows, function(penguin)
            {
        
        return d3.mean(penguin.test.map(getGrade));
            })
    
    makecol(rows, function(penguin)
            {
        return penguin.final.map(getGrade);
        
    })
    
}