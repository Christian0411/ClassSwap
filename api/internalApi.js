var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://138.197.72.1/');
var bucket = cluster.openBucket("csp");
var N1qlQuery = couchbase.N1qlQuery;



var getStudentInfo = function()
{
  var query = N1qlQuery.fromString('SELECT C.*, S.username '
                              + 'FROM csp S '
                              + 'JOIN csp C on KEYS S.Has '
                              + 'WHERE meta(S).id Like "Student:%"');
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
        console.log(res[0])
        var data = [[]];
        var count = 0;
        for(var i = 0; i < res.length; i++)
        {
            if(res[i+1] != null && res[i].username == res[i+1].username)
            {
              data[count].push(res[i]);
              data[count].push(res[i+1]);
              i++;
            }
            else
            {
              count++;
              data[count] = []
              data[count].push(res[i]);
            }
          }
        resolve(data);
      }
    });
  });

}

var getWantsClasses = function()
{
  var query = N1qlQuery.fromString('SELECT C.*, S.username '
                              + 'FROM csp S '
                              + 'JOIN csp C on KEYS S.Wants '
                              + 'WHERE meta(S).id Like "Student:%"');
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
        console.log(res[0])
        var data = [[]];
        var count = 0;
        for(var i = 0; i < res.length; i++)
        {
            if(res[i+1] != null && res[i].username == res[i+1].username)
            {
              data[count].push(res[i]);
              data[count].push(res[i+1]);
              i++;
            }
            else
            {
              count++;
              data[count] = []
              data[count].push(res[i]);
            }
          }
        resolve(data);
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
  getWantsClasses: getWantsClasses,
  getStudentInfo: getStudentInfo,
  login: login
}
