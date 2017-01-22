var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://159.203.104.142');
var bucket = cluster.openBucket("csp");
var N1qlQuery = couchbase.N1qlQuery;



var getStudentInfo = function()
{
  var query = N1qlQuery.fromString('SELECT * FROM csp WHERE meta(csp).id LIKE "S:_"')

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
        console.log(res)
        if((res.username == user) && (res.pass == pass))
        {
            resolve(res);
        }
        else
        {
            reject("Error");
        }
      }
    });
  });
}



module.exports = {
  getStudentInfo: getStudentInfo,
  login: login
}
