var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://138.197.72.1/');
var bucket = cluster.openBucket("csp");
var N1qlQuery = couchbase.N1qlQuery;



var getStudentInfo = function()
{
  var query = N1qlQuery.fromString('SELECT * FROM csp WHERE meta(csp).id LIKE "Student:_"')

  return new Promise((resolve,reject) =>
  {
    bucket.query(query, function(err,res)
    {
      if(err)
      {
        console.log(err);
        reject("Error");
      }
      else
      {
        //student counter
        var sCount = 0;
        //class counter
        var cCount = 0;
        var hasClass = "";

        //iterates through each student
        //stops once all students have been iterated through
        while(res[sCount] != null)
        {
            //gets the array of Has classes for each student
            console.log(res[sCount].csp.Has);

            //iterates through each class a student has
            //stops once all classes have been iterated through
            while(res[sCount].csp.Has[cCount] != null)
            {
              console.log(res[sCount].csp.Has[cCount]);
              //gets each individual class in Has array
              hasClass = res[sCount].csp.Has[cCount];
              getClassInfo(hasClass);
              cCount++;
            }

            sCount++;
            cCount = 0;
        }
        resolve(res);
      }
    });
  });

}

//function to get class info; called from within getStudentInfo
var getClassInfo = function (classId)
{
    query = N1qlQuery.fromString('SELECT * FROM csp WHERE meta(csp).id LIKE "' + classId + '"')
    return new Promise((resolve,reject) =>
    {
      bucket.query(query, function(err,res)
      {
        if(err)
        {
          console.log(err);
          reject("Error");
        }
        else
        {
          resolve(res);
        }
      });
    });
}

var login = function(user, pass)
{
  var query = N1qlQuery.fromString('SELECT * FROM csp WHERE username ==' + '"' + user + '"' + ' AND pass == ' + '"' + pass + '"')

  return new Promise((resolve,reject) =>
  {
    bucket.query(query, function(err,res)
    {
      if(err)
      {
        reject("Error");
      }
      else
      {
        if(res[0] != null)
        {
          if((res[0].csp.username == user) && (res[0].csp.pass == pass))
          {
              resolve(res);
          }
          else
          {
              reject("Error");
          }
        }
        else {
          {
            reject("Error")
          }
        }
      }
    });
  });
}



module.exports = {
  getStudentInfo: getStudentInfo,
  login: login
}
