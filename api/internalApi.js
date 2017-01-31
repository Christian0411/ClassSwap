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
        console.log(res);
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

var registerStudent = function(userInfo)
{
  var validateUserQuery = N1qlQuery.fromString
  ('SELECT * FROM csp WHERE username ==' + '"'
  + userInfo.user + '" ' + 'OR ' + 'email ==' + '"'
  + userInfo.email + '"'  )

  return new Promise ((resolve, reject) => {
    bucket.query(validateUserQuery,function(err,res){
        if(err)
        {
          reject(err)
        }

    });


  })



}


module.exports = {
  getStudentInfo: getStudentInfo,
  login: login
}
